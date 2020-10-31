// setOps.js
// MIT License © 2020 Jeremy Kassis http://github.com/jkassis
function censusMake(a, b, uidFn, evaluator) {
    var census = {};
    var uid;
    a.forEach(function (value) {
        uid = uidFn(value);
        if (!census[uid])
            census[uid] = { value: value, location: Location.a };
    });
    b.forEach(function (value) {
        uid = uidFn(value);
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
function operation(a, b, uid, operator) {
    var out = [];
    var census = censusMake(a, b, uid);
    for (var k in census)
        if (operator(census[k].location))
            out.push(census[k].value);
    return out;
}
// Join two sets together.
//
// Set.union([1, 2, 2], [2, 3]) => [1, 2, 3]
export function Union(a, b, uid) {
    return operation(a, b, uid, () => true);
}
// Return items common to both sets.
//
// Set.intersection([1, 1, 2], [2, 2, 3]) => [2]
export function Intersection(a, b, uid) {
    return operation(a, b, uid, (location) => location == Location.ab);
}
// Symmetric difference. Items from either set that are not in both sets.
//
// Set.difference([1, 1, 2], [2, 3, 3]) => [1, 3]
export function Difference(a, b, uid) {
    return operation(a, b, uid, (location) => location != Location.ab);
}
// AOnly. Items from 'a' which are not also in 'b'.
//
// Set.complement([1, 2, 2], [2, 2, 3]) => [3]
export function AOnly(a, b, uid) {
    return operation(a, b, uid, (location) => location == Location.a);
}
// BOnly. Items from 'b' which are not also in 'a'.
//
// Set.complement([1, 2, 2], [2, 2, 3]) => [3]
export function BOnly(a, b, uid) {
    return operation(a, b, uid, (location) => location == Location.b);
}
// Returns true if both sets are equivalent, false otherwise.
//
// Set.equals([1, 1, 2], [1, 2, 2]) => true
// Set.equals([1, 1, 2], [1, 2, 3]) => false
export function Equals(a, b, uid) {
    var census = censusMake(a, b, uid);
    for (var key in census)
        if (census[key].location != Location.ab)
            return false;
    return true;
}
//# sourceMappingURL=Module.js.map