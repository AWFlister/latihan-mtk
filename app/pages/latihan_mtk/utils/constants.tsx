export type Operation = number & {}

export const OPERATIONS = {
    PLUS: 1 as Operation,
    MINUS: 2 as Operation,
    MULTIPLICATION: 3 as Operation,
    DIVISION: 4 as Operation
};

export const OPSYMBOLS = {
    [OPERATIONS.PLUS]: "+",
    [OPERATIONS.MINUS]: "-",
    [OPERATIONS.MULTIPLICATION]: "x",
    [OPERATIONS.DIVISION]: "÷"
};

export const OPLABELS = {
    [OPERATIONS.PLUS]: "Penjumlahan",
    [OPERATIONS.MINUS]: "Pengurangan",
    [OPERATIONS.MULTIPLICATION]: "Perkalian",
    [OPERATIONS.DIVISION]: "Pembagian (dalam pengembangan)"
}