import Piece from "./Piece";
import { algebraicNotation } from "../utils/Notation";
import { pathToFileURL } from "url";

export default class Pawn extends Piece {
    constructor(player) {
        super(player, (player === 1 ?  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
        this.initialPostitions = {
            1: 1,
            2: 6,
        }
    }

    isMovePossible(src, dest, isDestEnemyOccupied) {
        const { srcRank, srcFile } = src;
        const { destRank, destFile } = dest;

        if (this.player === 1) {
            if (destRank === srcRank + 1) {
                if (isDestEnemyOccupied) {
                    if (destFile === srcFile - 1 || destFile === srcFile + 1) {
                        return true;
                    }
                } else {
                    if (destFile === srcFile) {
                        return true;
                    }
                }
            } else if (destRank === srcRank + 2 && destFile === srcFile) {
                if (srcRank === this.initialPostitions[1]) {
                    return true;
                }
            }
            
        } else if (this.player === 2) {
            if (destRank === srcRank - 1) {
                if (isDestEnemyOccupied) {
                    if (destFile === srcFile - 1 || destFile === srcFile + 1) {
                        return true;
                    }
                } else {
                    if (destFile === srcFile) {
                        return true;
                    }
                }
            } else if (destRank === srcRank - 2 && destFile === srcFile) {
                if (srcRank === this.initialPostitions[2]) {
                    return true;
                }
            }
        }

        return false;
    }

    getSrcToDestPath(src, dest) {
        const { srcRank, srcFile } = src;
        const { destRank } = dest;

        if (destRank === srcRank - 2) {
            return [{ rank: srcRank - 1, file: srcFile }, { rank: srcRank - 2, file: srcFile }];
        } else if (destRank === srcRank + 2) {
            return [{ rank: srcRank + 1, file: srcFile }, { rank: srcRank + 2, file: srcFile }]
        }

        return [];
    }

    getThreatenedSquares(src) {
        const { rank, file } = src;

        let threatened = [];

        if (file - 1 >= 0) {
            threatened.push({ rank: rank - 1, file: file - 1})
        }

        if (file + 1 <= 7) {
            threatened.push({rank: rank - 1, file: file + 1})
        }

        return threatened;
    }

}
