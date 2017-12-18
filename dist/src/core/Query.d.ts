/// <reference types="chai" />
import { Model } from './SequelizeModel';
import { Result } from './Result';
export declare class ClassNotFoundError extends Error {
    constructor(msg: string);
}
export declare class ModelNotFoundError extends Error {
    constructor(modelName: string);
}
export declare class WrongMethodInvokedError extends Error {
    constructor(method: string, instead: string);
}
export interface IQuery<E extends Model> {
    findAll(): Result<E>;
    find(): any;
    column(name: string, alias?: string): Query<E>;
    not(name: string): Query<E>;
    where(conditions: Object): Query<E>;
    count(name: string, alias?: string): Promise<number>;
    limit(num: number): Query<E>;
    offset(num: number): Query<E>;
    order(): Query<E>;
    raw(): Result<E>;
}
export declare class Query<E extends Model> implements IQuery<E> {
    private _clazz;
    private _attributes;
    private _whereConditions;
    private _excludes;
    private _limit;
    private _offset;
    constructor(clazz: {
        prototype: E;
    });
    count(name?: string, alias?: string): Promise<number>;
    where(conditions: Object): Query<E>;
    not(name: string): Query<E>;
    column(name: string, alias?: string): Query<E>;
    find(): any;
    findAll(): Result<E>;
    private _buildQuery();
    private _buildComplexQuery();
    private _buildWhere(param);
    private _checkModelExist(model, name);
    limit(num: number): Query<E>;
    offset(num: number): Query<E>;
    order(): Query<E>;
    raw(): Result<E>;
}
