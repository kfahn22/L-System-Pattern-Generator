// https://mathworld.wolfram.com/BeanCurve.html

class Bean {
  constructor(x, y, sc) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.a = 1;
    this.points = [];
  }

  addPoints() {
    for (let theta = -PI/2; theta < PI/2; theta += 0.1) {
      let r = this.a * (pow(sin(theta), 2.5) + pow(sin(theta), 2.5)); ;
      // let x = this.r * this.a * cos(theta);
      // let y = (this.r * this.a * pow(cos(theta), 3)) / (3 + cos(theta));
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
