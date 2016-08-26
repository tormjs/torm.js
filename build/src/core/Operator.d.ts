/// <reference types="chai" />
export declare class ArgumentsError extends Error {
    constructor(method: string);
}
export interface IOperator {
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
    notIn(...a: Array<number | number[]>): Operator;
    like(arg: string): Operator;
    or(): Operator;
    and(): Operator;
}
export declare class Operator implements IOperator {
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
    notIn(...a: Array<number | number[]>): Operator;
    like(arg: string): Operator;
    notLike(arg: string): Operator;
    or(): Operator;
    and(): Operator;
    private _unwrapExpression();
    private _checkEvaluation();
    private _checkArguments(funcName, ...args);
}
export declare const col: typeof Operator.col;
