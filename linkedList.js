class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.next = nextNode;
  }
}

class LinkedList {
  #head;
  #size;

  constructor() {
    this.#head = null;
    this.#size = 0;
  }

  append(value) {
    if (this.head === null) {
      this.prepend(value);
    } else {
      this.tail.next = new Node(value);
      this.#size++;
    }
  }

  prepend(value) {
    this.#head = new Node(value, this.head);
    this.#size++;
  }

  get size() {
    return this.#size;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    const tail = this.at(this.size - 1);
    return tail;
  }

  at(index) {
    const { curr } = this.#goToIndex(index);
    return curr;
  }

  pop() {
    if (this.head === null) throw new Error("List is empty");

    if (this.head.next === null) {
      this.#head = null;
    } else {
      const { prev } = this.#goToIndex(this.size - 1);
      prev.next = null;
    }
    this.#size--;
  }

  contains(value) {
    const node = this.find(value);

    return node !== null;
  }

  find(value) {
    let curr = this.head;

    while (curr !== null) {
      if (curr.value === value) {
        return curr;
      }
      curr = curr.next;
    }

    return null;
  }

  toString() {
    let str = "";
    let curr = this.head;

    while (curr !== null) {
      str += `( ${curr.value} ) -> `;
      curr = curr.next;
    }

    str += "null";

    return str;
  }

  #goToIndex(index) {
    let prev = null;
    let curr = this.head;
    let i = 0;

    if (index >= this.size) {
      throw new Error("Index out of bounds");
    }

    while (i < index) {
      prev = curr;
      curr = curr.next;
      i++;
    }

    return { prev, curr };
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    }

    const { prev, curr } = this.#goToIndex(index);

    prev.next = new Node(value, curr);
    this.#size++;
  }

  removeAt(index) {
    if (this.head === null) return;

    if (index === 0) {
      this.#head = this.head.next;
    } else {
      const { prev, curr } = this.#goToIndex(index);
      prev.next = curr.next;
    }
    this.#size--;
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log(list.toString());

list.prepend("mouse");
console.log(list.toString());

list.pop();
console.log(list.toString());

console.log(list.size);
console.log(list.at(2));
console.log(list.contains("cat"));
console.log(list.find("mouse"));

list.insertAt("lion", 3);
console.log(list.toString());

list.removeAt(2);
console.log(list.toString());
