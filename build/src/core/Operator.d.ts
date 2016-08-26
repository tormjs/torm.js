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
    static col(name: any): Operator;
    eq(arg: number | string | Date): Operator;
    ne(arg: number | string | Date): Operator;
    lt(arg: number | Date): Operator;
    lte(arg: number | Date): Operator;
    gt(arg: number | Date): Operator;
    gte(arg: number | Date): Operator;
    not(arg: boolean): Operator;
    between(a: number[] | Date[]): Operator;
    between(a: number | Date, b: number | Date): Operator;
    notBetween(a: number[] | Date[]): Operator;
    notBetween(a: number | Date, b: number | Date): Operator;
    in(...a: Array<number | number[]>): Operator;
    or(...args: Array<Object>): Operator;
    and(...args: any[]): Operator;
    private _unwrapExpression();
    private _checkEvaluation();
}
export declare const col: typeof Operator.col;
