//請用 Javascript 的基本 for-loop 實作 filter, find, map 跟 reduce

let ary = [
    {
        id: 1,
        type: 'A',
        price: 100,
    },
    {
        id: 2,
        type: 'B',
        price: 200,
    },
    {
        id: 3,
        type: 'A',
        price: 150,
    },
];

// 用 for-loop

function filter(ary) {
    let result = [];
    for (let i = 0; i < ary.length; i++) {
        if (ary[i].type === 'A') {
            result.push(ary[i]);
        }
    }
    return result;
}
console.log("resultFilter = ",filter(ary));

function find(ary) {
    let result2 = [];
    for (let i = 0; i < ary.length; i++) {
        if (ary[i].price >= '150') {
            result2.push(ary[i]);
        }
    }
    return result2;
}
console.log("resultFind = ", find(ary));

function map(ary) {
    let resultMap = [];
    ary.forEach((ary) => {
        let newPrice = ary.price * 2;
        ary.price = newPrice;
        resultMap.push(ary);
    })
    return resultMap;
}
console.log("resultMap = ",map(ary));

function reduce(ary) {
    let reduceResult = 0
    ary.forEach((ary) => {
        let price = ary.price;
        reduceResult += price;
    })
    return reduceResult;
}
console.log("resultReduce = ",reduce(ary));

