import "reflect-metadata";

import {Torm, Model, Result} from './core';
import {Column, Entity} from './decorator';
import {entityPool, Property} from './entity';

// create connection

Torm.connect('orm', 'root', '', {
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

    // Tamarillo.create(person);

    let persons = await Torm.query(Person.prototype)
        .where({ id: 1 })
        .findAll();

    persons.forEach(p => console.log(p.name))

    let count = await Torm.query(Person.prototype).count();
    console.log(count);

    let all = await Torm.query(Person.prototype).column('name').limit(2).offset(1).findAll();
    all.forEach(a => console.log(a.name));

    // let person2 = await Tamarillo
    //     .query(Person.prototype)
    //     .count('age')
    //     .findAll();

    // persons.forEach(person => {
    //     console.log(person.age, person.name, person.friends. person.cnt);
    // });

    // console.log(persons.cnt);

}

Test();