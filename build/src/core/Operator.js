"use strict";
class ArgumentsError extends Error {
    constructor(method) {
        super(`Not enough arguments to invoke ${method} method`);
    }
}
exports.ArgumentsError = ArgumentsError;
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
    eq(arg) {
        let equalExpr = { 'eq': arg };
        this._operations.push(equalExpr);
        this.expr = equalExpr;
        return this._checkEvaluation();
    }
    ne(arg) {
        let notEqual = { 'ne': arg };
        this._operations.push(notEqual);
        this.expr = notEqual;
        return this._checkEvaluation();
    }
    lte(arg) {
        let lessThanOrEqual = { 'lte': arg };
        this._operations.push(lessThanOrEqual);
        this.expr = lessThanOrEqual;
        return this._checkEvaluation();
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
    or(...args) {
        this._transformType = TransformType.OR;
        return this;
    }
    and(...args) {
        this._transformType = TransformType.AND;
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