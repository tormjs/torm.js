export declare class PropertyAlreadyExistError extends Error {
    constructor(propsName: string);
}
export declare class PropertyNotFoundError extends Error {
    constructor(propName: string);
}
export declare type Property = {
    propertyName: string;
    propertyType: any;
};
/**
 * Stores column metadata
 *
 * @export
 * @class ColumnCollection
 * @extends {Array<T>}
 * @template T
 */
export declare class Entity<T extends Property> {
    entityName: string;
    private _metadata;
    constructor(entityName: string);
    readonly metadata: T[];
    insert(column: T): void;
    find(propName: string): T;
    private _hasProperty(column);
}
