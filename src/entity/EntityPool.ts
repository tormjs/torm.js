import {Entity, Property} from './Entity';

export class EntityAlreadyExistError extends Error {
    constructor(propsName:string) {
        super(`Entity ${propsName} is already exist in current database`)
    }
}

export class EntityNotFoundError extends Error {
    constructor(entityName:string) {
        super(`Entity ${entityName} is not found`)
    }
}

/**
 * Stores table metadata
 */
class EntityPool<T extends {entityName: string}> extends Map<string, T> {

    put(entity:T):void {
        // find if there exists
        if (this._hasProperty(entity))
            throw new EntityAlreadyExistError(entity.entityName);

        this.set(entity.entityName, entity);
    }

    poll(entityName:string):T {
        const entity = this.get(entityName);
        if (!entity) {
            throw new EntityNotFoundError(entityName);
        }
        return entity;
    }

    private _hasProperty(entity:T):boolean {
        return this.has(entity.entityName);
    }
}

/**
 * Singleton pattern
 */
export const entityPool = new EntityPool();