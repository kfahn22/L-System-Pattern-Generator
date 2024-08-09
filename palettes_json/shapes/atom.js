// https://mathworld.wolfram.com/Atom-Spiral.html

class AtomSpiral {
  constructor(x, y, sc, a, angle) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.a = 0.25; // 1/4
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = -3 * PI; theta < 3 * PI; theta += 0.05) {
      let r = theta / (theta - this.a);
      let x = this.sc * r * cos(theta);
      let y = this.sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle); // angle 27/64
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
