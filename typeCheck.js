// number check 
function checkNumber(value) {
    return typeof value == 'number';
}

//decorator for check type of func
function typeCheck(f, checks) {
    return function () {
        for (var i = 0; i < arguments.length; i++) {
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

sum = typeCheck(sum, [checkNumber, checkNumber]);

console.log(sum(1, 2));

sum(true, null); //incorrect argument type number 0
sum(1, ["array", "in", "sum?!"]); //incorrect argument type number 1

//access authorization
function checkPermission(f) {
  return function() {
    if (isAdmin()) {
      return f.apply(this, arguments);
    }
    alert( 'insufficient rights' );
  }
}
