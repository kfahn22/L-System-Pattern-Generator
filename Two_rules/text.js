class AddWord {
  constructor(x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    textSize(this.r);
    textAlign(CENTER, CENTER);
    //text("404", this.x, this.y);
    text("LOVE", this.x, this.y);
    pop();
  }
}
