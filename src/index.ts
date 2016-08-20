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

    Torm.create(person);

    let persons = await Torm.query(Person.prototype)
        .where({ id: 127 })
        .findAll();

    persons.forEach(p => console.log(p.id))

    let count = await Torm.query(Person.prototype).count();
    console.log(count);

    let all = await Torm
        .query(Person.prototype)
        .not('name')
        .limit(3)
        .offset(2)
        .find();

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

Test().catch(e => {
    console.log(e);
})