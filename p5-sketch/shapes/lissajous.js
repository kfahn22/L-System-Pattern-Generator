// https://mathworld.wolfram.com/DumbbellCurve.html

class Lissajous {
  constructor(x, y, sc, a, b, delta) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.a = a;
    this.b = b;
    this.delta = delta;
    this.points = [];
  }

  addPoints() {
    for (let theta = -2*PI; theta <= 2*PI; theta += 0.01) {
      let x = this.sc * sin(this.a * theta + this.delta) + 1;
      let y = this.sc * sin(this.b * theta);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(-PI / 2);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
