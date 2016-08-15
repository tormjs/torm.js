
/**
 * Stores all entity of this system in SequalizeEntityPool
 * Type: sequelize.define('user', {});
 * 
 * @export
 * @class SequalizeEntityPool
 * @extends {Map<string, T>}
 * @template T
 */
class SequelizeEntityPool<T> extends Map<string, T> {
  put(entityName: string, entity: any) {
    if (!this.has(entityName))
      this.set(entityName, entity);
  }
  
  poll(entityName: string): T {
    return this.get(entityName);
  }
}

export const sequelizeEntityPool = new SequelizeEntityPool();