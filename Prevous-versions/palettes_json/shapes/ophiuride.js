// https://mathworld.wolfram.com/Ophiuride.html

class Ophiuride {
  constructor(x, y, sc, a, b) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.a = a;
    this.b = b;
    this.points = [];
  }

  addPoints() {
    for (let theta = -PI*1/2; theta < PI*1/2; theta += 0.05) {
      let r = (this.b * sin(theta) -this.a * cos(theta)) * tan(theta);
      let x = this.sc * r * cos(theta);
      let y = this.sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
     rotate(PI/4);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    if (this.b === 0)
    {endShape(CLOSE);}
    else {
      endShape();
    }
    pop();
  }
}
