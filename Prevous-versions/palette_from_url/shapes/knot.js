// https://mathcurve.com/courbes2d/ornementales/ornementales.shtml

class Knot {
  constructor(x, y, sc, angle) {
    this.x = x;
    this.y = y;
    this.sc = sc/2;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = -2 * PI; theta < 2 * PI; theta += 0.1) {
      let x = this.sc * (3 * sin(theta) + 2 * sin(3 * theta));
      let y = this.sc * (cos(theta) - 2 * cos(3 * theta));
      this.points.push(createVector(x, y));
    }
  }

  show(angle) {
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
