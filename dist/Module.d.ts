export declare function Union<T>(a: Set<T>, b: Set<T>, uid: (T: any) => string): Array<T>;
export declare function Intersection<T>(a: Set<T>, b: Set<T>, uid: (T: any) => string): Array<T>;
export declare function Difference<T>(a: Set<T>, b: Set<T>, uid: (T: any) => string): Array<T>;
export declare function AOnly<T>(a: Set<T>, b: Set<T>, uid: (T: any) => string): Array<T>;
export declare function BOnly<T>(a: Set<T>, b: Set<T>, uid: (T: any) => string): Array<T>;
export declare function Equals<T>(a: Set<T>, b: Set<T>, uid: (T: any) => string): boolean;
