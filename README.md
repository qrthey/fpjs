# fpjs

Functional programming library for javascript.

## Introduction

**fpjs** enables functional programming in javascript. While there are
a great many javascript libraries to accomplish this, **fpjs** focuses
on a minimal implementation (minified about 1kB) and simplicity both
in its own implementation and towards client code using **fpjs**.

## Quick Refernce with Examples

### compose

*compose* takes 2 functions and returns a new function that first calls
the second function on its given arguments and then calls the first
function with the result of that call.

    var f1 = function (x, y) { return x * y; };
    var f2 = function (x) { return x + 10; };
    var f3 = fp.compose(f2, f1); // reads 'f2 after f1'
    var result = f3(4, 5);
    console.log(result); // -> 30 ; (4 * 5) + 10

### curry

*curry* takes a function and returns a new function that can be given
fewer parameters than expected by the original function. In that case,
a new function that is itself curried is returned. When all parameters
expected by the original function are eventually collected it is
invoked and the result is returned.

    var f = function (x, y, z) { return x + y + z; };
    var fc = fp.curry(f);
    console.log(fc(1, 2, 3)); // -> 6 ; behaves as original function
    var fc1 = fc(1); // -> too few arguments so a new function is returned
    console.log(fc1(2, 3)); // -> 6
    var fc2 = fc1(2);
    console.log(fc2(3)); // -> 6
    console.log(fc(1)(2)(3)); // -> 6

### negate

*negate* takes a function and returns a new function that returns true
if the result of invoking the original function is falsy, or false
when the result is the original function is truethy.

    var f = function (x) { return x < 10; };
    var fn = fp.negate(f);
    console.log(fn(20)); // -> true ; as f(20) is false

### first

*first* returns the first item of an array.

    var x = fp.first([3, 1, 6, 8, 2]);
    console.log(x); // -> 3

### last

*last* returns the last item of an array.

    var x = fp.last([3, 1, 6, 8, 2]);
    console.log(x); // -> 2

### findFirst

*findFirst* takes a predicate, ie. a function that returns either true or
false, and an array with items. It returns the first item in the array
for which the predicate returns true.

    var pred = function (x) {return x > 5; };
    var data = [3, 1, 6, 8, 2];
    var result = fp.findFirst(pred, data);
    console.log(result); // -> 6 ; the first number bigger than 5

### findLast

*findLast* takes a predicate, ie. a function that returns either true or
false, and an array of items. It returns the last item in the array
for which the predicate returns true.

    var pred = function (x) {return x > 5; };
    var data = [3, 1, 6, 8, 2];
    var result = fp.findLast(pred, data);
    console.log(result); // -> 8 ; the last number bigger than 5

### reduce

*reduce* takes a function of 2 parameters, an array and a start value.
It then returns a value by applying the function to the start value
and the first item in the array, then applying the function to that
result and the second item of the array and so on.

    var f = function (x, y) { return x * y; }
    var data = [3, 1, 6, 8, 2];
    var result = fp.reduce(f, data, 12);
    console.log(result); // -> 3456 ; (((((12 * 3) * 1) * 6) * 8) * 2)

### map

*map* takes a function and an array and returns a new array which
elements are the result of applying the function to each value in the
array.

    var f = function (x) { return x + 3; };
    var data = [3, 1, 6, 8, 2];
    var result = fp.map(f, data);
    console.log(result); // -> [6, 4, 9, 11, 5]

### each

*each* takes a function, that probably has some side effects, and an
array and invokes the function on each item in the array. It then
returns undefined.

    var f = function (x) { console.log("got " + x); };
    var data = [3, 1, 6, 8, 2];
    fp.each(f, data); // prints
                      // got 3
                      // got 1
                      // got 6
                      // got 8
                      // got 2
                      // and returns undefined

### filter

*filter* takes a predicate, ie. a function that returns either true or
false, and an array of items. It returns a new array with the elements
of the original array for which the predicate returns true.

    var pred = function (x) { return x > 5; };
    var data = [3, 1, 6, 8, 2];
    var result = fp.filter(pred, data);
    console.log(result); // -> [6, 8];

### getProperty

*getProperty* that takes a property name (string) and returns a
function that when given an object returns the value of the named
property from that object.

    var obj = {name: "Alan Turing", born: 1912};
    var nameProp = fp.getProperty("name");
    var result = nameProp(obj);
    console.log(result); // -> Alan Turing


### minBy

*minBy* takes a function and an array and returns the item in the
array for which the function returns the lowest value. If several
items have the same, lowest, value, the first of them in the array is
returned.

    var data = [{name: "Alan Kay", born: 1940},
                {name: "Alan Turing", born: 1912},
                {name: "Peter Norvig", born: 1956},
                {name: "John McCarthy", born: 1927}];

    var bornProp = fp.getProperty("born");
    var result = fp.minBy(bornProp, data);
    console.log(result); // -> {name: 'Alan Turing', born: 1912}

### maxBy

*maxBy* takes a function and an array and returns the item in the
array for which the function returns the highest value. If several
items have the same, highest, value, the first of them in the array is
returned.

    var data = [{name: "Alan Kay", born: 1940},
                {name: "Alan Turing", born: 1912},
                {name: "Peter Norvig", born: 1956},
                {name: "John McCarthy", born: 1927}];

    var estimateAge = function (person) { return 2015 - person.born; };
    var result = fp.maxBy(estimateAge, data);
    console.log(result); // -> {name: 'Alan Turing', born: 1912}

### indentity

*identity* doesn't do a lot. It takes a single argument and returns
it.

    var result = fp.identity("John");
    console.log(result); // -> John

## License

This project is open source licensed under The MIT License (MIT). The
[complete license](LICENSE.txt) is included in the root of the project.
