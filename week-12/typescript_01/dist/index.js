"use strict";
let x = 9; //type infering
//ex-->> int x =9;
let y = 5;
console.log(x);
function firstname(n) {
    console.log("hello " + n);
}
firstname("prahil");
const nums = (n, n_2) => {
    return n + n_2;
};
nums(4, 4);
function age(age) {
    if (age > 18) {
        return true;
    }
    else {
        return false;
    }
}
console.log(age(5));
function delaycalls(fn) {
    setTimeout(fn, 2000);
}
delaycalls(function () {
    console.log("hello");
});
//funcx me object
//types gives to explicitetlly in user obj
function greet(user) {
    console.log("user name" + user.name);
}
greet({
    name: "hakirat",
    age: 45
});
//give s to implicitlly obj
let user = {
    name: "prahil",
    age: 45
};
function usergreet(user) {
}
let new_user = {
    name: "prashil",
    age: 45,
    lastanme: "lonare"
};
function sum(a, b) {
    return a + b;
}
let t = {
    name: "sdj", age: 45, departaments: "hdx"
};
