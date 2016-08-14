import "reflect-metadata";

import Model from './Model';
import { Column } from './decorator'

class Person extends Model {

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    friends: number[]
    
}

async function App() {
  /**
   * Operation API Test
   */
  let person = new Person();
  person.name = "Eric Wong";
  person.age = 11;

  await Person.sync({force: true});
  await Person.create(person);
}

App();