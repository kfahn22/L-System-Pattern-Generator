const e = 2.71828;

class DragonShape {
  constructor(buffer, x, y, length, angle) {
    this.buffer = buffer;
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.points = [];
  }

  // https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml

  // n = 1 Archimedian Spiral
  // n = -1 Hyperbolic Spiral
  // n = 1/2 Fermat spiral
  // n = -1/2 Lituus spiral
  // n = 2 Galilean spiral
  archimedesSpiral(sc, n) {
    let a = 0.1;
    let dir = -1;
    for (let theta = 0; theta < 4 * PI; theta += 0.05) {
      let r = dir * a * pow(theta, 1);
      let x = this.length * sc * r * cos(theta);
      let y = this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/astroid/astroid.shtml
  // https://mathworld.wolfram.com/Astroid.html
  astroid(r, a) {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.length * r * a * pow(cos(theta), 3);
      let y = this.length * r * a * pow(sin(theta), 3);
      this.points.push(createVector(x, y));
    }
  }

  atom(r) {
    let a = 0.5;
    for (let theta = -3 * PI; theta < 3 * PI; theta += 0.05) {
      let r = theta / (theta - a);
      let x = this.length * r * cos(theta);
      let y = this.length * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/bicorne/bicorne.shtml
  bicorn(r) {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.length * r * sin(theta);
      let y = (this.length * r * pow(cos(theta), 2)) / (2 + cos(theta));
      this.points.push(createVector(x, y));
    }
  }

  // Butterfly curve equation from http://paulbourke.net/geometry/butterfly/
  butterfly(sc) {
    for (let theta = 0; theta < 8 * PI; theta += 0.05) {
      let r =
        pow(e, sin(theta)) -
        2 * cos(4 * theta) +
        pow(sin((2 * theta - PI) / 24), 5);
      const x = this.length * sc * r * cos(theta);
      const y = -this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/topics/PlaneCurves.html
  cannibus(sc) {
    for (let theta = 0; theta < PI; theta += 0.01) {
      let r =
        (1 + (9 / 10) * cos(8 * theta)) *
        (1 + (1 / 10) * cos(24 * theta)) *
        (9 / 10 + (1 / 10) * cos(200 * theta)) *
        (1 + sin(theta));
      const x = this.length * sc * r * cos(theta);
      const y = -this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/CassiniOvals.html
  cassiniOval(sc, a, b) {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let root = sqrt(pow(b / a, 4) - pow(sin(2 * theta), 2));
      let r = pow(a, 2) * (cos(2 * theta) + root);
      let x = this.length * sc * r * cos(theta);
      let y = this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }
  ceva(r) {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.length * r * (cos(3 * theta) + 2 * cos(theta));
      let y = this.length * r * sin(3 * theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/cornu/cornu.shtml

  // https://virtualmathmuseum.org/Curves/clothoid/kappaCurve.html

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

  cornuSpiral(r) {
    let numPoints = 200;
    let maxT = 2 * PI;
    this.n = 50;
    this.c = 0;
    for (let i = 0; i < numPoints; i++) {
      let t = map(i, 0, numPoints, -maxT, maxT);
      let x = this.c + this.length * r * this.fresnelC(t);
      let y = this.c + this.length * r * this.fresnelS(t);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/Cranioid.html
  craniod(sc, a, b, m) {
    let p = 0.75;
    let q = 0.75;
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let r =
        a * sin(theta) +
        b * sqrt(1 - p * pow(cos(theta), 2)) +
        m * sqrt(1 - q * pow(cos(theta), 2));
      let x = this.length * sc * r * cos(theta);
      let y = this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/croixdemalte/croixdemalte.shtml
  malteseCross(r, a, b) {
    for (let theta = 0.1; theta < TWO_PI; theta += 0.05) {
      let x = this.length * r * cos(theta) * (pow(cos(theta), 2) - a);
      let y = this.length * r * b * sin(theta) * pow(cos(theta), 2);
      this.points.push(createVector(x, y));
    }
  }
  // https://mathcurve.com/courbes2d.gb/deltoid/deltoid.shtml

  deltoid(r) {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.length * r * (4 * pow(cos(theta / 2), 2) * cos(theta) - a);
      let y = this.length * r * (4 * pow(sin(theta / 2), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/bicorne/bicorne.shtml

  eight(r) {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.length * r * sin(theta);
      let y = this.length * r * sin(theta) * cos(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/GearCurve.html
  // https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

  hyperbolicTan(theta) {
    let l = pow(e, 2 * theta);
    return (l - 1) / (l + 1);
  }

  gear(sc, a, b, m) {
    for (let theta = 0; theta < 2 * PI; theta += 0.05) {
      let r = a + (1 / b) * this.hyperbolicTan(b * sin(m * theta));
      let x = this.length * sc * r * sin(theta);
      let y = this.length * sc * r * cos(theta);
      this.points.push(createVector(x, y));
    }
  }

  // heart curve equation from https://mathworld.wolfram.com/HeartCurve.html

  heart(sc) {
    for (let theta = 0; theta < 2 * PI; theta += 0.05) {
      const r =
        2 -
        2 * sin(theta) +
        sin(theta) * (pow(abs(cos(theta)), 0.5) / (sin(theta) + 1.4));
      const x = this.length * sc * r * cos(theta);
      const y = this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/bouche/bouche.shtml
  // This one isn't working now??
  kissCurve(r, a, b) {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = a * this.length * r * cos(theta);
      let y = b * this.length * r * pow(sin(theta), 3);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d/ornementales/ornementales.shtml

  knot(r) {
    for (let theta = -2 * PI; theta < 2 * PI; theta += 0.05) {
      let x = 0.5 * this.length * r * (3 * sin(theta) + 2 * sin(3 * theta));
      let y = 0.5 * this.length * r * (cos(theta) - 2 * cos(3 * theta));
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/DumbbellCurve.html
  // https://thecodingtrain.com/challenges/116-lissajous-curve-table

  showLine(r) {
    this.points.push(createVector(0, 0));
    this.points.push(createVector(2 * this.length * r, 0));
  }

  // https://mathcurve.com/courbes2d.gb/deltoid/deltoid.shtml

  quadrifolium(r) {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.length * r * (2 * pow(sin(theta), 2) * cos(theta));
      let y = this.length * r * (2 * pow(cos(theta), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  quadrilaterial(r, m) {
    for (let theta = 0; theta < TWO_PI; theta += TWO_PI / m) {
      let x = this.length * r * cos(theta);
      let y = this.length * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://thecodingtrain.com/challenges/55-mathematical-rose-patterns

  // https://mathcurve.com/courbes2d.gb/deltoid/deltoid.shtml

  reduceDenominator(numerator, denominator) {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
  }

  rose(sc, a, b, n) {
    let k = n / b;
    for (
      let theta = 0;
      theta < TWO_PI * this.reduceDenominator(n, b);
      theta += 0.05
    ) {
      let r = a + cos(k * theta);
      let x = this.length * sc * r * cos(theta);
      let y = this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml

  // n = 1 Archimedian Spiral
  // n = -1 Hyperbolic Spiral
  // n = 1/2 Fermat spiral
  // n = -1/2 Lituus spiral
  // n = 2 Galilean spiral

  spiral(sc, a) {
    let dir = -1;
    let c = 3; // adjust to extend line
    let n = -1 / 2;
    let maxRot = 4;
    for (let theta = 0; theta < maxRot * PI; theta += 0.05) {
      let r = dir * a * pow(theta, n);
      let x = 0.5 * this.length * sc * r * cos(theta) - c;
      let y = 0.5 * this.length * sc * r * sin(theta) + c;
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

  superellipse(r, a, b, n) {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let na = 2 / n;
      let x =
        this.length * r * pow(abs(cos(theta)), na) * a * this.sgn(cos(theta));
      let y =
        this.length * r * pow(abs(sin(theta)), na) * b * this.sgn(sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  // https://thecodingtrain.com/challenges/23-2d-supershapes

  superformula(theta) {
    let part1 = (1 / a) * cos((theta * m) / 4);
    part1 = abs(part1);
    part1 = pow(part1, n2);
    let part2 = (1 / b) * sin((theta * m) / 4);
    part2 = abs(part2);
    part2 = pow(part2, n3);
    let part3 = pow(part1 + part2, 1 / n1);
    if (part3 === 0) {
      return 0;
    }
    return 1 / part3;
  }

  supershape(sc, a, b, m, n, n1, n2, n3) {
    for (let theta = 0; theta <= TWO_PI; theta += 0.05) {
      let r = this.superformula(theta, a, b, m, n, n1, n2, n3);
      let x = this.length * sc * r * cos(theta);
      let y = this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/larme/larme.shtml

  tearDrop(r) {
    let n = 4;
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.length * r * cos(theta);
      let y = this.length * r * sin(theta) * pow(sin(theta / 2), n);
      this.points.push(createVector(x, y));
    }
  }

  show(palette) {
    let c = random(palette);
    c[3] = 180;
    this.buffer.stroke(random(palette));
    this.buffer.fill(c);
    this.buffer.push();
    this.buffer.translate(this.x, this.y);
    this.buffer.rotate(this.angle);
    this.buffer.beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    this.buffer.endShape(CLOSE);
    this.buffer.pop();
  }

  openShow(palette) {
    let c = random(palette);
    this.buffer.stroke(c);
    this.buffer.push();
    this.buffer.translate(this.x, this.y);
    this.buffer.rotate(this.angle);
    this.buffer.beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    this.buffer.endShape();
    this.buffer.pop();
  }
}
