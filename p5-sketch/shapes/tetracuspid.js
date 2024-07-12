// https://mathcurve.com/courbes2d.gb/tetracuspide/tetracuspide.shtml

class Tetracuspid {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 2;
    this.u = 1;
    this.v = 1;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * this.a * cos(theta*(this.u + this.v))*(1-2*this.u*this.v*pow(sin(theta), 2));
      let y =
        this.r *
        this.a *
        sin(theta * (this.u + this.v)) *
        (1 - 2 * this.u * this.v * pow(close(theta), 2));
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
