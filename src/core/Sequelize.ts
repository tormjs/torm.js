import {sequelizeEntityPool} from './';
/**
 * Expose all the sequalize methods and make it compatible
 * 
 * @class Sequalize
 */
export class Sequelize {
  
  static sync(...args) {
    let objectName = this.name.toLowerCase();
    let model: any = sequelizeEntityPool.poll(objectName);
    return model.sync(...args);
  }

  static create(object: Object) {
    let objectName = this.name.toLowerCase();
    let model: any = sequelizeEntityPool.poll(objectName);
    return model.create(object);
  }

}