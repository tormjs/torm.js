import "reflect-metadata";

function Column(typeOrOptions?, options?): Function {
    return function (object: Object, propertyName: string) {
      console.log(object, propertyName)
      const reflectedType = Reflect.getMetadata("design:type", object, propertyName);
      console.log(reflectedType);
    }
}

class Sequalize {
  name: string;
  static getName() {
    console.log("Sequalize,", this.name);
  }
  static sync() {
    console.log("function name: ", this.name)
  }
  static create() {}
}

class Greeter extends Sequalize {

    @Column()
    greeting: string;

    @Column()
    age: number;
    
    constructor() {
        super();
    }
}

async function App() {
  let greeter = new Greeter();

  Greeter.getName();
  greeter.age = 11;

  await Greeter.sync();
  await Greeter.create();
}

App();