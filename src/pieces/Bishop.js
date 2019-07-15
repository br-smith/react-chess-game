import Piece from "./Piece";

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
    }

    isMovePossible(src, dest) {
        const { srcRank, srcFile } = src;
        const { destRank, destFile } = dest;

        return Math.abs(destRank - srcRank) === Math.abs(destFile - srcFile);
    }

    getSrcToDestPath(src, dest) {
        const { srcRank, srcFile } = src;
        const { destRank, destFile } = dest;

        let path = [];

        const difference = Math.abs(destRank - srcRank);
        const rankDirection = (destRank - srcRank)/Math.abs(destRank - srcRank);
        const fileDirection = (destFile - srcFile)/Math.abs(destFile - srcFile);

        for(let i = 1; i < difference; i++){
            path.push({ rank: srcRank + i * rankDirection, file: srcFile + i * fileDirection });
        }

        return path;
    }
}
