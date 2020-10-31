// setOps.js
// MIT License © 2020 Jeremy Kassis http://github.com/jkassis

declare enum Location {
    a = 1,
    b = 2,
    ab = 3
}

declare type Census<T> = { [k: string]: { value: T, location: Location } }

function censusMake<T>(a: Set<T>, b: Set<T>, uidFn?: (T) => string, evaluator?: (number) => boolean): Census<T> {
    var census: Census<T> = {}
    var uid: string

    a.forEach(function (value) {
        uid = uidFn ? uidFn(value) : value as unknown as string
        if (!census[uid])
            census[uid] = { value: value, location: Location.a }
    });

    b.forEach(function (value) {
        uid = uidFn ? uidFn(value) : value as unknown as string
        if (census[uid]) {
            if (census[uid].location === Location.a)
                census[uid].location = Location.ab
        } else
            census[uid] = { value, location: Location.b }
    })

    return census
}


// Perform a set operation by making a histogram and applying an operator
function operation<T>(a: Set<T>, b: Set<T>, operator: (location: Location) => boolean, uidFn?: (T) => string): Array<T> {
    var out: Array<T> = []
    var census = censusMake(a, b, uidFn)
    for (var k in census)
        if (operator(census[k].location)) out.push(census[k].value)
    return out
}

// Join two sets together.
//
// Set.union([1, 2, 2], [2, 3]) => [1, 2, 3]
export function Union<T>(a: Set<T>, b: Set<T>, uidFn?: (T) => string): Array<T> {
    return operation(a, b, () => true, uidFn)
}

// Return items common to both sets.
//
// Set.intersection([1, 1, 2], [2, 2, 3]) => [2]
var intersection = (location: Location) => location == Location.ab
export function Intersection<T>(a: Set<T>, b: Set<T>, uidFn?: (T) => string): Array<T> {
    return operation(a, b, intersection, uidFn)
}

// Symmetric difference. Items from either set that are not in both sets.
//
// Set.difference([1, 1, 2], [2, 3, 3]) => [1, 3]
var difference = (location: Location) => location != Location.ab
export function Difference<T>(a: Set<T>, b: Set<T>, uidFn?: (T) => string): Array<T> {
    return operation(a, b, difference, uidFn)
}

// AOnly. Items from 'a' which are not also in 'b'.
//
// Set.complement([1, 2, 2], [2, 2, 3]) => [3]
var aOnly = (location: Location) => location == Location.a
export function AOnly<T>(a: Set<T>, b: Set<T>, uidFn?: (T) => string): Array<T> {
    return operation(a, b, aOnly, uidFn)
}

// BOnly. Items from 'b' which are not also in 'a'.
//
// Set.complement([1, 2, 2], [2, 2, 3]) => [3]
var bOnly = (location: Location) => location == Location.b
export function BOnly<T>(a: Set<T>, b: Set<T>, uidFn?: (T) => string): Array<T> {
    return operation(a, b, bOnly, uidFn)
}

// Returns true if both sets are equivalent, false otherwise.
//
// Set.equals([1, 1, 2], [1, 2, 2]) => true
// Set.equals([1, 1, 2], [1, 2, 3]) => false
export function Equals<T>(a: Set<T>, b: Set<T>, uidFn?: (T) => string): boolean {
    var census = censusMake(a, b, uidFn)
    for (var key in census)
        if (census[key].location != Location.ab)
            return false
    return true
}
