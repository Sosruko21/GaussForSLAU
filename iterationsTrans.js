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

function iterationsTrans() {
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