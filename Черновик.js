/* Поячеечное заполнение */
for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
        matrix[i][j] = prompt("Введите ячейку " + (i + 1).toString() + "x" + (j + 1).toString())
    }
};

/* Следующий код работает только для матрицы 5*6 */
if (height == 5 && width == 6) {
    x5 = matrix[4][5];
    x4 = matrix[3][5] - x5 * matrix[3][4];
    x3 = matrix[2][5] - x5 * matrix[2][4] - x4 * matrix[2][3];
    x2 = matrix[1][5] - x5 * matrix[1][4] - x4 * matrix[1][3] - x3 * matrix[1][2];
    x1 = matrix[0][5] - x5 * matrix[0][4] - x4 * matrix[0][3] - x3 * matrix[0][2] - x2 * matrix[0][1];
    console.log('x1 =' + x1)
    console.log('x2 = ' + x2);
    console.log('x3 = ' + x3);
    console.log('x4 = ' + x4);
    console.log('x5 = ' + x5);
}