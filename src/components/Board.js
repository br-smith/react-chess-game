import React from 'react';
import Square from './Square';

const Board = (props) => {

    function renderSquare(i, shade) {
        const { squares, onClick } = props;
        return (
            <Square
                piece={squares[i]}
                style={squares[i] ? squares[i].style : null}
                shade={shade}
                onClick={() => onClick(i)}
            />
        )
    }

    function isEven(num) {
        return num % 2 === 0;
    }


    const board = [];
    for(let i = 0; i < 8; i++) {
        const squareRows = [];
        for(let j = 0; j < 8; j++) {
            const squareShade = isEven(i + j) ? "light-square" : "dark-square";
            squareRows.push(renderSquare((i * 8) + j, squareShade));
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
