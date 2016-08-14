import {ColumnTypes} from '../type/ColumnTypes.ts';

export class PropertyAlreadyExistError extends Error {
  constructor(propsName: string) {
    super(`Property ${propsName} is already exist in current entity`)
  }
}

export class PropertyNotFoundError extends Error {
  constructor(propName: string) {
    super(`Property ${propName} is not found`)
  }
}

export type Property = { propertyName: string, propertyType: ColumnTypes }

/**
 * Stores column metadata
 * 
 * @export
 * @class ColumnCollection
 * @extends {Array<T>}
 * @template T
 */
export class Entity<T extends Property> {
  public entityName: string;
  private metadata: Array<T>;

  constructor(entityName: string) {
    this.entityName = entityName;
    this.metadata = [];
  }

  insert(column: T): void {
    // find if there exists
    if (this._hasProperty(column))
      throw new PropertyAlreadyExistError(column.propertyName);

    this.metadata.push(column);
  }

  find(propName: string): T {
    const property = this.metadata.find(property => property.propertyName === propName);
    if (!property)
      throw new PropertyNotFoundError(propName);
    return property;
  }

  private _hasProperty(column: T): boolean {
    return !!this.metadata.find(prop => prop.propertyName === column.propertyName);
  }
}