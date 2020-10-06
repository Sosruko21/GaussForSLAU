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

function matrixMult(A, B) { /* Только для квадратных одноразмерных матриц */
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
    for (let i = 0; i < A.length; i++) {
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
    let height, width, iterations;
    let matrixA = [];
    let matrixE = [];
    let matrixH = [];
    let matrixV = [];
    let i, j, k;
    let iCont, jCont;
    let aMax, coef;
    let fi;
    let matrixHT = [];
    let vVector = [];

    iterations = parseInt(prompt('Количество итераций'));

    height = parseInt(prompt('Количество строк в вашей матрице'));
    for (i = 0; i < height; i++) {
        matrixA.push([]);
        matrixE.push([]);
    };

    width = height;
    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            matrixA[i].push(0);
            if (i == j) {
                matrixE[i][j] = 1;
            } else {
                matrixE[i][j] = 0;
            };
        };
    };

    for (i = 0; i < height; i++) {
        matrixA[i] = prompt("Введите строку №" + (i + 1).toString()).split(' ')
    };

    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            matrixA[i][j] = parseInt(matrixA[i][j])
        };
    };

    for (k = 0; k < iterations; k++) {
        aMax = 0;
        for (i = 0; i < matrixA.length; i++) {
            for (j = i + 1; j < matrixA[i].length; j++) {
                if (Math.abs(matrixA[i][j]) > aMax) {
                    aMax = Math.abs(matrixA[i][j]);
                    iCont = i;
                    jCont = j;
                };
            };
        };

        fi = (1 / 2) * Math.atan((2 * matrixA[iCont][jCont]) / (matrixA[iCont][iCont] - matrixA[jCont][jCont]))
        if (matrixA[iCont][iCont] === matrixA[jCont][jCont]) {
            if (matrixA[iCont][jCont] > 0) {
                fi = Math.PI / 4
            } else if (matrixA[iCont][jCont] < 0) {
                fi = Math.PI / (-4)
            };
        };
        console.log('fi' + (k + 1).toString() + ' = ' + fi)

        matrixH = JSON.parse(JSON.stringify(matrixE));
        matrixH[iCont][iCont] = Math.cos(fi);
        matrixH[iCont][jCont] = Math.sin(fi) * (-1);
        matrixH[jCont][iCont] = Math.sin(fi);
        matrixH[jCont][jCont] = Math.cos(fi);

        matrixH = roundMatrix(matrixH, 8)

        matrixHT = transpon(matrixH);

        matrixA = matrixMult(matrixHT, matrixA);
        matrixA = matrixMult(matrixA, matrixH);

        matrixA = roundMatrix(matrixA, 8);

        if (k === 0) {
            matrixV = JSON.parse(JSON.stringify(matrixH))
        };
        if (k > 0) {
            matrixV = matrixMult(matrixV, matrixH)
            matrixV = roundMatrix(matrixV, 8);
        };
        console.log("Матрица А" + (k + 1));
        console.log(matrixA);
        console.log("Матрица H" + (k + 1));
        console.log(matrixH);
    };
    let consoleV = JSON.parse(JSON.stringify(matrixV))
    console.log("\nМатрица V");
    console.log(consoleV);

    for (i = 0; i < width; i++) {
        console.log('λ' + (i + 1).toString() + ' = ' + matrixA[i][i]);
        coef = matrixV[i][i]
        for (j = 0; j < height; j++) {
            matrixV[j][i] = matrixV[j][i] / coef;
            vVector[j] = matrixV[j][i];
        };
        console.log('Вектор v' + (i + 1).toString());
        console.log(vVector);
    };
};