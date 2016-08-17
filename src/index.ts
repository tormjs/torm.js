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

async function Test() {
    let person = new Person();
    person.name = 'Eric';
    person.age = 1;
    person.friends = 'Vincent';

    // person.sync();

    Tamarillo.create(person);

    let persons = await Tamarillo
        .where(Person.prototype)
        .findAll();
        

    persons.forEach(person => {
        console.log(person.age, person.name, person.friends);
    });

}

Test();