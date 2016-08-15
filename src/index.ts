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

async function Test() {
    let person = new Person();
    person.name = 'Eric';
    person.age = 25;
    person.friends = 'Vincent';

    let p = await Person.findAll();
    p.forEach( (person: Person) => {
        console.log(person.id, person.name, person.age, person.friends, person.createdAt, person.updatedAt);
    });
}

Test();