/**
 * Expose all the sequalize methods and make it compatible
 * 
 * @class Sequalize
 */

export default class Sequalize {
  static sync(args) {
    console.log("function name: ", this.name)
  }
  static create(args) {}
}