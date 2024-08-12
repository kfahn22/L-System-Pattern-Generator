// https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml

// n = 1 Archimedian Spiral
// n = -1 Hyperbolic Spiral
// n = 1/2 Fermat spiral
// n = -1/2 Lituus spiral
// n = 2 Galilean spiral

class ArchimedesSpiral {
  constructor(x, y, sc, dir, angle) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.sc = sc;
    this.a = 0.1;
    this.points = [];
    this.n = 1;
    this.angle = angle;
  }

  addPoints() {
    for (let theta = 0; theta < 4 * PI; theta += 0.1) {
      let r = this.dir * this.a * pow(theta, this.n);
      let x = this.sc * r * cos(theta);
      let y = this.sc * r * sin(theta);
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
