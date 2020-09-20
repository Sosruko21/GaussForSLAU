let height, width;
let matrix = [];
let i, j;


height = parseInt(prompt('Количество строк в вашей матрице'));
for (i = 0; i < height; i++) {
    matrix.push([]);
};

width = height + 1;
for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
        matrix[i].push(0);
    }
};

for (i = 0; i < height; i++) {
    matrix[i] = prompt("Введите строку №" + (i + 1).toString()).split(' ')
};

for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[0].length; j++) {
        matrix[i][j] = matrix[i][j] / matrix[i][i];
    };
};