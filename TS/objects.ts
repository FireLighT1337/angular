class Point {
  x: number;
  y: number;

  // you cant have MULTIPLE constructors in TS!
  // however there is some type of overloading possible:
  // 1. Define the overload signatures (No code bodies here!)
  constructor();
  constructor(x: number, y: number);

  // 2. The SINGLE actual implementation that satisfies both signatures
  // ? makes x or y optional
  constructor(x?: number, y?: number) {
    this.x = x ?? 0; // If x is undefined, default to 0
    this.y = y ?? 0; // If y is undefined, default to 0
  }

  draw() {
    console.log(`X: ${this.x} Y: ${this.y}`);
  }

  getDistance(another: Point) {
    //...
  }
}

const point = new Point(10, 20);
point.draw();
