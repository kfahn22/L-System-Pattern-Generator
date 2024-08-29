// https://mathworld.wolfram.com/DumbbellCurve.html
// https://thecodingtrain.com/challenges/116-lissajous-curve-table

class Lissajous {
  constructor(x, y, sc, a, b, m, angle) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.a = a;
    this.b = b;
    this.m = m;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = -2 * PI; theta <= 2 * PI; theta += 0.01) {
      let x = this.sc * sin(this.a * theta + this.m) + 1;
      let y = this.sc * sin(this.b * theta);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle); // -PI/2
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
