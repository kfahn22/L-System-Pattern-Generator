class AddWord {
  constructor(x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
  }

  show() {
    let options = ["HEALTHY", "SAFE", "LOVED", "SAVED", "ACTIVE", "EDUCATED", "FRIENDS"];
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    textSize(this.r);
    textAlign(CENTER, CENTER);
    //text("404", this.x, this.y);
    text(random(options), this.x, this.y);
    pop();
  }
}
