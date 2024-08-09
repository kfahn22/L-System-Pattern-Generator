// https://mathcurve.com/courbes2d.gb/abdank/abdank.shtml

class Zigzag {
  constructor(x, y, sc, angle) {
    this.x = x;
    this.y = y;
    this.sc = sc;
   // this.a = 0.1;
    this.points = [];
   // this.n = 1;
    this.angle = angle;
  }

  addPoints() {
    for (let theta = -PI / 2; theta < (3 / 2) * PI; theta += 0.1) {
      let r = 1;
      let x =  this.sc * r * sin(theta);
       let y = ((this.sc * pow(r, 2)) / 2) * (theta + sin(theta) * cos(theta));
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
