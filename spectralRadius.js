function multMatrixVector(A, B) {
    let C = [];
    let i, j;
    for (i = 0; i < A.length; i++) {
        C[i] = 0;
        for (j = 0; j < A[i].length; j++) {
            C[i] = C[i] + A[i][j] * B[j];
        };
    };
    return C;
};

function roundMatrix(x, k) {
    let i, j;
    for (i = 0; i < x.length; i++) {
        for (j = 0; j < x[i].length; j++) {
            x[i][j] = parseFloat(x[i][j].toFixed(k));
        };
    };
    return x;
};

function roundVector(x, k) {
    let i;
    for (i = 0; i < x.length; i++) {
        x[i] = parseFloat(x[i].toFixed(k));
    };
    return x;
};

function spectralRadius() {
    let height, iterations;
    let i, j, k;
    let matrix = [];
    let vVect = [];
    let ro;
    let coef = 1 / Math.sqrt(3);
    let omegaVect = [];
    let euclidNorm;

    iterations = parseInt(prompt('Количество итераций'));
    height = parseInt(prompt('Количество строк в вашей матрице'));
    for (i = 0; i < height; i++) {
        matrix.push([]);
    };
    for (i = 0; i < height; i++) {
        matrix[i] = prompt("Введите строку №" + (i + 1).toString()).split(' ')
    };
    for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = parseInt(matrix[i][j])
        };
    };

    for (i = 0; i < matrix.length; i++) {
        omegaVect[i] = coef;
    };
    omegaVect = roundVector(omegaVect, 8);
    console.log('Вектор ω0');
    console.log(omegaVect);
    console.log('\n')

    for (k = 0; k < iterations; k++) {
        for (i = 0; i < matrix.length; i++) {
            vVect[i] = 0;
        };

        vVect = multMatrixVector(matrix, omegaVect);
        vVect = roundVector(vVect, 8);
        ro = 0;
        for (i = 0; i < vVect.length; i++) {
            ro = ro + vVect[i] * omegaVect[i];
        };
        console.log('Матрица v'+(k+1).toString());
        console.log(vVect);
        console.log('Число ρ'+(k+1).toString());
        console.log(ro);


        euclidNorm = 0;
        for (i = 0; i < vVect.length; i++) {
            euclidNorm = euclidNorm + Math.pow(vVect[i], 2);
        };
        euclidNorm = Math.sqrt(euclidNorm);
        console.log('Норма вектора v'+(k+1).toString()+' = ' + euclidNorm)

        for (i = 0; i < omegaVect.length; i++) {
            omegaVect[i] = vVect[i] / euclidNorm;
        };
        console.log('Вектор ω'+(k+1).toString());
        console.log(omegaVect);
        console.log('\n')
    };
};