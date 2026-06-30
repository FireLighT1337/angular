/*
Cohesion is missing, better put it in a class

interface Point {
  x: number;
  y: number;
}
  
let betterPoint = (point: Point) => {
  //...
};

let getDistance = (pointA: Point, pointB: Point) => {
  //...
};

betterPoint({
    x: 1,
    y: 2,
});
*/

class Point {
  x: number;
  y: number;

  /* 
  one way of strict property init:
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  or:
  constructor(private x: number, priavte y: number) {
    this.x = x;
    this.y = y;
  }

  another way, default values:
  class Point {
      x: number = 0;
      y: number = 0;
  }

  definite assignment, ONLY USE if absolutely sure:
  class Point {
  x!: number;
  y!: number;
 */

  draw() {
    //...
  }

  getDistance(another: Point) {
    //...
  }
}
