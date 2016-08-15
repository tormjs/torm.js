import "reflect-metadata";

import {Tamarillo} from './core';
import Model from './Model';
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
    friends: number[]

}

@Entity
class Man extends Model {

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    friends: number[]

}

Person.sync();
Man.sync();