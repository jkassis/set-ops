// setOps.js
// MIT License © 2020 Jeremy Kassis http://github.com/jkassis
var Location;
(function (Location) {
    Location[Location["a"] = 1] = "a";
    Location[Location["b"] = 2] = "b";
    Location[Location["ab"] = 3] = "ab";
})(Location || (Location = {}));
function censusMake(a, b, uidFn, evaluator) {
    var census = {};
    var uid;
    a.forEach(function (value) {
        uid = uidFn ? uidFn(value) : value;
        if (!census[uid])
            census[uid] = { value: value, location: Location.a };
    });
    b.forEach(function (value) {
        uid = uidFn ? uidFn(value) : value;
        if (census[uid]) {
            if (census[uid].location === Location.a)
                census[uid].location = Location.ab;
        }
        else
            census[uid] = { value, location: Location.b };
    });
    return census;
}
// Perform a set operation by making a histogram and applying an operator
function operation(a, b, operator, uidFn) {
    var out = [];
    var census = censusMake(a, b, uidFn);
    for (var k in census)
        if (operator(census[k].location))
            out.push(census[k].value);
    return out;
}
// Join two sets together.
//
// Set.union([1, 2, 2], [2, 3]) => [1, 2, 3]
export function Union(a, b, uidFn) {
    return operation(a, b, () => true, uidFn);
}
// Return items common to both sets.
//
// Set.intersection([1, 1, 2], [2, 2, 3]) => [2]
var intersection = (location) => location == Location.ab;
export function Intersection(a, b, uidFn) {
    return operation(a, b, intersection, uidFn);
}
// Symmetric difference. Items from either set that are not in both sets.
//
// Set.difference([1, 1, 2], [2, 3, 3]) => [1, 3]
var difference = (location) => location != Location.ab;
export function Difference(a, b, uidFn) {
    return operation(a, b, difference, uidFn);
}
// AOnly. Items from 'a' which are not also in 'b'.
//
// Set.complement([1, 2, 2], [2, 2, 3]) => [3]
var aOnly = (location) => location == Location.a;
export function AOnly(a, b, uidFn) {
    return operation(a, b, aOnly, uidFn);
}
// BOnly. Items from 'b' which are not also in 'a'.
//
// Set.complement([1, 2, 2], [2, 2, 3]) => [3]
var bOnly = (location) => location == Location.b;
export function BOnly(a, b, uidFn) {
    return operation(a, b, bOnly, uidFn);
}
// Returns true if both sets are equivalent, false otherwise.
//
// Set.equals([1, 1, 2], [1, 2, 2]) => true
// Set.equals([1, 1, 2], [1, 2, 3]) => false
export function Equals(a, b, uidFn) {
    var census = censusMake(a, b, uidFn);
    for (var key in census)
        if (census[key].location != Location.ab)
            return false;
    return true;
}
//# sourceMappingURL=Module.js.map