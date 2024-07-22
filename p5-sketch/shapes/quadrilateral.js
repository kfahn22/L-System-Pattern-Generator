class Quadrilateral {
  constructor(x, y, sc, n, angle) {
    this.x = x;
    this.y = y;
    this.sc = sc;
    this.n = n;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += TWO_PI / this.n) {
      let x = this.sc * cos(theta);
      let y = this.sc * sin(theta);
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
    endShape(CLOSE);
    pop();
  }
}
