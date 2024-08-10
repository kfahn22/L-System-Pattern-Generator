class addText {
  constructor(x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
  }

  show() {
    push();
    translate(this.x - this.r/2, this.y - this.r/2);
    rotate(this.angle);
    textSize(this.r/2);
    text("404",  0, 0);
    pop();
  }
}
