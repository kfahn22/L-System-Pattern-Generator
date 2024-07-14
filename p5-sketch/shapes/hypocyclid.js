// https://mathcurve.com/courbes2d.gb/astroid/astroid.shtml
// https://mathworld.wolfram.com/Astroid.html

class Hypocyclid {
  constructor(x, y, r, a, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = a;
    this.b = b;
    this.points = [];
  }

  addPoints() {
    for (let theta = -PI; theta <= PI; theta += 0.1) {
      let c = this.a - this.b;
      let x = this.r * c * cos(theta) + this.b * cos((c / this.b) * theta);
      let y = this.r * c * sin(theta) - this.b * sin((c / this.b) * theta);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
