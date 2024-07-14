// https://mathworld.wolfram.com/CassiniOvals.html

class CassiniOval {
  constructor(x, y, r, a, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = a;
    this.b = b;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let root = sqrt(pow(this.b/this.a, 4) - pow(sin(2*theta), 2))
      let r = pow(this.a, 2) * (cos(2*theta) + root)
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
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
