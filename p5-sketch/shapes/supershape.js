// https://thecodingtrain.com/challenges/23-2d-supershapes

class Supershape {
  constructor(x, y, sc, m) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.a = 1;
    this.b = 1;
    this.n1 = 1;
    this.n2 = 1;
    this.n3 = 1;
    this.m = m;
    this.points = [];
  }

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

  addPoints() {
    for (let theta = 0; theta <= TWO_PI; theta += 0.1) {
      let r = this.superformula(theta);
      let x = this.sc * r * cos(theta);
      let y = this.sc * r * sin(theta);
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
