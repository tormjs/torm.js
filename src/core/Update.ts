import { Model } from './SequelizeModel';

export interface IUpdate<E extends Model> {
  where(Object);
  exec(Object);
}

export class Update<E extends Model> implements IUpdate<E> {

  private _clazz: E;
  private _conditions: Array<any>;

  constructor(clazz) {
    this._clazz = clazz;
    this._conditions = [];
  }

  /**
   * Update conditions
   *
   * @param {any} Object
   */
  public where(Object): void {
    throw 'Not Implemented';
  }

  /**
   * Execute update actions
   *
   * @param {any} Object
   */
  public exec(Object): void {
    throw 'Not Implemented';
  }

}