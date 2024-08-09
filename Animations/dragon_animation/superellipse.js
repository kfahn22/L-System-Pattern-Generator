// https://thecodingtrain.com/challenges/19-superellipse

class Superellipse {
  constructor(x, y, sc, a, b, n) {
    this.x = x;
    this.y = y;
    // this.dir = dir;
    this.sc = sc;
    this.a = a;
    this.b = b;
    this.n = n; // 0.5 astroid
    this.points = [];
  }

  sgn(val) {
    if (val == 0) {
      return 0;
    }
    return val / abs(val);
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let na = 2 / this.n;
      let x =
        this.sc * pow(abs(cos(theta)), na) * this.a * this.sgn(cos(theta));
      let y =
        this.sc * pow(abs(sin(theta)), na) * this.b * this.sgn(sin(theta));
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
    endShape(CLOSE);
    pop();
  }
}
