// https://mathworld.wolfram.com/Cranioid.html

class Craniod {
  constructor(x, y, r, a, b, m, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = a;
    this.b = b;
    this.m = m;
    this.p = 0.75;
    this.q = 0.75;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let r =
        this.a * sin(theta) +
        this.b * sqrt(1 - this.p * pow(cos(theta), 2)) +
        this.m * sqrt(1 - this.q * pow(cos(theta), 2));
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
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
