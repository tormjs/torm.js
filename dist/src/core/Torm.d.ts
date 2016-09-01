import { Model } from './';
import { Query } from './Query';
import { Update } from './Update';
export declare class ModelDefinitionError extends Error {
    constructor(modelName: string);
}
export declare class Torm {
    private static _driver;
    static connect(...args: any[]): any;
    static readonly driver: any;
    static sync<E extends Model>(object: E, ...args: any[]): Promise<E>;
    static create<E extends Model>(object: E): Promise<E>;
    static query<E extends Model>(clazz: E): Query<E>;
    static update<E extends Model>(clazz: E): Update<E>;
}
