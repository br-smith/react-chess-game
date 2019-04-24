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
            squares: initializeBoard(),
            whiteCapturedPieces: [],
            blackCapturedPieces: [],
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'white',
        }
    }

    isMoveLegal(srcToDestPath){
        let isLegal = true;
        for(let i = 0; i < srcToDestPath.length; i++){
            if(this.state.squares[srcToDestPath[i]] !== null){
                isLegal = false;
            }
        }
        return isLegal;
    }

    handleClick(i) {
        const { player, sourceSelection, turn } = this.state;
        const squares = this.state.squares.slice();

        if (sourceSelection === -1) {
            if (!squares[i] || squares[i].player !== player) {
                this.setState({
                    status: "Wrong selection. Choose player " + player + " pieces."
                });
            } else {
                squares[i].style = { 
                    ...squares[i].style, 
                    backgroundColor: HIGHLIGHT_COLOR,
                };

                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i,
                });
            }
        } else if (sourceSelection > -1) {
            squares[sourceSelection].style = { 
                ...squares[sourceSelection].style, 
                backgroundColor: null,
            };

            if (squares[i] && squares[i].player === player) {
                this.setState({
                    status: "Wrong selection. Choose valid source and destination again.",
                    sourceSelection: -1,
                });
            } else {
                const squares = this.state.squares.slice();
                const whiteCapturedPieces = this.state.whiteCapturedPieces.slice();
                const blackCapturedPieces = this.state.blackCapturedPieces.slice();
                const isDestEnemyOccupied = squares[i] ? true : false; 
                const isMovePossible = squares[sourceSelection].isMovePossible(sourceSelection, i, isDestEnemyOccupied);
                const srcToDestPath = squares[sourceSelection].getSrcToDestPath(sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath);

                if (isMovePossible && isMoveLegal) {
                    if (squares[i] !== null) {
                        if (squares[i].player === 1){
                            whiteCapturedPieces.push(squares[i]);
                        } else {
                            blackCapturedPieces.push(squares[i]);
                        }
                    }

                    squares[i] = squares[sourceSelection];
                    squares[sourceSelection] = null;

                    this.setState({
                        sourceSelection: -1,
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
                        sourceSelection: -1,
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares = {this.state.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <h3>Turn</h3>
                    <div id="player-turn-box" style={{backgroundColor: this.state.turn}}>
                    </div>
                    <div className="game-status">{this.state.status}</div>
                    <div className="captured-pieces-block">
                            <CapturedPieces
                                whiteCapturedPieces = {this.state.whiteCapturedPieces}
                                blackCapturedPieces = {this.state.blackCapturedPieces}
                            />
                    </div>
                </div>
            </div>
        );
    }
}