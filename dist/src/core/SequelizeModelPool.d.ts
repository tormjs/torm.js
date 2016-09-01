export declare class SequelizeModelPool<T> extends Map<string, T> {
    put(entityName: string, entity: any): void;
    poll(entityName: string): T;
}
export declare const sequelizeModelPool: SequelizeModelPool<{}>;
