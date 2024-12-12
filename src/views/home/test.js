function Animal(name) {
  console.log('Animal', this);
  this.name = name;
  console.log('Animal2', this);
}

new Animal('112');
console.log(Animal.prototype);

Animal.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}.`);
};

console.log(Animal.prototype);

function Dog(name, breed) {
  console.log('Dog', this);

  Animal.call(this, name);
  console.log('this :', this);

  this.breed = breed;
  console.log('Dog2', this);
}

new Dog('qqq', 12);

//   Dog.prototype = Object.create(Animal.prototype);
//   Dog.prototype.constructor = Dog;

//   Dog.prototype.bark = function() {
//     console.log('Woof!');
//   }

//   let dog = new Dog('Max', 'Golden Retriever');
//   dog.sayHello(); // 输出 Hello, my name is Max.
//   dog.bark(); // 输出 Woof!
