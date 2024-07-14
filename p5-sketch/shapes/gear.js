// https://mathworld.wolfram.com/GearCurve.html
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

class Gear {
  constructor(x, y, sc, m) {
    this.x = x;
    this.y = y;
    this.a = 1;
    this.b = 10;
    this.m = m;
    this.sc = sc;
    this.points = [];
  }

  hyperbolicTan(theta) {
    let e = 2.71828;
    let l = pow(e, 2 * theta);
    return (l - 1) / (l + 1);
  }

  addPoints() {
    for (let theta = 0; theta < 2 * PI; theta += 0.1) {
      let r =
        this.a +
        (1 / this.b) * this.hyperbolicTan(this.b * sin(this.m * theta));
      let x = this.sc * r * sin(theta);
      let y = this.sc * r * cos(theta);
      this.points.push(createVector(x, y));
      // let p = createVector(x, y);
      // if (this.points.length < 361) {
      //   this.points[theta] = p;
      // } else {
      //   break;
      // }
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }
}
