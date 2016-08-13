import "reflect-metadata";

function Column(typeOrOptions?, options?): Function {
    return function (object: Object, propertyName: string) {
      console.log(object, propertyName)
      const reflectedType = Reflect.getMetadata("design:type", object, propertyName);
      console.log(reflectedType);
    }
}

/**
 * Expose all the sequalize methods and make it compatible
 * 
 * @class Sequalize
 */
class Sequalize {
  static sync(args) {
    console.log("function name: ", this.name)
  }
  static create(args) {}
}

/**
 * Model class for some pre-defined methods like a bridge
 * 
 * @class Model
 * @extends {Sequalize}
 */
class Model extends Sequalize {}

class Person extends Model {

    @Column()
    name: string;

    @Column()
    age: number;
    
    constructor() {
        super();
    }
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