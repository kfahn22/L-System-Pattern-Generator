class addText {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  show() {
    push();
    translate(this.x, this.y);
    textSize(this.r);
    textAlign(CENTER, CENTER);
    text("404", 0, 0);
    pop();
  }
}
