// // Butterfly curve equation from http://paulbourke.net/geometry/butterfly/

const e = 2.71828;

class Butterfly {
  constructor(x, y, sc, angle) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < 8 * PI; theta += 0.05) {
      let r =
        pow(e, sin(theta)) -
        2 * cos(4 * theta) +
        pow(sin((2 * theta - PI) / 24), 5);
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
