import {SequelizeDriver} from '../core';

export class TypeResolver {
    static resolve(type:string) {
        switch (type) {
            case 'string':
            {
                return SequelizeDriver.sequelize.STRING;
            }

            case 'number':
            {
                return SequelizeDriver.sequelize.STRING;
            }

            default:
            {
                return SequelizeDriver.sequelize.STRING;
            }
        }
    }
} 