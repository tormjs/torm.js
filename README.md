# Torm
Torm is an easy-to-use ORM for Typescript, it's based on Sequelize.

### Note: Still under development, don't use it in production.

## Usage

Connect to database

```typescript
Torm.connect('orm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
```


Model definition

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

Create a model

```typescript
let person = new Person();
person.name = 'Eric';
person.age = 1;
person.friends = 'Vincent';
```

Query API

```typescript
let persons = await Torm.query(Person.prototype)
    .where({ id: 1 })
    .findAll();

persons.forEach(p => console.log(p.name))

let count = await Torm.query(Person.prototype).count();
console.log(count);

let all = await Torm.query(Person.prototype).limit(2).offset(1).findAll();
all.forEach(a => console.log(a.id));
```