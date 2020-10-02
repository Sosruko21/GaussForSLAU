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
    let matrixV = [];
    let i, j, k;
    let iCont, jCont;
    let aMax;
    let fi;
    let matrixHT = [];

    for (k = 0; k < 21; k++) {
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

        matrixH = JSON.parse(JSON.stringify(matrixE));
        matrixH[iCont][iCont] = Math.cos(fi);
        matrixH[iCont][jCont] = Math.sin(fi) * (-1);
        matrixH[jCont][iCont] = Math.sin(fi);
        matrixH[jCont][jCont] = Math.cos(fi);

        matrixH = roundMatrix(matrixH, 12)

        matrixHT = transpon(matrixH);

        matrixA = matrixMult(matrixHT, matrixA);
        matrixA = matrixMult(matrixA, matrixH);

        matrixA = roundMatrix(matrixA, 8);

        if (k === 0) {
            matrixV = JSON.parse(JSON.stringify(matrixH))
        }
        if (k > 0) {
            matrixV = matrixMult(matrixV, matrixH)
            matrixV = roundMatrix(matrixV, 8);
        }

        console.log(matrixA);
    };
    console.log("\nМатрица V")
    console.log(matrixV)
};