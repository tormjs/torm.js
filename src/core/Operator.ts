class TransformType {
  static AND:string = 'AND';
  static OR:string = 'OR';
}

/**
 * Operator API
 *
 * @interface IOperator
 */
interface IOperator {
  cond(name): Operator;
  and(...args);
  or(...args): Object;
  eq(...args): Operator;
  gt(...args);
  lt(...args);
  lte(...args);
  notEqual(...args);
  not(...args);
  between(...args);
  notBetween(...args);
  in(...args);
  notIn(...args);
  like(...args);
  notLike(...args);
  // for PostgreSQL
  iLike(...args);
  // for PostgreSQL
  notILike(...args);
  // for PostgreSQL
  overlap(...args);
  // for PostgreSQL
  contains(...args);
  // for PostgreSQL
  contained(...args);
  // for PostgreSQL
  any(...args);
}

/**
 * Condition operator abstract
 *
 * @export
 * @class Operator
 */
export class Operator {
  private _operations:Array<any>;
  private _exprName:string;
  private _transformType:TransformType;
  public expr:Object;

  constructor(name) {
    this._exprName = name;
    this._operations = [];
    this._transformType = null;
  }

  public static expr(name):Operator {
    return new Operator(name);
  }

  public any(...args):void {
    throw 'Not Implemented';
  }

  public contained(...args):void {
    throw 'Not Implemented';
  }

  public contains(...args):void {
    throw 'Not Implemented';
  }

  public overlap(...args):void {
    throw 'Not Implemented';
  }

  public notILike(...args):void {
    throw 'Not Implemented';
  }

  public iLike(...args):void {
    throw 'Not Implemented';
  }

  public notLike(...args):void {
    throw 'Not Implemented';
  }

  public like(...args):void {
    throw 'Not Implemented';
  }

  public notIn(...args):void {
    throw 'Not Implemented';
  }

  public in(...args):void {
    throw 'Not Implemented';
  }

  public notBetween(...args):void {
    throw 'Not Implemented';
  }

  public between(...args):void {
    throw 'Not Implemented';
  }

  public not(...args):void {
    throw 'Not Implemented';
  }

  public notEqual(...args):void {
    throw 'Not Implemented';
  }

  public lte(...args):void {
    throw 'Not Implemented';
  }

  public lt(arg: any) :Operator {
    let lessThanExpr = {'$lt': arg};
    this._operations.push(lessThanExpr);
    this.expr = lessThanExpr;
    return this._checkEvaluation();
  }

  public gt(arg: any) :Operator {
    let greaterThanExpr = {'$gt': arg};
    this._operations.push(greaterThanExpr);
    this.expr = greaterThanExpr;
    return this._checkEvaluation();
  }

  public eq(arg):Operator {
    this._operations.push(arg);
    return this;
  }

  public or(...args:Array<Object>):Operator {
    this._transformType = TransformType.OR;
    // here, do not perform evaluation
    // because it's definitely not end
    return this;
  }

  public and(...args):Operator {
    return this;
  }

  // TODO: complex composite query
  private _checkEvaluation():Operator {
    // if can not evaluated, return to avoid useless computation
    if (!this._transformType) return this;

    let transformType:TransformType;
    let expression = {};
    expression[this._exprName] = {};

    // perform evaluation
    switch (this._transformType) {
      case TransformType.AND:
      {

        break;
      }

      case TransformType.OR:
      {

        this._operations.forEach((operator, i) => {
          Object.keys(operator).forEach(key => {
            // Simple expression
            if (key.indexOf('$') >= 0) {
              if (i === 0) {
                expression[this._exprName]['$or'] = {};
              }
              expression[this._exprName]['$or'][key] = operator[key];
            }
            // Complex expression of combinition
            else {

            }

          });
        });
        break;
      }
    }

    this.expr = expression;
    this._transformType = null;
    return this;
  }

}

export const expr = Operator.expr;