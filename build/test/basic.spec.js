"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
require('reflect-metadata');
const chai_1 = require('chai');
const src_1 = require('../src');
const src_2 = require('../src');
const src_3 = require('../src');
const Torm_1 = require('./../src/core/Torm');
describe('Test basic usage', () => {
    let Person;
    before(() => {
        Person = class Person extends src_1.Model {
        }
        ;
    });
    it('connect to database successfully', () => {
        let conn = src_1.Torm.connect('orm', 'root', '', {
            host: 'localhost',
            dialect: 'mysql'
        });
        chai_1.assert.isNotNull(conn);
    });
    it('should define a model through decorator', () => __awaiter(this, void 0, void 0, function* () {
        let Person = class Person extends src_1.Model {
        };
        __decorate([
            src_2.Column(), 
            __metadata('design:type', String)
        ], Person.prototype, "name", void 0);
        __decorate([
            src_2.Column(), 
            __metadata('design:type', Number)
        ], Person.prototype, "age", void 0);
        __decorate([
            src_2.Column(), 
            __metadata('design:type', String)
        ], Person.prototype, "friends", void 0);
        Person = __decorate([
            src_2.Entity, 
            __metadata('design:paramtypes', [])
        ], Person);
        let model = yield src_1.Torm.sync(Person.prototype);
        chai_1.assert.typeOf(model, 'object');
    }));
    it('should throw an Error if Model is defined incorrectly', (done) => __awaiter(this, void 0, void 0, function* () {
        class Fake extends src_1.Model {
        }
        try {
            yield src_1.Torm.sync(Fake.prototype);
        }
        catch (e) {
            if (e instanceof Torm_1.ModelDefinitionError) {
                done();
            }
        }
    }));
    it('should create an entity correctly', () => __awaiter(this, void 0, void 0, function* () {
        let person = new Person();
        person.name = 'Eric';
        person.age = 1;
        person.friends = 'Vincent';
        let rst = yield src_1.Torm.create(person);
        chai_1.assert.isNotNull(rst);
    }));
});
describe('Query testing', () => {
    let Person;
    before(() => {
        Person = class Person extends src_1.Model {
        }
        ;
    });
    it('should perform basic count', () => __awaiter(this, void 0, void 0, function* () {
        let count = yield src_1.Torm.query(Person.prototype).count();
        chai_1.assert.isNumber(count);
    }));
    it('should perform complex query', () => __awaiter(this, void 0, void 0, function* () {
        let rst = yield src_1.Torm
            .query(Person.prototype)
            .not('name')
            .limit(3)
            .offset(2)
            .find();
        chai_1.assert.isArray(rst);
    }));
    it('should perform complex expression query syntax', () => __awaiter(this, void 0, void 0, function* () {
        let rst = yield src_1.Torm
            .query(Person.prototype)
            .where(src_3.col('age').lt(0).or().gt(20))
            .findAll();
        chai_1.assert.isArray(rst);
    }));
});
//# sourceMappingURL=basic.spec.js.map