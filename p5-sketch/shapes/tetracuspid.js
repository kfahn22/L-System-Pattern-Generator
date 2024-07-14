// https://mathcurve.com/courbes2d.gb/tetracuspide/tetracuspide.shtml

class Tetracuspid {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 1;
    this.u = 0.1;
    this.v = 5;
    this.points = [];
  }

  addPoints() {
    for (let theta = -PI/2; theta < PI/2; theta += 0.1) {
      let x = this.r * this.a * cos(theta*(this.u + this.v))*(1-2*this.u*this.v*pow(sin(theta), 2));
      let y =
        this.r *
        this.a *
        sin(theta * (this.u + this.v)) *
        (1 - 2 * this.u * this.v * pow(close(theta), 2));
        this.points.push(createVector(x, y));

      // debug
        // let x = this.r * this.a * sin(theta);
        // let y = this.r * this.a * sin(theta) * cos(theta);
        // this.points.push(createVector(x, y));
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
