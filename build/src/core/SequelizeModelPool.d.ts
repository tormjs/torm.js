/**
 * Stores all entity of this system in SequalizeEntityPool
 * Type: sequelize.define('user', {});
 *
 * @export
 * @class SequalizeEntityPool
 * @extends {Map<string, T>}
 * @template T
 */
export declare class SequelizeModelPool<T> extends Map<string, T> {
    /**
     * Put entity into map
     *
     * @param {string} entityName
     * @param {*} entity
     */
    put(entityName: string, entity: any): void;
    /**
     * Poll entity from map
     *
     * @param {string} entityName
     * @returns {T}
     */
    poll(entityName: string): T;
}
export declare const sequelizeModelPool: SequelizeModelPool<{}>;
