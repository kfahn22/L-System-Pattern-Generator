class Turtle {
  constructor(shape_ui, values, shapeValues, ruleset, fillShape, addStroke) {
    this.shape_ui = shape_ui;
    this.shape = this.shape_ui.shape;
    this.values = values;
    this.shapeValues = shapeValues;
    this.shapename = this.values[1];
    this.ruleset = ruleset;
    this.ruleset.selectRule(this.values[0]);
    this.lsystemValues = this.ruleset.setRule();
    this.rules = this.lsystemValues[0];
    this.angle = this.lsystemValues[1];
    this.lf = this.lsystemValues[2];
    this.maxLevel = this.lsystemValues[3];
    this.sentence = this.lsystemValues[4];
    this.fillShape = fillShape;
    this.addStroke = addStroke;
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
    let length = this.values[15];
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
        translate(length, 0);
      } else if (current === "f") {
        translate(length, 0);
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
        this.values[15] = this.values[15] * this.lf;
        this.shape_ui.selectShape(this.shapeValues);
        pop();
      } else if (current == "<") {
        push();
        this.values[15] = this.values[15] / this.lf;
        this.shape_ui.selectShape(this.shapeValues);
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
    console.log(this.values)
    let wadj = this.values[8];
    let hadj = this.values[9];
    let level = this.values[10];
    let fractalAngle = this.values[14];
    push();
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);
    if (level > this.maxLevel) {
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
      for (let i = 0; i < level; i++) {
        this.generate();
      }
      this.turtle(strokePalette, fillPalette);
    }
    pop();
  }

  adjustFill(strokePalette, fillPalette) {
    let sp = random(strokePalette);
    let fp = random(fillPalette);
    let sw = this.values[11];
    // Update alpha values
    sp[3] = this.values[12]; // strokeAlpha
    fp[3] = this.values[13]; // fillAlpha
    if (this.fillShape === true && this.addStroke === true) {
      strokeWeight(sw);
      stroke(sp);
      fill(fp);
    } else if (this.fillShape === false && this.addStroke === true) {
      noFill();
      strokeWeight(sw);
      stroke(sp);
    } else if (this.fillShape === true && this.addStroke === false) {
      strokeWeight(sw);
      noStroke();
      fill(fp);
    }
  }

  addText(fillPalette) {
    push();
    let length = this.values[14];
    let shapeScale = this.values[15];
    let s = length * shapeScale;
    translate(width / 2, height / 2);
    fill(random(fillpalette));
    textSize(2 * s);
    text("IS ALL YOU NEED", 0, 0);
    pop();
  }
}
