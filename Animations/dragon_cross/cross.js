// https://mathcurve.com/courbes2d.gb/croixdemalte/croixdemalte.shtml

class MalteseCross {
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
    for (let theta = 0.1; theta < TWO_PI; theta += 0.1) {
      let x = this.r * +cos(theta) * (pow(cos(theta), 2) - this.a);
      let y = this.r * +this.b * sin(theta) * pow(cos(theta), 2);
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
