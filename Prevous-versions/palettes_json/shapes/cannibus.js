// https://mathworld.wolfram.com/topics/PlaneCurves.html

class Cannibus {
  constructor(x, y, sc, angle) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < PI; theta += 0.01) {
      let r =
        (1 + (9 / 10) * cos(8 * theta)) *
        (1 + (1 / 10) * cos(24 * theta)) *
        (9 / 10 + (1 / 10) * cos(200 * theta)) *
        (1 + sin(theta));
      const x = this.sc * r * cos(theta);
      const y = -this.sc * r * sin(theta);
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