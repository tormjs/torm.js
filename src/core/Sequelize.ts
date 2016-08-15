import {sequelizeEntityPool} from './';
/**
 * Expose all the sequalize methods and make it compatible
 * 
 * @class Sequalize
 */
export class Sequelize {
  static sync(...args) {
    let name = this.name.toLowerCase();
    let model: any = sequelizeEntityPool.poll(name);
    model.sync(...args);
  }

  static create(args) {}
}