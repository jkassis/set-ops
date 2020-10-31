declare type Setish<T> = Set<T> | Array<T>;
export declare function Union<T>(a: Setish<T>, b: Setish<T>, uidFn?: (T: any) => string): Array<T>;
export declare function Intersection<T>(a: Setish<T>, b: Setish<T>, uidFn?: (T: any) => string): Array<T>;
export declare function Difference<T>(a: Setish<T>, b: Setish<T>, uidFn?: (T: any) => string): Array<T>;
export declare function AOnly<T>(a: Setish<T>, b: Setish<T>, uidFn?: (T: any) => string): Array<T>;
export declare function BOnly<T>(a: Setish<T>, b: Setish<T>, uidFn?: (T: any) => string): Array<T>;
export declare function Equals<T>(a: Setish<T>, b: Setish<T>, uidFn?: (T: any) => string): boolean;
export {};
