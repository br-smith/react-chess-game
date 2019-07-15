import React, { Component } from 'react';

import Board from "./Board";
import CapturedPieces from "./CapturedPieces";
import { HIGHLIGHT_COLOR } from "../utils/Constants";
import initializeBoard from "../helpers/InitializeBoard";

import "../index.css"

export default class Game extends Component {
    constructor() {
        super();

        this.state = {
            isInCheck: false,
            squares: initializeBoard(),
            whiteCapturedPieces: [],
            blackCapturedPieces: [],
            player: 1,
            status: '',
            source: undefined,
            turn: 'white',
        }
    }

    isMoveLegal(srcToDestPath){
        let isLegal = true;
        for(let i = 0; i < srcToDestPath.length; i++){
            if(this.state.squares[srcToDestPath[i].rank][srcToDestPath[i].file]){
                isLegal = false;
            }
        }
        return isLegal;
    }

    handleClick(selectionRank, selectionFile) {
        const { player, source, squares, turn } = this.state;

        if (source) {
            const { srcRank, srcFile } = source;
            const dest = { destRank: selectionRank, destFile: selectionFile }

            squares[srcRank][srcFile].style = { 
                ...squares[srcRank][srcFile].style, 
                backgroundColor: null,
            };

            if (squares[selectionRank][selectionFile] && squares[selectionRank][selectionFile].player === player) {
                this.setState({
                    status: "Wrong selection. Choose valid source and destination again.",
                    source: undefined,
                });
            } else {
                const squares = this.state.squares.slice();
                const whiteCapturedPieces = this.state.whiteCapturedPieces.slice();
                const blackCapturedPieces = this.state.blackCapturedPieces.slice();
                
                const isDestEnemyOccupied = squares[selectionRank][selectionFile] ? true : false;
                const isMovePossible = squares[srcRank][srcFile].isMovePossible(source, dest, isDestEnemyOccupied);
                const srcToDestPath = squares[srcRank][srcFile].getSrcToDestPath(source, dest);
                const isMoveLegal = this.isMoveLegal(srcToDestPath);

                if (isMovePossible && isMoveLegal) {
                    if (isDestEnemyOccupied) {
                        if (squares[selectionRank][selectionFile].player === 1){
                            whiteCapturedPieces.push(squares[selectionRank][selectionFile]);
                        } else {
                            blackCapturedPieces.push(squares[selectionRank][selectionFile]);
                        }
                    }

                    squares[selectionRank][selectionFile] = squares[srcRank][srcFile];
                    squares[srcRank][srcFile] = 0;

                    this.setState({
                        source: undefined,
                        squares,
                        whiteCapturedPieces,
                        blackCapturedPieces,
                        player: player === 1 ? 2 : 1,
                        status: '',
                        turn: turn === 'white' ? 'black' : 'white',
                    });
                } else {
                    this.setState({
                        status: "Wrong selection. Choose valid source and destination again.",
                        source: undefined,
                    });
                }
            }
        } else {
            if (!squares[selectionRank][selectionFile] || squares[selectionRank][selectionFile].player !== player) {
                this.setState({
                    status: "Wrong selection. Choose player " + player + " pieces."
                });
            } else {
                squares[selectionRank][selectionFile].style = { 
                    ...squares[selectionRank][selectionFile].style, 
                    backgroundColor: HIGHLIGHT_COLOR,
                };

                this.setState({
                    status: "Choose destination for the selected piece",
                    source: { srcRank: selectionRank, srcFile: selectionFile },
                });
            }
        }
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
                    <div className="game-status">{status}</div>
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