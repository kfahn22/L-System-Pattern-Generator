class Turtle {
  constructor(sentence, length, angle, lf, sw, alpha, strokePalette, fillPalette, fillShape, addStroke, shape_ui) {
    this.sentence = sentence;
    this.strokePalette = strokePalette;
    this.fillPalette = fillPalette;
    this.sw = sw;
    this.alpha = alpha;
    this.length = length;
    this.angle = angle;
    this.lf = lf;
    this.fillShape = fillShape;
    this.addStroke = addStroke;
    this.shape_ui = shape_ui;
  }

  generate() {
    let nextSentence = "";
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      let found = false;
      for (let key in rules) {
        if (current === key) {
          found = true;
          nextSentence += rules[key];
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    this.sentence = nextSentence;
  }

  turtle() {
    this.adjustFill()
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      if (current === "F") {
        this.shape_ui.showShape();
        translate(this.length, 0);
      } else if (current === "f") {
        translate(this.length, 0);
      } else if (current === "+") {
        rotate(this.angle);
      } else if (current === "-") {
        rotate(-this.angle);
      } else if (current == "[") {
        push();
      } else if (current == "]") {
        pop();
      } else if (current == ">") {
        push();
        this.length = this.length * this.lf;
        //pickShape(shapeDropdown.value());
        pop();
      } else if (current == "<") {
        push();
        length = length / lf;
        // pickShape(shapeDropdown.value());
        pop();
      } else if (current == "(") {
        this.angle -= radians(0.1);
      } else if (current == ")") {
        this.angle += radians(0.1);
      } else if (current == "*") {
        rotate(-PI / 2);
      } else if (current == "@") {
        rotate(PI / 2);
      } else if (current == "{") {
        beginShape();
      } else if (current == "}") {
        noStroke();
        fill(random(this.fillPalette));
        endShape();
      }
    }
  }

  adjustFill() {
    let fp = random(this.fillPalette);
    let sp = random(this.strokePalette);
    // let sw = 2;//this.values[4];
    // let a = 150;//this.values[5];
    fp[3] = this.alpha;
    sp[3] = this.alpha;
    if (
      this.fillShape.checked() === true &&
      this.addStroke.checked() === true
    ) {
      strokeWeight(this.sw);
      stroke(sp);
      fill(fp);
    } else if (
      this.fillShape.checked() === false &&
      this.addStroke.checked() === true
    ) {
      noFill();
      strokeWeight(this.sw);
      stroke(sp);
    } else if (
      this.fillShape.checked() === true &&
      this.addStroke.checked() === false
    ) {
      strokeWeight(this.sw);
      noStroke();
      fill(fp);
    }
  }
}
