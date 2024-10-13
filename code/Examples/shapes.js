const e = 2.71828;

class Shape {
  constructor(r, a, b, m, n, n1, n2, n3, d, angle) {
    this.r = r;
    this.a = a;
    this.b = b;
    this.m = m;
    this.n1 = n1;
    this.n2 = n2;
    this.n3 = n3;
    this.n = n;
    this.d = d;
    this.angle = angle;
    this.points = [];
  }

  // https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml

  // n = 1 Archimedian Spiral
  // n = -1 Hyperbolic Spiral
  // n = 1/2 Fermat spiral
  // n = -1/2 Lituus spiral
  // n = 2 Galilean spiral
  archimedesSpiral() {
    let a = 0.1;
    let dir = -1;
    for (let theta = 0; theta < 4 * PI; theta += 0.05) {
      let r = dir * a * pow(theta, this.n);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  arc() {
    for (let theta = 0; theta < this.a * PI; theta += 0.05) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/astroid/astroid.shtml
  // https://mathworld.wolfram.com/Astroid.html
  astroid() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * this.a * pow(cos(theta), 3);
      let y = this.r * this.a * pow(sin(theta), 3);
      this.points.push(createVector(x, y));
    }
  }

  atom() {
    let a = 0.5;
    for (let theta = -3 * PI; theta < 3 * PI; theta += 0.05) {
      let r = theta / (theta - a);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/bicorne/bicorne.shtml
  bicorn() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * sin(theta);
      let y = (this.r * pow(cos(theta), 2)) / (2 + cos(theta));
      this.points.push(createVector(x, y));
    }
  }

  box() {
    this.points.push(createVector(0, 0));
    this.points.push(createVector(2 * this.r, 0));
    this.points.push(createVector(2 * this.r, 2 * this.r));
    this.points.push(createVector(0, 2 * this.r));
  }

  // Butterfly curve equation from http://paulbourke.net/geometry/butterfly/
  butterfly() {
    for (let theta = 0; theta < 8 * PI; theta += 0.05) {
      let r =
        pow(e, sin(theta)) -
        2 * cos(4 * theta) +
        pow(sin((2 * theta - PI) / 24), 5);
      const x = this.r * r * cos(theta);
      const y = -this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/topics/PlaneCurves.html
  cannibus() {
    for (let theta = 0; theta < PI; theta += 0.01) {
      let r =
        (1 + (9 / 10) * cos(8 * theta)) *
        (1 + (1 / 10) * cos(24 * theta)) *
        (9 / 10 + (1 / 10) * cos(200 * theta)) *
        (1 + sin(theta));
      const x = this.r * r * cos(theta);
      const y = -this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/CassiniOvals.html

  cassiniOval() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let root = sqrt(pow(this.b / this.a, 4) - pow(sin(2 * theta), 2));
      let r = pow(this.a, 2) * (cos(2 * theta) + root);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }
  ceva() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * (cos(3 * theta) + 2 * cos(theta));
      let y = this.r * sin(3 * theta);
      this.points.push(createVector(x, y));
    }
  }

  //https://mathcurve.com/courbes2d/ornementales/ornementales.shtml

  clover() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let r = 1 + cos(this.m * theta) + pow(sin(this.m * theta), 2);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/cornu/cornu.shtml

  // https://virtualmathmuseum.org/Curves/clothoid/kappaCurve.html

  fresnelC(t) {
    let sum = 0;
    let n = 50;
    let dt = t / n;
    for (let i = 0; i < n; i++) {
      let u = i * dt;
      sum += cos((u * u) / 2) * dt;
    }
    return sum;
  }

  fresnelS(t) {
    let sum = 0;
    let n = 50;
    let dt = t / n;
    for (let i = 0; i < n; i++) {
      let u = i * dt;
      sum += sin((u * u) / 2) * dt;
    }
    return sum;
  }

  cornuSpiral() {
    let numPoints = 200;
    let maxT = this.a * PI;
    for (let i = 0; i < numPoints; i++) {
      let t = map(i, 0, numPoints, -maxT, maxT);
      let x = this.n + this.r * this.fresnelC(t);
      let y = this.n + this.r * this.fresnelS(t);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/croixdemalte/croixdemalte.shtml
  malteseCross() {
    for (let theta = 0.1; theta < TWO_PI; theta += 0.05) {
      let x = this.r * +cos(theta) * (pow(cos(theta), 2) - this.a);
      let y = this.r * +this.b * sin(theta) * pow(cos(theta), 2);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/deltoid/deltoid.shtml

  deltoid() {
    let a = 1;
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * (4 * a * pow(cos(theta / 2), 2) * cos(theta) - a);
      let y = this.r * (4 * a * pow(sin(theta / 2), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  eight() {
    let a = 1;
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * a * sin(theta);
      let y = this.r * a * sin(theta) * cos(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://thecodingtrain.com/challenges/55-mathematical-rose-patterns

  flower() {
    for (let theta = 0; theta < TWO_PI; theta += 0.01) {
      let r = this.a + cos(this.m * theta);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/GearCurve.html
  // https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

  hyperbolicTan(theta) {
    let l = pow(e, 2 * theta);
    return (l - 1) / (l + 1);
  }

  gear() {
    for (let theta = 0; theta < 2 * PI; theta += 0.025) {
      let r =
        this.a +
        (1 / this.b) * this.hyperbolicTan(this.b * sin(this.m * theta));
      let x = this.r * r * sin(theta);
      let y = this.r * r * cos(theta);
      this.points.push(createVector(x, y));
    }
  }

  // heart curve equation from https://mathworld.wolfram.com/HeartCurve.html

  heart() {
    for (let theta = 0; theta < 2 * PI; theta += 0.05) {
      const r =
        2 -
        2 * sin(theta) +
        sin(theta) * (pow(abs(cos(theta)), 0.5) / (sin(theta) + 1.4));
      const x = this.r * r * cos(theta);
      const y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/bouche/bouche.shtml
  kissCurve() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.a * this.r * cos(theta);
      let y = this.b * this.r * pow(sin(theta), 3);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d/ornementales/ornementales.shtml

  knot() {
    for (let theta = -2 * PI; theta < 2 * PI; theta += 0.1) {
      let x = 0.5 * this.r * (3 * sin(theta) + 2 * sin(3 * theta));
      let y = 0.5 * this.r * (cos(theta) - 2 * cos(3 * theta));
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/DumbbellCurve.html
  // https://thecodingtrain.com/challenges/116-lissajous-curve-table

  showLine() {
    this.points.push(createVector(0, 0));
    this.points.push(createVector(2 * this.r, 0));
  }

  // https://thecodingtrain.com/challenges/116-lissajous-curve-table

  lissajous() {
    for (let theta = -2 * PI; theta <= 2 * PI; theta += 0.01) {
      let x = this.r * sin(this.a * theta + this.m) + 1;
      let y = this.r * sin(this.b * theta);
      this.points.push(createVector(x, y));
    }
  }

  quadrifolium() {
    let a = 1;
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * (2 * a * pow(sin(theta), 2) * cos(theta));
      let y = this.r * (2 * a * pow(cos(theta), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  quadrilaterial() {
    for (let theta = 0; theta < TWO_PI; theta += TWO_PI / this.m) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://thecodingtrain.com/challenges/55-mathematical-rose-patterns
  // https://editor.p5js.org/codingtrain/sketches/3kanFIcHd

  reduceDenominator(numerator, denominator) {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
  }

  rose() {
    let k = this.d / this.m;
    for (
      let theta = 0;
      theta < TWO_PI * this.reduceDenominator(this.d, this.m);
      theta += 0.02
    ) {
      let r = this.r * cos(k * theta);
      let x = r * cos(theta);
      let y = r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml
  // https://mathcurve.com/courbes2d.gb/spirale/spirale.shtml
  // this.n = 1 Archimedian Spiral
  // this.n = -1 Hyperbolic Spiral
  // this.n = 1/2 Fermat spiral
  // this.n = -1/2 Lituus spiral
  // this.n = 2 Galilean spiral
  spiral() {
    //let a = 0.1;
    let dir = -1;
    for (let theta = 0; theta < 4 * PI; theta += 0.05) {
      let r = dir * this.a * pow(theta, this.n);
      //let r = this.a * pow(theta, this.n);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://thecodingtrain.com/challenges/19-superellipse

  // this.n = 0.5 astroid
  sgn(val) {
    if (val == 0) {
      return 0;
    }
    return val / abs(val);
  }

  superellipse() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let na = 2 / this.n;
      let x = this.r * pow(abs(cos(theta)), na) * this.a * this.sgn(cos(theta));
      let y = this.r * pow(abs(sin(theta)), na) * this.b * this.sgn(sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  // https://thecodingtrain.com/challenges/23-2d-supershapes

  superformula(theta) {
    let part1 = (1 / this.a) * cos((theta * this.m) / 4);
    part1 = abs(part1);
    part1 = pow(part1, this.n2);
    let part2 = (1 / this.b) * sin((theta * this.m) / 4);
    part2 = abs(part2);
    part2 = pow(part2, this.n3);
    let part3 = pow(part1 + part2, 1 / this.n1);
    if (part3 === 0) {
      return 0;
    }
    return 1 / part3;
  }

  supershape() {
    for (let theta = 0; theta <= TWO_PI; theta += 0.025) {
      let r = this.superformula(theta);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/larme/larme.shtml

  tearDrop() {
    let n = 4;
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta) * pow(sin(theta / 2), n);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    rotate(this.angle);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }

  showImage(images) {
    let i = floor(random(10));
    let img = images[i];
    push();
    rotate(this.angle);
    image(img, 0, 0, this.r, this.r);
    pop();
  }

  openShow() {
    push();
    rotate(this.angle);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }

  showWord() {
    let options = [
      "FAMILY",
      "FRIENDS",
      "HEALTH",
      "SAFETY",
      "LOVED",
      "SAVED",
      "EDUCATION",
      "PEACE",
      "PURPOSE",
    ];
    push();
    rotate(this.angle);
    textSize(this.r * 0.5);
    textAlign(CENTER, CENTER);
    text(random(options), 0, 0);
    pop();
  }
}
