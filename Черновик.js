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


function roundMatrix(x) {
    let i, j;
    for (i = 1; i < x.length - 1; i++) { /* Округление до восьми знаков после запятой */
        for (j = 0; j < x[1].length; j++) {
            x[i][j] = parseFloat(x[i][j].toFixed(8));
        }
    };
    return x;
}

/* Ruslan */

for (i = 0; i < matrix.length; i++) {
    for (k = i + 1; k < matrix.length; k++) {
        coef = matrix[k][i] / matrix[i][i];
        for (j = 0; j < matrix[i].length; j++) {
            matrix[k][j] = matrix[k][j] - (matrix[i][j] * coef)
        }
    }
}

/* YAKOBI */

'use strict';
function transpon(A) {
    let i, j;
    let B = [];
    for (i = 0; i < A.length; i++) {
        B.push([]);
    };
    for (i = 0; i < A.length; i++) {
        for (j = 0; j < A[i].length; j++) {
            B[j][i] = A[i][j]
        };
    };
    return B;
};

function matrixMult(A, B) {
    let C = [];
    let i, j, k;
    for (i = 0; i < A.length; i++) {
        C.push([]);
    };
    for (i = 0; i < A.length; i++) {
        for (j = 0; j < A[i].length; j++) {
            C[i][j] = 0
        };
    };

    for (i = 0; i < A.length; i++) {
        for (j = 0; j < A[i].length; j++) {
            for (k = 0; k < A[i].length; k++) {
                C[i][j] = C[i][j] + A[i][k] * B[k][j]
            };
        };
    };

    return C;
};

function vectorMult(A, B) {
    let C = 0;
    let i;
    for (i = 0; i < A.length; i++) {
        C = C + A[i] * B[i];
    };
    return C;
};

function roundMatrix(x, k) {
    let i, j;
    for (i = 0; i < x.length; i++) {
        for (j = 0; j < x[i].length; j++) {
            x[i][j] = parseFloat(x[i][j].toFixed(k));
        }
    };
    return x;
}

function yakobi() {
    let matrixA = [
        [17, 1, 1],
        [1, 17, 2],
        [1, 2, 4]
    ];
    let matrixE = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    let matrixH = [];
    let i, j, k;
    let iCont, jCont;
    let aMax;
    let fi;
    let matrixHT = [];

    for (k = 0; k < 21; k++) {
        for (i = 0; i < matrixA.length; i++) {
            for (j = i + 1; j < matrixA[i].length; j++) {
                if (Math.abs(matrixA[i][j]) > aMax) {
                    aMax = matrixA[i][j];
                    iCont = i;
                    jCont = j;
                };
            };
        };

        fi = (1 / 2) * Math.atan((2 * matrixA[iCont][jCont]) / (matrixA[iCont][iCont] - matrixA[jCont][jCont]))
        if (matrixA[iCont][iCont] === matrixA[jCont][jCont]) {
            fi = Math.PI / 4
        };

        matrixH = JSON.parse(JSON.stringify(matrixE));
        matrixH[iCont][iCont] = Math.cos(fi);
        matrixH[iCont][jCont] = Math.sin(fi) * (-1);
        matrixH[jCont][iCont] = Math.sin(fi);
        matrixH[jCont][jCont] = Math.cos(fi);

        matrixHT = transpon(matrixH);

        matrixA = matrixMult(matrixHT, matrixA);
        matrixA = matrixMult(matrixA, matrixH);

        matrixA = roundMatrix(matrixA);
        console.log(matrixA);
    };

};


/* 
Проверка якоби 
А * лямбда = лямбда * v
*/
