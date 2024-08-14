// https://mathcurve.com/courbes2d.gb/deltoid/deltoid.shtml

class Deltoid {
  constructor(x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 1;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x =
        this.r * (4 * pow(cos(theta / 2), 2) * cos(theta) - this.a);
      let y = this.r * (4 * pow(sin(theta / 2), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle); // PI/6
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
