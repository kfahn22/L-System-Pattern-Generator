// https://mathcurve.com/courbes2d.gb/cornu/cornu.shtml
// https://virtualmathmuseum.org/Curves/clothoid/kappaCurve.html

class Ceva {
  constructor(x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * (cos(3 * theta) + 2 * cos(theta));
      let y = this.r * sin(3 * theta);
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
