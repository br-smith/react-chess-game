import React from "react";

import Square from "./Square";

const CapturedPieces = (props) => {
    function renderSquare(square, i, shade) {
        return (
            <Square
                piece={square}
                style={square.style}
            />
        )
    }

    return (
        <div>
            <div className="board-row">
                { props.whiteCapturedPieces.map((wcp, index) => renderSquare(wcp, index)) }
            </div>
            <div className="board-row">
                { props.blackCapturedPieces.map((bcp, index) => renderSquare(bcp, index)) }
            </div>
        </div>
    )
}

export default CapturedPieces;
