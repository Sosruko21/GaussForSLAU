let matrix = [];        /* Объявление матрицы и всех необходимых переменных */
let detParts = [];
let i, j, k;
let m;
let height, width;
let coef;
let det = 1;
let cont;
let x, y, z;
let x1, x2, x3, x4, x5;

alert('Производится ввод сразу расширеной матрицы \n (если у вас матрица 3*3, то вписываете 3*4, 4*4 => 4*5 и т.д)')
height = prompt('Количество строк в вашей матрице'); /* Запрос у пользователя кол-ва строк */

for (i = 0; i < height; i++) {
    matrix.push([]);
};

width = prompt('Количество столбцов в вашей матрице'); /* Запрос кол-ва столбцов */

for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
        matrix[i].push(0);
    }
};

for (i = 0; i < height; i++) {               /* Заполнение матрицы пользователем */
    for (j = 0; j < width; j++) {
        matrix[i][j] = prompt("Введите ячейку "+(i+1).toString()+"x"+(j+1).toString())
    }
};

let matrixClone = JSON.parse(JSON.stringify(matrix));  /* Дублирование исходной матрицы для обратной матрицы */ /* (Особенность языка) */
console.log("Ваша матрица:")
for (m = 0; m < matrix.length; m++) {
    console.log('' + matrix[m]);
};

console.log('Начало прямого хода Гаусса (деление строчки на ячейку главной диагонали и зануление чисел под ней):')
for (i = 0; i < matrix.length; i++) {       /* Цикл для рассчета детерминанта методом Гаусса */

    if (matrix[i][i] == 0) {                /* Проверка на наличие нуля на главной диагонали */
        for (j = 0; j < matrix[0].length; j++) {    /* Переставление строк в случае положительной проверки */
            cont = matrix[i][j];
            matrix[i][j] = matrix[i + 1][j];
            matrix[i + 1][j] = cont;
        }
        det = det * (-1)                            /* Смена знака детерминанта из-за переставления строк  */
    }

    detParts[i] = matrix[i][i]      /* Запись делителей в массив для дальнейшего подсчета детерминанта */


    for (j = 0; j < matrix[0].length; j++) {
        matrix[i][j] = matrix[i][j] / detParts[i];      /* Разделение строки (перебор ячеек через цикл) на делитель */
    }
    console.log('\n');
    console.log('Шаг' + (i + 1));
    for (m = 0; m < matrix.length; m++) {
        console.log('' + matrix[m]);
    };

    console.log('Зануление ячеек ниже главной диагонали')
    for (k = i + 1; k < matrix.length; k++) {       /* Зануление ячеек, стоящих ниже главной диагонали */
        coef = matrix[k][i] / matrix[i][i];
        for (j = 0; j < matrix[0].length; j++) {
            matrix[k][j] = matrix[k][j] - (matrix[i][j] * coef)
        }
    }

    for (m = 0; m < matrix.length; m++) {
        console.log('' + matrix[m]);
    };
};

console.log('\n');
for (i = 0; i < detParts.length; i++) {     /* Расчет детерминанта */
    console.log("Делитель" + (i + 1).toString() + ": " + (detParts[i]));
    det = det * detParts[i]
};
console.log('\n');
console.log("Детерминант:");
console.log(det);

console.log('\n');
let xN;
let xG = 0;
let xMatrix = [];
for (i = 0; i < matrix.length; i++) {
    xN = matrix[matrix.length - 1 - i][width - 1] - xG
    xMatrix[i] = xN;
    xG = 0
    for (j = 1; j < i + 2 && i < matrix.length - 1; j++) {
        xG = xG + xMatrix[j - 1] * matrix[matrix.length - 2 - i][width - 1 - j];
    }
    console.log('x' + (height - i).toString() + ' = ' + xN);
};

/* Старая часть кода */
/* Следующий код работает только для матрицы 5*6 */
/* if (height == 5 && width == 6) {
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
} */

console.log('\n');
let mirrorMatrix = [];
mirrorMatrix = JSON.parse(JSON.stringify(matrixClone));
for (i = 0; i < height; i++) {
    mirrorMatrix[i].pop(); /* Отрезаю последний столбец из исходной матрицы, т.к. он нам больше не нужен */
}

for (i = 0; i < mirrorMatrix.length; i++) {  /* Создание новой расширенной матрицы */
    for (j = 0; j < mirrorMatrix.length; j++) {
        if (i == j) {
            mirrorMatrix[i].push(1);
        } else {
            mirrorMatrix[i].push(0);
        }
    }
}

let divider = [];

console.log('\n');
console.log('Расширенная исходная матрица: ')
for (m = 0; m < mirrorMatrix.length; m++) {
    console.log('' + mirrorMatrix[m]);
};
for (i = 0; i < mirrorMatrix.length; i++) {

    if (mirrorMatrix[i][i] == 0) {
        for (j = 0; j < mirrorMatrix[0].length; j++) {
            cont = mirrorMatrix[i][j];
            mirrorMatrix[i][j] = mirrorMatrix[i + 1][j];
            mirrorMatrix[i + 1][j] = cont;
        }
    }

    divider[i] = mirrorMatrix[i][i];


    for (j = 0; j < mirrorMatrix[0].length; j++) {
        mirrorMatrix[i][j] = mirrorMatrix[i][j] / divider[i];
    }
    console.log('\n');
    console.log('Шаг' + (i + 1));
    for (m = 0; m < mirrorMatrix.length; m++) {
        console.log('' + mirrorMatrix[m]);
    };

    console.log('Зануление ячеек ниже главной диагонали')
    for (k = i + 1; k < mirrorMatrix.length; k++) {
        coef = mirrorMatrix[k][i] / mirrorMatrix[i][i];
        for (j = 0; j < mirrorMatrix[0].length; j++) {
            mirrorMatrix[k][j] = mirrorMatrix[k][j] - (mirrorMatrix[i][j] * coef)
        }
    }
    for (m = 0; m < mirrorMatrix.length; m++) {
        console.log('' + mirrorMatrix[m]);
    };
}; /* Тут закончился прямой ход метода Гаусса */

console.log('\n');
console.log('Обратный ход Гаусса:');
console.log('Только зануление ячеек выше главной диагонали:');
for (i = mirrorMatrix.length - 1; i > 0; i--) {
    console.log('\n');
    console.log('Шаг' + (mirrorMatrix.length - i).toString() + ':')
    for (k = i - 1; k > -1; k--) {
        coef = mirrorMatrix[k][i] / mirrorMatrix[i][i];
        for (j = mirrorMatrix[0].length - 1; j > 0; j--) {
            mirrorMatrix[k][j] = mirrorMatrix[k][j] - (mirrorMatrix[i][j] * coef)
        }
    }
    for (m = 0; m < mirrorMatrix.length; m++) {
        console.log('' + mirrorMatrix[m]);
    };
};
console.log(mirrorMatrix);
console.log(matrix)
console.log('\n');console.log('\n');console.log('\n');
console.log('Придумал и написал Тагиров Сослан, М2О-310Б-18, 2020.09')