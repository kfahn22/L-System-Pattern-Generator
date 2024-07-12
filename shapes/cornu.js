// https://mathcurve.com/courbes2d.gb/cornu/cornu.shtml

// https://virtualmathmuseum.org/Curves/clothoid/kappaCurve.html

class CornuSpiral {
  constructor(x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.numPoints = 200;
    this.maxT = 2 * PI;
    this.r = r;
    this.n = 50;
    this.c = 0;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let i = 0; i < this.numPoints; i++) {
      let t = map(i, 0, this.numPoints, -this.maxT, this.maxT);
      let x = this.c + this.r * this.fresnelC(t);
      let y = this.c + this.r * this.fresnelS(t);
      this.points.push(createVector(x, y));
    }
  }

  fresnelC(t) {
    let sum = 0;
    let dt = t / this.n;
    for (let i = 0; i < this.n; i++) {
      let u = i * dt;
      sum += cos((u * u) / 2) * dt;
    }
    return sum;
  }

  fresnelS(t) {
    let sum = 0;
    let dt = t / this.n;
    for (let i = 0; i < this.n; i++) {
      let u = i * dt;
      sum += sin((u * u) / 2) * dt;
    }
    return sum;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    let c;
    let r = random(1);
    if (r <= 0.25) {
      c = color(209, 210, 249);
    } else if (r > 0.25 && r <= 0.5) {
      c = color(163, 168, 249);
    } else if (r > 0.5 && r <= 0.75) {
      c = color(119, 150, 203);
    } else if (r > 0.75) {
      c = color(87, 100, 144);
    }
    stroke(c);
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
