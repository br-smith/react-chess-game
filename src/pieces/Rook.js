import Piece from "./Piece";

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"));
    }

    isMovePossible(src, dest) {
        const mod = src % 8;
        const diff = 8 - mod;

        return (Math.abs(src - dest) % 8 === 0 || (dest < src + diff && dest >= src - mod));
    }

    getSrcToDestPath(src, dest) {
        let path = [], pathStart, pathEnd, increment;

        if (src > dest) {
            pathStart = dest;
            pathEnd = src;
        } else {
            pathStart = src;
            pathEnd = dest;
        }

        if (Math.abs(src - dest) % 8 === 0) {
            increment = 8;
            pathStart += 8;
        } else {
            increment = 1;
            pathStart += 1;
        }

        for (let i = pathStart; i < pathEnd; i += increment) {
            path.push(i);
        }

        return path;
    }
}
