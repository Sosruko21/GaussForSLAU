'use strict';
let height, width;
let matrixB = [];
let matrixBeta = [];
let i, j;
let cont;
let normaB1, normaB2;
let normaBeta1, normaBeta2;
let strSum = [];
let clmnSum = [];


height = parseInt(prompt('Количество строк в вашей матрице'));
for (i = 0; i < height; i++) {
    strSum[i] = 0;
    clmnSum[i] = 0;
    matrixB.push([]);
};

width = height + 1;
for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
        matrixB[i].push(0);
    }
};

for (i = 0; i < height; i++) {
    matrixB[i] = prompt("Введите строку №" + (i + 1).toString()).split(' ')
};

for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
        matrixB[i][j] = parseInt(matrixB[i][j])
    };
};

for (i = 0; i < matrixB.length; i++) {
    cont = matrixB[i][i];
    for (j = 0; j < matrixB[0].length; j++) {
        matrixB[i][j] = (matrixB[i][j] / cont);
    };
};

for (i = 0; i < matrixB.length; i++) {
    matrixB[i][i] = 0;
};

for (i = 0; i < matrixB.length; i++) {
    matrixBeta[i] = matrixB[i][width - 1];
};

for (i = 0; i < matrixB.length; i++) {
    for (j = 0; j < matrixB[0].length; j++) {
        matrixB[i][j] = matrixB[i][j] * (-1);
    };
};

for (i = 0; i < height; i++) {
    matrixB[i].pop();
};

for (i = 0; i < matrixB.length; i++) {
    for (j = 0; j < matrixB[0].length; j++) {
        strSum[i] = strSum[i] + Math.abs(matrixB[i][j]);
    }
};
normaB1 = Math.max.apply(null, strSum);
console.log("||B||1 = " + normaB1);

for (i = 0; i < matrixB[0].length; i++) {
    for (j = 0; j < matrixB.length; j++) {
        clmnSum[i] = clmnSum[i] + Math.abs(matrixB[j][i]);
    }
};
normaB2 = Math.max.apply(null, clmnSum);
console.log("||B||2 = " + normaB2);

for (i = 0; i < matrixB.length; i++) {
    strSum[i] = 0;
}
for (j = 0; j < matrixB[0].length; j++) {
    clmnSum[i] = 0;
}

if (normaB1 < normaB2) {
    for (i = 0; i < matrixBeta.length; i++) {
        strSum[i] = Math.abs(matrixBeta[i]);
    };
    normaBeta1 = Math.max.apply(null, strSum);
    console.log("||β||1 = " + normaBeta1);
} else {
    for (i = 0; i < matrixBeta[0].length; i++) {
        for (j = 0; j < matrixBeta.length; j++) {
            clmnSum[i] = clmnSum[i] + Math.abs(matrixB[j][i]);
        }
    };
    normaBeta2 = Math.max.apply(null, clmnSum);
    console.log("||β||2 = " + normaBeta2);
};