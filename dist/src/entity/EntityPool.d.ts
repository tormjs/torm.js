export declare class EntityAlreadyExistError extends Error {
    constructor(propsName: string);
}
export declare class EntityNotFoundError extends Error {
    constructor(entityName: string);
}
export declare class EntityPool<T extends {
    entityName: string;
}> extends Map<string, T> {
    put(entity: T): void;
    poll(entityName: string): T;
    private _hasProperty(entity);
}
export declare const entityPool: EntityPool<{
    entityName: string;
}>;
