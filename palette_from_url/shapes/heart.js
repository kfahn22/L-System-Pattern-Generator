// // heart curve equation from https://mathworld.wolfram.com/HeartCurve.html


class Heart {
  constructor(x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < 2 * PI; theta += 0.1) {
      const r =
        2 -
        2 * sin(theta) +
        sin(theta) * (pow(abs(cos(theta)), 0.5) / (sin(theta) + 1.4));
      const x = this.r * r * cos(theta);
      const y = this.r * r * sin(theta);
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
