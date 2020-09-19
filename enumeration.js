function enumeration() {
    let height, width;
    let i, j, k;
    let matrix = [];
    let P = [0];
    let Q = [0];
    let a = [];
    let b = [];
    let c = [];
    let d = [];
    let x = [];

    height = prompt('Количество строк в вашей матрице');

    for (i = 0; i < height; i++) {
        matrix.push([]);
    };

    width = prompt('Количество столбцов в вашей матрице');

    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            matrix[i].push(0);
        }
    };

    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            matrix[i][j] = parseInt(prompt("Введите ячейку "+(i+1).toString()+"x"+(j+1).toString()))
        }
    };

    a[0] = 0
    c[matrix.length - 1] = 0

    for (i = 0; i < matrix.length; i++) {
        if (i + 1 < matrix.length) {
            a[i + 1] = matrix[i + 1][i];
        };
        b[i] = matrix[i][i];
        if (i < matrix.length - 1) {
            c[i] = matrix[i][i + 1]
        };
        d[i] = matrix[i][matrix[0].length - 1]
    }

    console.log("Прогоночные коэффиценты:")
    for (i = 1; i < matrix.length + 1; i++) {
        P[i] = (-c[i - 1]) / (b[i - 1] + a[i - 1] * P[i - 1]);
        Q[i] = (d[i - 1] - a[i - 1] * Q[i - 1]) / (b[i - 1] + a[i - 1] * P[i - 1]);
    };

    for (i = 0; i < P.length; i++) {
        console.log("P" + i.toString() + " = " + P[i]);
        console.log("Q" + i.toString() + " = " + Q[i]);
        console.log('\n');
    }

    console.log('\n');
    console.log("Иксы:")
    x[Q.length - 1] = Q[Q.length - 1]
    for (i = Q.length - 2; i >= 0; i--) {
        x[i] = Q[i] + P[i] * x[i + 1];
        console.log('x' + (i + 1).toString() + ' = ' + x[i + 1])
    }
}