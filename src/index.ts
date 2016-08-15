import "reflect-metadata";

import {Tamarillo, Model} from './core';
import {Column, Entity} from './decorator';
import {entityPool, Property} from './entity';

// create connection

Tamarillo.connect('orm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

/**
 * Temperary Test Model
 * 
 * @class Person
 * @extends {Model}
 */

@Entity
class Person extends Model {

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    friends: string

}

@Entity
class Man extends Model {

    @Column()
    gender: string;

}

// Person.sync();
// Man.sync();

let person = new Person();
person.name = 'Eric';
person.age = 24;
person.friends = 'Vincent';

// Person.create(person);