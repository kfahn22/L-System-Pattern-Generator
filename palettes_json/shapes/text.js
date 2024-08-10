// https://docs.google.com/forms/d/e/1FAIpQLSfgYP4tYNvz4aeYvQyUla318PlZvDAA-rWsGYVFIB_sGUSV_w/viewform?pli=1

class addText {
  constructor(x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
   // this.points = [];
  }

//   addPoints() {
//     let n = 4;
//     for (let theta = 0; theta < TWO_PI; theta += 0.1) {
//       let x = this.r * cos(theta);
//       let y = this.r * sin(theta) * pow(sin(theta / 2), n);
//       this.points.push(createVector(x, y));
//     }
//   }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    textSize(this.r);
    text('404', this.x - this.r/2, this.y - this.r/2);
    // beginShape();
    // for (let p of this.points) {
    //   vertex(p.x, p.y);
    // }
    // endShape(CLOSE);
    pop();
  }
}
