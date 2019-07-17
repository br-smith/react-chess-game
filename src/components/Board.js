import React from 'react';
import Square from './Square';

const Board = (props) => {

    function renderSquare(rank, file, shade) {
        const { squares, onClick } = props;
        return (
            <Square
                style={squares[rank][file] ? squares[rank][file].style : null}
                shade={shade}
                onClick={() => onClick(rank, file)}
            />
        )
    }

    function isEven(num) {
        return num % 2 === 0;
    }

    // This board is only used for rendering, and has no impact on the game state
    const board = [];
    for(let i = 7; i >= 0; i--) {
        const squareRows = [];
        for(let j = 0; j < 8; j++) {
            const squareShade = isEven(i + j) ? "light-square" : "dark-square";
            squareRows.push(renderSquare(i, j, squareShade));
        }
        board.push(<div className="board-row">{squareRows}</div>)
    }

    return (
        <div className="board">
            {board}
        </div>
    );
    
}

export default Board;
