'use strict';
function createMathFunction(mathFunctionStrParts) {
    let i, j;
    let partsOfParts = [];
    for (i = 0; i < mathFunctionStrParts.length; i++) {
        partsOfParts.push([]);
        partsOfParts[i] = mathFunctionStrParts[i].split('*');
    };

    for (i = 0; i < partsOfParts.length; i++) {
        for (j = 0; j < partsOfParts[i].length; j++) {
            if (j === 0) {
                partsOfParts[i][j] = parseFloat(partsOfParts[i][j])
            };
        };
    };
    return partsOfParts;
};

function findPoint(x) {
    let i;
    let y;
    let length = window.mathFunction.length;
    y = 0;
    for (i = 0; i < length; i++) {
        y = y + window.mathFunction[i][0] * Math.pow(x, window.mathFunction[i].length - 1);
    };
    return y;
}

function dichotomy() {
    let i, j;
    let mathFunctionStrParts = [];
    window.mathFunction = [];
    let eps = prompt('Введите необходимую точность вычислений');
    let eps1 = eps + 1;
    let results = [['a', 'c', 'b', 'f(a)', 'f(c)', 'f(b)'], []];

    mathFunctionStrParts = (
        prompt(
            'Введите вашу функцию \nПример записи: 3*x*x*x +0.5*x*x -7\nВсе слагаемые разделяются пробелом\nЕсли коэффицент = 1, то его нужно указать\nПример: 1*x*x'
        ).toString()).split(' ');
    mathFunction = createMathFunction(mathFunctionStrParts);
    results[1][0] = prompt('Введите число "а"');
    results[1][2] = prompt('Введите число "b"');
    results[1][1] = (results[1][0] + results[1][2]) / 2;
    results[1][3] = findPoint(results[1][0]);   /* a */
    results[1][4] = findPoint(results[1][1]);   /* c */
    results[1][5] = findPoint(results[1][2]);   /* b */
    for (j = 0; j < results[1].length; j++) {
        results[1][j] = parseFloat(results[1][j]);
    }
    for (i = 2; eps1 > eps; i++) {
        results.push([]);
        if (results[i - 1][3] / results[i - 1][4] < 0) {
            results[i][0] = results[i - 1][0];
            results[i][2] = results[i - 1][1];
        } else if (results[i - 1][4] / results[i - 1][5] < 0) {
            results[i][0] = results[i - 1][1];
            results[i][2] = results[i - 1][2];
        };
        results[i][1] = (results[i][0] + results[i][2]) / 2;
        results[i][3] = findPoint(results[i][0]);
        results[i][4] = findPoint(results[i][1]);
        results[i][5] = findPoint(results[i][2]);
        eps1 = (results[i][2] - results[i][0]) / 2
    };
    console.log(results);
};