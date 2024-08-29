// https://thecodingtrain.com/challenges/55-mathematical-rose-patterns

// https://mathcurve.com/courbes2d.gb/deltoid/deltoid.shtml

class Rose {
  constructor(x, y, r, a, d, n) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = a; // a > 0 leaves a hole in center
    this.d = d;
    this.n = n;
    this.k = this.n / this.d;
    this.points = [];
  }

  reduceDenominator(numerator, denominator) {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
  }

  addPoints() {
    for (
      let theta = 0;
      theta < TWO_PI * this.reduceDenominator(this.n, this.d);
      theta += 0.1
    ) {
      let r = this.a + cos(this.k * theta);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
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