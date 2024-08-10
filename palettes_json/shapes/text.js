// https://docs.google.com/forms/d/e/1FAIpQLSfgYP4tYNvz4aeYvQyUla318PlZvDAA-rWsGYVFIB_sGUSV_w/viewform?pli=1

class addText {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    textSize(this.r);
    text('LOVE', this.x - this.r/2, this.y - this.r/2);
    pop();
  }
}
