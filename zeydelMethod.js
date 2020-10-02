'use strict';
function zeydelMethod() {
    let height, width;
    let matrixB = [];
    let matrixBeta = [];
    let i, j, k;
    let cont;
    let normaB1, normaB2, normaB;
    let normaBeta;
    let strSum = [];
    let clmnSum = [];
    let x = [];
    let xActive = [];
    let eps = [];
    let deltaX = [];

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
    xActive = JSON.parse(JSON.stringify(matrixBeta));

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
        clmnSum[j] = 0;
    }

    if (normaB1 < normaB2) {
        for (i = 0; i < matrixBeta.length; i++) {
            strSum[i] = Math.abs(matrixBeta[i]);
        };
        normaBeta = Math.max.apply(null, strSum);
        normaB = normaB1;
        console.log("||β||1 = " + normaBeta);
    } else {
        for (i = 0; i < 1; i++) {
            for (j = 0; j < matrixBeta.length; j++) {
                clmnSum[i] = clmnSum[i] + Math.abs(matrixBeta[j]);
            };
        };
        normaBeta = Math.max.apply(null, clmnSum);
        normaB = normaB2;
        console.log("||β||2 = " + normaBeta);
    };

    x.push([]);
    x.push([]);
    for (i = 0; i < matrixBeta.length; i++) {
        x[0][i] = matrixBeta[i];
        x[1][i] = 0;
    };

    for (i = 0; i < 21; i++) {
        x.push([]);
        for (k = 0; k < matrixB.length; k++) {
            x[i + 2][k] = 0
            for (j = 0; j < matrixB[0].length; j++) {
                x[i + 1][k] = x[i + 1][k] + matrixB[k][j] * xActive[j];
            };
            x[i + 1][k] = x[i + 1][k] + matrixBeta[k];
            xActive[k] = x[i + 1][k];
            deltaX[k] = Math.abs(x[i + 1][k] - x[i][k]);
        };
        eps[i] = (Math.pow(normaB, i + 1) / (1 - normaB)) * normaBeta;
        
        x[i + 1][matrixB.length] = eps[i];
        x[i + 1][matrixB.length + 1] = Math.max.apply(null, deltaX);
    };

    
    for (i = 1; i < x.length - 1; i++) { /* Округление до восьми знаков после запятой */
        for (j = 0; j < x[1].length; j++) {
            x[i][j] = parseFloat(x[i][j].toFixed(8));
        }
    };
    console.log(x);
};