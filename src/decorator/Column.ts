export function Column(typeOrOptions?, options?): Function {
    return function (object: Object, propertyName: string) {
      console.log(object.constructor.name)
      // console.log(object, propertyName)
      const reflectedType = Reflect.getMetadata("design:type", object, propertyName);
      console.log(reflectedType);
    }
}