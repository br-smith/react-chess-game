import React, { Component } from 'react';

import Board from "./Board";
import CapturedPieces from "./CapturedPieces";
import { HIGHLIGHT_COLOR } from "../utils/Constants";
import { initializeBoard, threatenedSquares } from "../helpers/InitializeBoard";

import "../index.css"

export default class Game extends Component {
    constructor() {
        super();

        const board = initializeBoard();

        this.state = {
            isInCheck: false,
            squares: board.squares,
            whitePieces: board.whitePieces,
            blackPieces: board.blackPieces,
            whiteCapturedPieces: [],
            blackCapturedPieces: [],
            player: 1,
            status: '',
            source: undefined,
            turn: 'white',
            threatenedSquares,
        }

    }

    getThreatenedSquares() {
        const { player, whitePieces, blackPieces, threatenedSquares } = this.state;

        let allThreatenedSquares = threatenedSquares.map((arr) => {
            return arr.slice(0);
        });

        if (player === 1) {
            for (const blackPiece of blackPieces) {
                const { piece, square } = blackPiece;
                const pieceThreats = piece.getThreatenedSquares(square);
                for (const threat of pieceThreats) {
                    allThreatenedSquares[threat.rank][threat.file] = 1;
                }
            }
        } else {
            for (const whitePiece of whitePieces) {
                const { piece, square } = whitePiece;
                const pieceThreats = piece.getThreatenedSquares(square);
                for (const threat of pieceThreats) {
                    allThreatenedSquares[threat.rank][threat.file] = 1;
                }
            }
        }

        this.setState({
            threatenedSquares: allThreatenedSquares,
        })

        console.log('allThreatenedSquares', allThreatenedSquares);
    }

    // isMyKingInCheck() {
    //     const { whitePieces, blackPieces } = this.state;

    //     for (blackPiece of blackPieces) {
    //         const canMakeMove = this.canMakeMove(blackPiece.piece, whiteKing);
    //         if (canMakeMove) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

    isMoveLegal(srcToDestPath){
        let isLegal = true;
        for(let i = 0; i < srcToDestPath.length; i++){
            if(this.state.squares[srcToDestPath[i].rank][srcToDestPath[i].file]){
                isLegal = false;
            }
        }
        return isLegal;
    }

    canMakeMove(movingPiece, destSquare) {
        const { source, squares } = this.state
        const { destRank, destFile } = destSquare;

        const isDestEnemyOccupied = squares[destRank][destFile] ? true : false;
        const srcToDestPath = movingPiece.getSrcToDestPath(source, destSquare);
        const isMovePossible = movingPiece.isMovePossible(source, destSquare, isDestEnemyOccupied);
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        return isMovePossible && isMoveLegal;
    }

    handleClick(selectionRank, selectionFile) {
        const { source } = this.state;

        if (source) {
            this.handlePieceMove(selectionRank, selectionFile);
        } else {

            // this.getThreatenedSquares();

            this.handlePieceSelection(selectionRank, selectionFile);
        }
    }

    handlePieceSelection(selectionRank, selectionFile) {
        const { player } = this.state

        let squares = this.state.squares.map((arr) => {
            return arr.slice(0);
        });

        if (squares[selectionRank][selectionFile] && squares[selectionRank][selectionFile].player === player) {
            // MUTATING STATE -- BAD
            squares[selectionRank][selectionFile].style = { 
                ...squares[selectionRank][selectionFile].style, 
                backgroundColor: HIGHLIGHT_COLOR,
            };

            this.setState({
                source: { srcRank: selectionRank, srcFile: selectionFile },
                status: "Choose destination for the selected piece",
            });
        } else {
            this.setState({
                status: "Wrong selection. Choose player " + player + " pieces."
            });
        }
    }
    
    handlePieceMove(destRank, destFile) {
        const { player, source, turn } = this.state;
        const { srcRank, srcFile } = source;
        const dest = { destRank, destFile };

        let squares = this.state.squares.map((arr) => {
            return arr.slice(0);
        });

        // console.log('squares: ', squares);

        // MUTATING STATE -- BAD
        squares[srcRank][srcFile].style = { 
            ...squares[srcRank][srcFile].style, 
            backgroundColor: null,
        };

        if (!squares[destRank][destFile] || squares[destRank][destFile].player !== player) {
            const whitePieces = this.state.whitePieces.slice();
            const blackPieces = this.state.blackPieces.slice();

            
            const canMakeMove = this.canMakeMove(squares[srcRank][srcFile], dest);
            const isDestEnemyOccupied = squares[destRank][destFile] ? true : false;

            if (canMakeMove) {
                if (isDestEnemyOccupied) {
                    this.handleCapture(squares[destRank][destFile]);
                }

                squares[destRank][destFile] = squares[srcRank][srcFile];
                squares[srcRank][srcFile] = 0;

                // if (squares[destRank][destFile].player === 1) {
                //     whitePieces.map(whitePiece => (whitePiece.piece === squares[destRank][destFile] ? whitePiece.square = { rank: destRank, file: destFile } : whitePiece));
                // } else {
                //     blackPieces.map(blackPiece => (blackPiece.piece === squares[destRank][destFile] ? blackPiece.square = { rank: destRank, file: destFile } : blackPiece));
                // }

                this.setState({
                    source: undefined,
                    squares,
                    whitePieces,
                    blackPieces,
                    player: player === 1 ? 2 : 1,
                    status: '',
                    turn: turn === 'white' ? 'black' : 'white',
                });
            }
        } else {
            this.setState({
                status: "Wrong selection. Choose valid source and destination again.",
                source: undefined,
            });
        }
    }

    handleCapture(piece) {
        const whitePieces = this.state.whitePieces.slice();
        const blackPieces = this.state.blackPieces.slice();
        const whiteCapturedPieces = this.state.whiteCapturedPieces.slice();
        const blackCapturedPieces = this.state.blackCapturedPieces.slice();

        if (piece.player === 1){
            whiteCapturedPieces.push(piece);
            whitePieces.pop(piece);
        } else {
            blackCapturedPieces.push(piece);
            blackPieces.pop(piece);
        }

        this.setState({
            whitePieces,
            blackPieces,
            whiteCapturedPieces,
            blackCapturedPieces,
        })
    }

    render() {
        const { squares, status, turn, whiteCapturedPieces, blackCapturedPieces } = this.state
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares = {squares}
                        onClick = {(rank, file) => this.handleClick(rank, file)}
                    />
                </div>
                <div className="game-info">
                    <h3>Turn</h3>
                    <div id="player-turn-box" style={{backgroundColor: turn}}>
                    </div>
                    {/* <div className="game-status">{status}</div> */}
                    <div className="captured-pieces-block">
                            <CapturedPieces
                                whiteCapturedPieces = {whiteCapturedPieces}
                                blackCapturedPieces = {blackCapturedPieces}
                            />
                    </div>
                </div>
            </div>
        );
    }
}