var fp = (function () {
    "use strict";

    function asArray(obj) {
        return Array.prototype.slice.call(obj);
    }

    function curry(fn) {
        return function () {
            var args = asArray(arguments);
            if (args.length === fn.length) {
                return fn.apply(null, args);
            }

            return function () {
                return curry(fn).apply(null, args.concat(asArray(arguments)));
            };
        };
    }

    function compose(fn1, fn2) {
        return function () {
            return fn1(fn2.apply(null, arguments));
        };
    }

    function negate(pred) {
        return function () {
            return !(pred.apply(null, arguments));
        };
    }

    function first(arr) {
        return arr[0];
    }

    function last(arr) {
        return arr[arr.length - 1];
    }

    function findFirst(pred, arr) {
        var idx;

        for (idx = 0; idx < arr.length; idx += 1) {
            if (pred(arr[idx])) {
                return arr[idx];
            }
        }
    }

    function findLast(pred, arr) {
        var idx;

        for (idx = arr.length - 1; idx >= 0; idx -= 1) {
            if (pred(arr[idx])) {
                return arr[idx];
            }
        }
    }

    function reduce(fn, arr, start) {
        var temp = start,
            idx;

        if (arr.length > 0) {
            idx = 0;

            if (temp === undefined) {
                idx = 1;
                temp = arr[0];
            }

            while (idx < arr.length) {
                temp = fn(arr[idx], temp);
                idx += 1;
            }
        }

        return temp;
    }

    function withPushed(arr, v) {
        arr[arr.length] = v;
        return arr;
    }

    function map(fn, arr) {
        return reduce(function (x, acc) { return withPushed(acc, fn(x)); }, arr, []);
    }

    function filter(pred, arr) {
        return reduce(function (x, acc) { return (pred(x)) ? withPushed(acc, x) : acc; }, arr, []);
    }

    function each(fn, arr) {
        return reduce(function (x) { fn(x); }, arr, null);
    }

    function minBy(fn, arr) {
        return reduce(function (x, acc) { return (fn(x) < fn(acc)) ? x : acc; }, arr);
    }

    function maxBy(fn, arr) {
        return reduce(function (x, acc) { return (fn(x) > fn(acc)) ? x : acc; }, arr);
    }

    function identity(x) {
        return x;
    }

    function getProperty(propName, obj) {
        return obj[propName];
    }

    return {
        compose: compose,
        curry: curry,
        negate: negate,
        first: first,
        last: last,
        findFirst: curry(findFirst),
        findLast: curry(findLast),
        reduce: curry(reduce),
        map: curry(map),
        each: curry(each),
        filter: curry(filter),
        minBy: curry(minBy),
        maxBy: curry(maxBy),
        identity: identity,
        getProperty: curry(getProperty)
    };
}());
