// https://mathcurve.com/courbes2d.gb/bicorne/bicorne.shtml

class Bicorn {
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
      let x = this.r * this.a * sin(theta);
      let y = (this.r * this.a * pow(cos(theta), 2)) / (2 + cos(theta));
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
    endShape();
    pop();
  }
}
