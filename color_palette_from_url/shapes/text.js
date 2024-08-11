class addWord {
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
    //text("LOVE", this.x - this.r / 2, this.y - this.r / 2);
    //text("404", this.x - this.r / 2, this.y - this.r / 2);
     text("LOVE", this.x, this.y);
    pop();
  }
}
