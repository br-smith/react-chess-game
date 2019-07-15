import Piece from "./Piece";

export default class Knight extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
    }

    isMovePossible(src, dest) {
        const { srcRank, srcFile } = src;
        const { destRank, destFile } = dest;

        return (Math.abs(destRank - srcRank) === 2 && Math.abs(destFile - srcFile) === 1) || (Math.abs(destRank - srcRank) === 1 && Math.abs(destFile - srcFile) === 2)
    }

    getSrcToDestPath() {
        return [];
    }
}
