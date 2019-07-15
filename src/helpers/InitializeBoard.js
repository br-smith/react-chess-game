import Pawn from "../pieces/Pawn";
import Rook from "../pieces/Rook";
import Knight from "../pieces/Knight";
import Bishop from "../pieces/Bishop";
import Queen from "../pieces/Queen";
import King from "../pieces/King";

export default function initializeBoard() {
    let squares = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]

    for (let i = 0; i < 8; i++) {
        squares[1][i] = new Pawn(1);
        squares[6][i] = new Pawn(2);
    }

    squares[0][0] = new Rook(1);
    squares[0][7] = new Rook(1);
    squares[7][0] = new Rook(2);
    squares[7][7] = new Rook(2);

    squares[0][1] = new Knight(1);
    squares[0][6] = new Knight(1);
    squares[7][1] = new Knight(2);
    squares[7][6] = new Knight(2);

    squares[0][2] = new Bishop(1);
    squares[0][5] = new Bishop(1);
    squares[7][2] = new Bishop(2);
    squares[7][5] = new Bishop(2);

    squares[0][3] = new Queen(1);
    squares[7][3] = new Queen(2);

    squares[0][4] = new King(1);
    squares[7][4] = new King(2);

    return squares;
}
