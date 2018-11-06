
// number check
function checkNumber(value) {
    return typeof value == 'number';
}

//decorator for check type of func
function typeCheck(f, checks) {
    return function () {
        console.log(checks);
        for (var i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
            console.log(checks[i]);
            console.log(checks[i](arguments[i]));
            if (!checks[i](arguments[i])) {

                console.log("wrong argument type numbered " + i);
                return;
            }
        }
        return f.apply(this, arguments);
    }
}

function sum(a, b) {
    return a + b;
}

sum = typeCheck(sum, [checkNumber]);
sum(1);
//console.log(sum(1, 2));

//sum(true, null); //incorrect argument type number 0
//sum(1, ["array", "in", "sum?!"]); //incorrect argument type number 1


// function work(a, b) {
//     console.log(a + b);

// }
// function makeLogging(f, log) {

//     function wrapper(a) {
//         log.push([].slice.call(arguments));
//         return f.apply(this, arguments);
//     }
//     return wrapper;
// }

// var log = [];
// work = makeLogging(work, log);
// work(1, 2);
// work(4, 5);

// for (var i = 0; i < log.length; i++) {
//     var args = log[i];
//     console.log("Log: " + args.join());
// }

function f(x) {
    return Math.random() * x;
}

function makeCaching(f) {
    var cache = {};

    return function (x) {
        if (!(x in cache)) {
            cache[x] = f.call(this, x);
        }
        console.log(cache);
        return cache[x];
    };

}

f = makeCaching(f);

var a = f(1);
var b = f(1);
console.log(a == b); // true (значение закешировано)

b = f(2);
console.log(a == b);

function formatDate(date) {
    var type = {}.toString.call(date).slice(8, -1);
    var type2 = typeof date;
    //console.log(type);
    //console.log(type2);

    switch (type) {
        case "Number": date = new Date(date * 1000);
            break;
        case "Array": date = new Date(date[0], date[1], date[2]);
            break;
        case "String": date = new Date(date);
            break;
    }

    var options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric"
    };
    return date.toLocaleString("ru", options);
    // return date.toLocaleString("ru", {
    //     day: "2-digit",
    //     month: "2-digit",
    //     year: "2-digit"
    // });
}

console.log(formatDate(1234567890));
console.log(formatDate([2014, 0, 1]));
console.log(formatDate("2011-10-02"));
console.log(formatDate(new Date(2014, 0, 1)));

