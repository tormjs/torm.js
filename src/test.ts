import "reflect-metadata";

import Model from './Model';
import {Column} from './decorator';
import {entityCollection, Entity, Property} from './collection';

class Person extends Model {

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    friends: number[]

}

console.log(entityCollection);