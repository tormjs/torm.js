import "reflect-metadata";

import {Tamarillo, Model, Result} from './core';
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
    person.age = 1;
    person.friends = 'Vincent';

    // person.sync();

    Tamarillo.create(person);

    // let persons: Result<Person> = await Tamarillo.findAll(Person.prototype);

    p.forEach(person => {
        console.log(person.age, person.name, person.friends);
    });

}

Test();