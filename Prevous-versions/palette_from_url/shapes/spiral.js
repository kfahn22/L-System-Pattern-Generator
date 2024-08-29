// https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml

// n = 1 Archimedian Spiral
// n = -1 Hyperbolic Spiral
// n = 1/2 Fermat spiral
// n = -1/2 Lituus spiral
// n = 2 Galilean spiral

class Spiral {
  constructor(x, y, dir, sc, a, n, angle) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.sc = sc/2;
    this.a = a;
    this.points = [];
    this.n = n;
    this.angle = angle;
    this.maxRot = 4; // 4
    this.c = 5; // adjust to extend line
  }

  addPoints() {
    for (let theta = 0; theta < this.maxRot * PI; theta += 0.1) {
      let r = this.dir * this.a * pow(theta, this.n);
      let x = this.sc * r * cos(theta) - this.c;
      let y = this.sc * r * sin(theta) + this.c;
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
