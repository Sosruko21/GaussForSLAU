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

function diff(f, x) {
    let dx = 0.000001;
    return (f(x + dx) - f(x)) / dx;
};

function dichotomy() { /* 4.1 */
    let i, j;
    let mathFunctionStrParts = [];
    window.mathFunction = [];
    let eps = parseFloat(prompt('Введите необходимую точность вычислений'));
    let eps1 = eps + 1;
    let eps2 = eps + 1;
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
    i = 2;
    while (i < 7 || eps1 > eps || eps2 > eps) {
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
        eps1 = Math.abs((results[i][2] - results[i][0]) / 2);
        eps2 = Math.abs(results[i][4]);
        i++;
    };
    console.log(results);
};

function hords() {  /* 4.2 */
    let i, j;
    let mathFunctionStrParts = [];
    window.mathFunction = [];
    let eps = prompt('Введите необходимую точность вычислений');
    let eps1 = eps + 1;
    let eps2 = eps + 1;
    let results = [['a', 'c', 'b', 'f(a)', 'f(c)', 'f(b)'], []];

    mathFunctionStrParts = (
        prompt(
            'Введите вашу функцию \nПример записи: 3*x*x*x +0.5*x*x -7\nВсе слагаемые разделяются пробелом\nЕсли коэффицент = 1, то его нужно указать\nПример: 1*x*x'
        ).toString()).split(' ');
    mathFunction = createMathFunction(mathFunctionStrParts);
    results[1][0] = prompt('Введите число "а"');
    results[1][2] = prompt('Введите число "b"');
    results[1][3] = findPoint(results[1][0]);   /* a */
    results[1][5] = findPoint(results[1][2]);   /* b */
    results[1][1] = (results[1][0] * results[1][5] - results[1][2] * results[1][3]) / (results[1][5] - results[1][3]);
    results[1][4] = findPoint(results[1][1]);   /* c */
    for (j = 0; j < results[1].length; j++) {
        results[1][j] = parseFloat(results[1][j]);
    };
    i = 2;
    while (i < 7 || eps1 > eps || eps2 > eps) {
        results.push([]);
        if (results[i - 1][3] / results[i - 1][4] < 0) {
            results[i][0] = results[i - 1][0];
            results[i][2] = results[i - 1][1];
        } else if (results[i - 1][4] / results[i - 1][5] < 0) {
            results[i][0] = results[i - 1][1];
            results[i][2] = results[i - 1][2];
        };
        results[i][3] = findPoint(results[i][0]);
        results[i][5] = findPoint(results[i][2]);
        results[i][1] = (results[i][0] * results[i][5] - results[i][2] * results[i][3]) / (results[i][5] - results[i][3]);
        results[i][4] = findPoint(results[i][1]);
        eps1 = Math.abs(results[i][1] - results[i - 1][1]);
        eps2 = Math.abs(results[i][4]);
    };
    console.log(results);
};

function newton() {  /* 4.3 */
    let i, j;
    let mathFunctionStrParts = [];
    window.mathFunction = [];
    let eps = prompt('Введите необходимую точность вычислений');
    let eps1 = eps + 1;
    let results = [['a', 'c', 'b', 'f(a)', 'f(c)', 'f(b)'], []];


};


function iterations() {
    let y = function (x) {
        xPartsSum = 0;
        for (i = 0; i < mathFunction.length; i++) {
            xPartsSum = xPartsSum + mathFunction[i][0] * Math.pow(x, mathFunction[i].length - 1);
        };
        return xPartsSum;
    };
    let g = function (x) {
        xPartsSum = 0;
        for (i = 1; i < mathFunction.length; i++) {
            xPartsSum = xPartsSum + mathFunction[i][0] * Math.pow(x, mathFunction[i].length - 1);
        };
        xPartsSum = xPartsSum * (-1);
        return Math.pow(xPartsSum, 1 / (mathFunction[0].length - 1));
    };

    let i, j;
    let a, b;
    let x;
    let mathFunctionStrParts = [];
    window.mathFunction = [];
    let eps = prompt('Введите необходимую точность вычислений');
    let eps1 = eps + 1;
    let eps2 = eps + 1;
    let epsGen = eps + 1;
    let xPartsSum = 0;
    let results = [['x', 'f(x)', 'g(x)', "g'(x)"], []];

    mathFunctionStrParts = (
        prompt(
            'Введите вашу функцию \nПример записи: 3*x*x*x +0.5*x*x -7\nВсе слагаемые разделяются пробелом\nЕсли коэффицент = 1, то его нужно указать\nПример: 1*x*x'
        ).toString()).split(' ');
    mathFunction = createMathFunction(mathFunctionStrParts);
    a = parseFloat(prompt('Введите число "a"'));
    b = parseFloat(prompt('Введите число "b"'));
    if (y(a) * y(b) < 0) {
        results[1][0] = b;
        results[1][1] = y(results[1][0]);
        results[1][2] = g(results[1][0]);
        results[1][3] = diff(g, results[1][0]);
    } else if (y(a) * y(b) > 0) {
        alert('Корни на данном участке не найдены')
    };
    for (i = 2; i < 10; i++) {
        results.push([]);
        results[i].push(results[i - 1][2]);
        results[i].push(y(results[i - 1][0]));
        results[i].push(g(results[i - 1][0]));
        results[i].push(diff(g, results[i - 1][0]));
    };
    console.log(results)

};

function transcendent() {
    let question = parseInt(
        prompt(
            'Выберите номер программы\n1 - Метод половинных сечений\n2 - Метод хорд (секущих)\n--Ньютон ещё не работает--\n--Итерации ещё не работают--'
        )
    );
    switch (question) {
        case 1:
            dichotomy();
            break;
        case 2:
            hords();
            break;
        case 3:
            alert('Неа, Ньютон всё ещё не работает')
            break;
        case 4:
            iterations();
            break;
    };
};