"use strict";
class ArgumentsError extends Error {
    constructor(method) {
        super(`Not enough arguments to invoke ${method} method`);
    }
}
class TransformType {
}
TransformType.AND = 'AND';
TransformType.OR = 'OR';
class Operator {
    constructor(name) {
        this._exprName = name;
        this._operations = [];
        this._transformType = null;
    }
    static expr(name) {
        return new Operator(name);
    }
    lt(arg) {
        let lessThanExpr = { '$lt': arg };
        this._operations.push(lessThanExpr);
        this.expr = lessThanExpr;
        return this._checkEvaluation();
    }
    gt(arg) {
        let greaterThanExpr = { '$gt': arg };
        this._operations.push(greaterThanExpr);
        this.expr = greaterThanExpr;
        return this._checkEvaluation();
    }
    eq(arg) {
        this._operations.push(arg);
        return this;
    }
    or(...args) {
        this._transformType = TransformType.OR;
        return this;
    }
    and(...args) {
        return this;
    }
    _checkEvaluation() {
        if (!this._transformType)
            return this;
        let transformType;
        let expression = {};
        expression[this._exprName] = {};
        switch (this._transformType) {
            case TransformType.AND:
                {
                    break;
                }
            case TransformType.OR:
                {
                    if (this._operations.length <= 1)
                        throw new ArgumentsError('or()');
                    this._operations.forEach((operator, i) => {
                        Object.keys(operator).forEach(key => {
                            if (key.indexOf('$') >= 0) {
                                if (i === 0) {
                                    expression[this._exprName]['$or'] = {};
                                }
                                expression[this._exprName]['$or'][key] = operator[key];
                            }
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
exports.Operator = Operator;
exports.expr = Operator.expr;
//# sourceMappingURL=Operator.js.map