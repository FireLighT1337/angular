class Point {
  constructor(private _x?: number, private _y?: number) {}

  draw() {
    console.log(`X: ${this._x} Y: ${this._y}`);
  }

  get x() {
    return this._x;
  }

  set x(val) {
    if (val! < 0) throw new Error("Value cannot be less than 0");

    this._x = val;
  }
}

const point = new Point(10, 20);
const x = point.x;
point.x = 15;
point.draw();
