class Turtle {
  constructor(fillShape, addStroke, shape_ui, values, ruleset) {
    this.fillShape = fillShape;
    this.addStroke = addStroke;
    this.shape_ui = shape_ui;
    this.shape = this.shape_ui.shape;
    this.shapename = this.shape_ui.dropdown.value();
    this.values = values;
    this.wadj = this.values[0];
    this.hadj = this.values[1];
    this.level = this.values[2];
    this.length = this.values[3];
    this.sw = this.values[4];
    this.a = this.values[5];
    this.shapeScale = this.values[6];
    this.fractalAngle = radians(this.values[7]);
    this.shapeAngle = radians(this.values[8]);
    this.a = this.values[9];
    this.b = this.values[10];
    this.m = this.values[11];
    this.n = this.values[12];
    this.n1 = this.values[13];
    this.n2 = this.values[14];
    this.n3 = this.values[15];
    this.ruleset = ruleset;
    this.ruleset.selectRule();
    this.lsystemValues = this.ruleset.setRule();
    this.rules = this.lsystemValues[0];
    this.angle = this.lsystemValues[1];
    this.lf = this.lsystemValues[2];
    this.maxLevel = this.lsystemValues[3];
    this.sentence = this.lsystemValues[4];
    this.addWarning = false;
    this.warning = null;
  }

  generate() {
    let nextSentence = "";
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      let found = false;
      for (let key in this.rules) {
        if (current === key) {
          found = true;
          nextSentence += this.rules[key];
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    this.sentence = nextSentence;
  }

  turtle(strokePalette, fillPalette) {
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      if (current === "F") {
        let openShapes = ["Arc", "Archimedes Spiral", "Cornu Spiral"];
        this.adjustFill(strokePalette, fillPalette);
        // Draw the shape on the canvas
        if (openShapes.includes(this.shapename)) {
          this.shape.openShow();
        } else {
          this.shape.show();
        }
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
        this.values[3] = this.values[3] * this.lf;
        //console.log(this.values)
        this.shape_ui.selectShape(this.values);
        pop();
      } else if (current == "<") {
        push();
        this.values[3] = this.values[3] / this.lf;
        this.shape_ui.selectShape(this.values);
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
        fill(random(fillPalette));
        endShape();
      }
    }
  }

  addLsystem(strokePalette, fillPalette) {
    push();
    translate(width * this.wadj, height * this.hadj);
    rotate(this.fractalAngle);
    if (this.level > this.maxLevel) {
      this.warning =
        "The level cannot be greater " +
        `${this.maxLevel}` +
        " with this rule-set.";
      this.addWarning = true;

      for (let i = 0; i < this.maxLevel; i++) {
        this.generate();
      }
      this.turtle(strokePalette, fillPalette);
    } else {
      for (let i = 0; i < this.level; i++) {
        this.generate();
      }
      this.turtle(strokePalette, fillPalette);
    }
    pop();
  }

  adjustFill(strokePalette, fillPalette) {
    let sp = random(strokePalette);
    let fp = random(fillPalette);
    let sw = this.values[4];
    let a = this.values[5];
    fp[3] = a;
    sp[3] = a;
    if (
      this.fillShape.checked() === true &&
      this.addStroke.checked() === true
    ) {
      strokeWeight(sw);
      stroke(sp);
      fill(fp);
    } else if (
      this.fillShape.checked() === false &&
      this.addStroke.checked() === true
    ) {
      noFill();
      strokeWeight(sw);
      stroke(sp);
    } else if (
      this.fillShape.checked() === true &&
      this.addStroke.checked() === false
    ) {
      strokeWeight(sw);
      noStroke();
      fill(fp);
    }
  }

  addText(fillPalette) {
    push();
    let s = this.length * this.shapeScale;
    translate(width / 2, height / 2);
    fill(random(fillpalette));
    textSize(2 * s);
    text("IS ALL YOU NEED", 0, 0);
    pop();
  }
}
