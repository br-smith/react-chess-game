import Piece from './Piece';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"));
    }

    isMovePossible(src, dest) {
        const { srcRank, srcFile } = src;
        const { destRank, destFile } = dest;

        return Math.abs(srcRank - destRank) <= 1 && Math.abs(srcFile - destFile) <= 1;
    }

    getSrcToDestPath(src, dest) {
        return [];
    }
}
