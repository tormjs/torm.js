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

class Container<T> {
  private _container: {key: string, handler}[];

  constructor() {
    this._container = [];
  }

  add(key: string, item: T) {
    if (this.find(key))
      return;

    this._container.push({
      key: key,
      handler: item
    })
  }


  find(key: string): T {
    let find = this._container.filter(item => {
      if (item.key === key) {
        return item.handler;
      }
    })
    if (!find || !find[0]) return null;

    return find[0].handler;
  }
}

const tableContainer = new Container<Sequalize>();

class Model extends Sequalize {
  constructor() {
      super();
      // let formatString = getFormat(this, "greeting");
      // let aaa = getFormat(this, "aaa");

      let table = "greeter";
      let model = tableContainer.find(table)

      if (!model) {
        model = new Sequalize();
        tableContainer.add(table, model)
      }

      // model.name = aaa;

      return model;
  }
  
}

class Greeter extends Model {

    @Column()
    greeting: string;

    @Column()
    aaa: number;
    
    constructor() {
        super();
    }
}

async function App() {

  // console.log(greeter.greet())

  let greeter = new Greeter();

  Greeter.getName();

  greeter.aaa = 11;

  // greeter.testMethod("ppppp");

  await Greeter.sync();
  await Greeter.create();
}

App();