// https://thecodingtrain.com/challenges/134-heart-curve

class Heart {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r / 4;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < 2 * PI; theta += 0.1) {
      let x = this.r * 16 * pow(sin(theta), 3);
      let y =
        this.r * 13 * cos(theta) -
        5 * cos(2 * theta) -
        2 * cos(3 * theta) -
        cos(4 * theta);
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
