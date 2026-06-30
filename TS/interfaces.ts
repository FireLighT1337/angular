let drawPoint = (point: { x: number; y: number }) => {
  //...
};

drawPoint({
  x: 1,
  y: 2,
});

interface Point {
  x: number;
  y: number;
}

let betterPoint = (point: Point) => {
  //...
};

betterPoint({
  x: 1,
  y: 2,
});
