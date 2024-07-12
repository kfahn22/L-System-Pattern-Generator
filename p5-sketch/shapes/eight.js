// https://mathcurve.com/courbes2d.gb/bicorne/bicorne.shtml

class Eight {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 1;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * this.a * sin(theta);
      let y = this.r * this.a * sin(theta) * cos(theta);
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
    endShape();
    pop();
  }
}
