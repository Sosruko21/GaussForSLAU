/* let matrix = [
    [1, -18, 12],
    [-18, 3, -19],
    [12, -19, -9],
]; */
let i, j, k;
let matrix = [
    [-12, 4, 8],
    [4, 11, -6],
    [8, -6, 2],
];
let vVect = [0, 0, 0];
let ro = 0;
let coef = 1 / Math.sqrt(3);
let omegaVect = [coef, coef, coef];

for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[0].length; j++) {
        vVect[i] = vVect[i] + matrix[i][j] * omegaVect[j];
    };
};

for (i = 0; i < vVect.length; i++) {
    ro = ro + vVect[i]*omegaVect[i];
}