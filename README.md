# fpjs

Functional programming library for javascript.

## Introduction

**fpjs** enables functional programming in javascript. While there are
a great many javascript libraries to accomplish this, **fpjs** focuses
on a minimal implementation (minified about 1kB) and simplicity both
in its own implementation and towards client code using **fpjs**. 

## Documentation and Examples

Minimalistic as the implementation of **fpjs** may be, this
documentation section tries to be thorough and can be used as a mini
tutorial. At least 1 example usage is shown for each of the functions
provided by **fpjs**.

### Generating Functions

Functional programming is foremost about programming with functions.
The following functions can be used to create new functions from
existing ones.

#### compose

Takes 2 functions f and g, and returns a new function that
effectively computes f(g(arguments));

Assume the following 2 functions are defined.

    function greet(name) { return 'Hello, ' + name; }
    function count(str) { return str.length; }

Now, if you want to have a function *countGreeting* that counts that
amount of characters in a greeting for a specific name, you could
write that function, pottentially calling the existing greet and count
function in your implementation. Or you can use *compose*, re-using
the existing functions in a one-liner.

    var countGreeting = fp.compose(count, greet);

Which would read as 'count after greet'. You can test the resulting
function. 

    console.log(countGreeting('Bob')); // -> 10

10 gets logged as it is the length of string *'Hello, Bob'*.

*compose* can be used for any 2 functions where the output of one can
be used as the input of the other.

#### curry

Takes a function f and returns a new curried function that when
invoked with less arguments than expected by f will return a new
curried function that awaits the remaining paramters. When a curried
function is invoked with all of the expected remaining parameters (all
parameters have been collected), the original function f is applied to
them and the result is returned.

While *compose* combines 2 functions into 1, *curry* effectively
transforms a function into a function generator. An example goes a
long way to explain this.

Suppose we have the following function defined.

    function calcResult(x, y, z) { return x * y - z; }

We can now create a curried version of *calcResult*.

    var calcResultCurried = fp.curry(calcResult);

If we invoke *calcResultCurried* with 3 arguments, like *calcResult*
expected, the function behaves exactly like the original function.

    console.log(calcResultCurried(3, 2, 1)); // -> 5

But if *calcResultCurried* gets invoked with fewer paramters, say just
1, a new curried function is returned in stead that will await the
remaining 2 paramters.

    var awaiting2More = calcResultCurried(3);

This function can then be called with the remaining 2 parameters

    console.log(awaiting2More(2,1)); // -> 5

or the function could again be called with fewer than exptected
parameters

    var calc3Times2Minus = awaiting2More(2);

and then finally

    console.log(calc3Times2Minus(1)); // -> 5

*curry* is contaguous in this way; once a function is curried, calling
it will return a function that is itself curried unless all parameters
are known and the original function logic is to be invoked. The
following statements are all equivalent.

    console.log(calcResultCurried(3,2,1)); // -> 5
    console.log(calcResultCurried(3)(2,1)); // -> 5
    console.log(calcResultCurried(3,2)(1)); // -> 5
    console.log(calcResultCurried(3)(2)(1)); // -> 5
    
As currying works by collecting parameters from left to right, the
order of parameters in a functions definition influence the usefulness
of it in regards to *curry*.

*curry* is an important function in **fpjs**. In fact, functions
provided by **fpjs** that take multiple arguments are typically
already curried. See [Manipulating Data](#manipulating-data) for
somewhat more realistic examples of currying, why it can be usefull,
and the importance of paramter ordering.

### Manipulating Data

*todo*

## License

This project is open source licensed under The MIT License (MIT). The
[complete license](LICENSE.txt) is included in the root of the project.
