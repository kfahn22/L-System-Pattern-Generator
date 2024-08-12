// https://mathcurve.com/courbes2d.gb/bouche/bouche.shtml

class KissCurve {
  constructor(x, y, r, a, b, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = a;
    this.b = b;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.a * this.r * cos(theta);
      let y = this.b * this.r * pow(sin(theta), 3);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
