const fileConversion = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
}

export const algebraicNotation = (rank, file) => {
    return `${fileConversion[file]}` + `${rank + 1}`;
}