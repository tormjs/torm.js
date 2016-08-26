/// <reference types="chai" />
export declare class ArgumentsError extends Error {
    constructor(method: string);
}
export declare class Operator {
    private _operations;
    private _exprName;
    private _transformType;
    expr: Object;
    constructor(name: any);
    static expr(name: any): Operator;
    eq(arg: any): Operator;
    ne(arg: any): Operator;
    lt(arg: number): Operator;
    lte(arg: number): Operator;
    gt(arg: number): Operator;
    gte(arg: number): Operator;
    not(arg: boolean): Operator;
    between(a: number[]): Operator;
    between(a: number, b: number): Operator;
    notBetween(a: number[]): Operator;
    notBetween(a: number, b: number): Operator;
    in(...a: Array<number | number[]>): Operator;
    or(...args: Array<Object>): Operator;
    and(...args: any[]): Operator;
    private _checkEvaluation();
}
export declare const expr: typeof Operator.expr;
