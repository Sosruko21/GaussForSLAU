'use strict';
function enumeration() {
    let height;
    let i;
    let P = [0];
    let Q = [0];
    let a = [];
    let b = [];
    let c = [];
    let d = [];
    let x = [];

    height = parseInt(prompt('Количество строк в вашей матрице'));

    a = prompt("Введите коэффиценты a").split(' ');
    b = prompt("Введите коэффиценты b").split(' ');
    c = prompt("Введите коэффиценты c").split(' ');
    d = prompt("Введите вектор правых частей").split(' ');

    for (i = 0; i < height; i++) {
        a[i] = parseFloat(a[i]);
        b[i] = parseFloat(b[i]);
        c[i] = parseFloat(c[i]);
        d[i] = parseFloat(d[i]);
    };

    console.log("Прогоночные коэффиценты:")
    for (i = 1; i < height + 1; i++) {
        P[i] = (-c[i - 1]) / (b[i - 1] + a[i - 1] * P[i - 1]);
        Q[i] = (d[i - 1] - a[i - 1] * Q[i - 1]) / (b[i - 1] + a[i - 1] * P[i - 1]);
    };

    for (i = 0; i < P.length; i++) {
        console.log("P" + i.toString() + " = " + P[i]);
        console.log("Q" + i.toString() + " = " + Q[i]);
        console.log('\n');
    };

    console.log('\n');
    console.log("Иксы:")
    x[Q.length - 1] = Q[Q.length - 1]
    for (i = Q.length - 2; i >= 0; i--) {
        x[i] = Q[i] + P[i] * x[i + 1];
        console.log('x' + (i + 1).toString() + ' = ' + x[i + 1])
    };
};