// https://mathcurve.com/courbes2d.gb/croixdemalte/croixdemalte.shtml

class MalteseCross {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 3;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * +cos(theta) * (pow(cos(theta), 2) - this.a);
      let y = this.r * +sin(theta) * pow(cos(theta), 2);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    let c;
    let r = random(1);
    if (r <= 0.25) {
      c = color(219, 228, 238, 100);
    } else if (r > 0.25 && r <= 0.5) {
      c = color(129, 164, 205, 100);
    } else if (r > 0.5 && r <= 0.75) {
      c = color(62, 124, 177, 100);
    } else if (r > 0.75) {
      c = color(5, 74, 145, 100);
    }
    fill(c);
    // stroke(5, 74, 145);
    noStroke();
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
