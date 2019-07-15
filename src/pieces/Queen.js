import Piece from './Piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"));
    }

    isMovePossible(src, dest) {
        const { srcRank, srcFile } = src;
        const { destRank, destFile } = dest;

        return srcRank === destRank || 
            srcFile === destFile || 
            (Math.abs(destRank - srcRank) === Math.abs(destFile - srcFile));


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
        } else if (srcFile === destFile) {
            difference = Math.abs(destRank - srcRank);
            rankDirection = (destRank - srcRank)/Math.abs(destRank - srcRank);
        } else {
            difference = Math.abs(destRank - srcRank);
            rankDirection = (destRank - srcRank)/Math.abs(destRank - srcRank);
            fileDirection = (destFile - srcFile)/Math.abs(destFile - srcFile);
        }

        for(let i = 1; i < difference; i++){
            path.push({ rank: srcRank + i * rankDirection, file: srcFile + i * fileDirection });
        }

        return path;
    }

}
