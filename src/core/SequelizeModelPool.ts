/**
 * Stores all entity of this system in SequalizeEntityPool
 * Type: sequelize.define('user', {});
 *
 * @export
 * @class SequalizeEntityPool
 * @extends {Map<string, T>}
 * @template T
 */
class SequelizeModelPool<T> extends Map<string, T> {

  /**
   * Put entity into map
   *
   * @param {string} entityName
   * @param {*} entity
   */
  put(entityName:string, entity:any) {
    if (!this.has(entityName))
      this.set(entityName, entity);
  }


  /**
   * Poll entity from map
   *
   * @param {string} entityName
   * @returns {T}
   */
  poll(entityName:string):T {
    return this.get(entityName);
  }
}

export const sequelizeModelPool = new SequelizeModelPool();