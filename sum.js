function sum1(n) {
    return (n * (n + 1) / 2);
}

function sum2(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}

function sum3(n) {
    if (n === 1) {
        return n;
    }
    return sum3 (n-1) + n;
}

console.log(sum1(1)); // 1
console.log(sum1(3)); // 6
console.log(sum1(10)); // 55


