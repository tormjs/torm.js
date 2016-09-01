import { Model } from './SequelizeModel';
export interface IUpdate<E extends Model> {
    where(Object: any): any;
    exec(Object: any): any;
}
export declare class Update<E extends Model> implements IUpdate<E> {
    private _clazz;
    private _conditions;
    constructor(clazz: any);
    where(Object: any): void;
    exec(Object: any): void;
}
