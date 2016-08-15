import {SequelizeDriver} from './';

/**
 * Tarmarillo core
 */
export class Tamarillo {
  private static _driver: SequelizeDriver;

  static connect(...args) {
    this._driver = SequelizeDriver.connect(...args);
  }

  static get driver(): any {
    return this._driver;
  }

}