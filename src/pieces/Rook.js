import Piece from "./Piece";

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"));
    }

    isMovePossible(src, dest) {
        const { srcRank, srcFile } = src;
        const { destRank, destFile } = dest;

        return (srcRank === destRank || srcFile === destFile);
    }

    getSrcToDestPath(src, dest) {
        const { srcRank, srcFile } = src;
        const { destRank, destFile } = dest;

        let path = [];
        let difference = 0;
        let rankDirection = 0;
        let fileDirection = 0;

        if (srcRank === destRank) {
            difference = Math.abs(destFile - srcFile);
            fileDirection = (destFile - srcFile)/Math.abs(destFile - srcFile);
        } else {
            difference = Math.abs(destRank - srcRank);
            rankDirection = (destRank - srcRank)/Math.abs(destRank - srcRank);
        }

        for(let i = 1; i < difference; i++){
            path.push({ rank: srcRank + i * rankDirection, file: srcFile + i * fileDirection });
        }

        return path;
    }

}
