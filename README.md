<img width="130"src="https://raw.githubusercontent.com/tormjs/torm/master/docs/torm.png">

<a href="https://circleci.com/gh/tormjs/torm/tree/master"><img src="https://img.shields.io/circleci/project/tormjs/torm/master.svg" alt="Build Status"></a>

# Torm
Torm is an decorator & fluent API based ORM for Typescript, it's built on Sequelize.

## Usage

Connect to database

```typescript
Torm.connect('orm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
```

### Model definition

```typescript
@Entity
class Person extends Model {

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    friends: string

}
```

### Model creation

```typescript
let person = new Person();
person.name = 'Eric';
person.age = 1;
person.friends = 'Vincent';
Torm.create(person);
```

### Query API

```typescript
let persons = await Torm.query(Person.prototype)
    .where(col('id').eq(1))
    .findAll();

persons.forEach(p => console.log(p.name))

let count = await Torm.query(Person.prototype).count();
console.log(count);

let all = await Torm.query(Person.prototype).limit(2).offset(1).findAll();
all.forEach(a => console.log(a.id));
```

Fluent Query API

```typescript
const cond = col('age').lt(20);    // age < 20
const cond = col('age').lt(30).or().gt(20);    // age > 20 or age < 30
const cond = col('age').lt(30).and().gt(20);     // age > 20 and age < 30

const cond = col('id').between(20, 30);

// and more APIs...

```

We could integrate fluent API with query API.

```typescript

let rst = await Torm.query(Perons.prototype)
    .where( col('age').lt(30).and().gt(20) )
    .findAll();

```

## License

[MIT](http://opensource.org/licenses/MIT)