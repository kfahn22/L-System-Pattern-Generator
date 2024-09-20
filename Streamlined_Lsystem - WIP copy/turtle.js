class Turtle {
  constructor(
    strokePalette,
    fillPalette,
    fillShape,
    addStroke,
    shape_ui,
    values,
    ruleset
  ) {
    this.strokePalette = strokePalette;
    this.fillPalette = fillPalette;
    this.fillShape = fillShape;
    this.addStroke = addStroke;
    this.shape_ui = shape_ui;
    this.shape = this.shape_ui.shape;
    this.shapename = this.shape_ui.dropdown.value();
    this.values = values;
    this.ruleset = ruleset;
    this.ruleset.selectRule();
    this.lsystemValues = this.ruleset.setRule();
    this.rules = this.lsystemValues[0];
    this.angle = this.lsystemValues[1];
    this.lf = this.lsystemValues[2];
    this.maxLevel = this.lsystemValues[3];
    this.sentence = this.lsystemValues[4];
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
    let length = this.values[3];

    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      if (current === "F") {
        console.log(this.shapename)
        let openShapes = [
          "Arc",
          "Archimedes Spiral",
          "Cornu Spiral"
        ];
        push();
        //translate(0, 0);
        // Draw the shape on the canvas
        if (openShapes.includes(this.shapename)) {
          noFill();
          random(strokePalette);
          this.shape.openShow();
        } else {
          this.adjustFill(strokePalette, fillPalette);
          this.shape.show();
        }
        pop();
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
        length = length * this.lf;
        //pickShape(shapeDropdown.value());
        pop();
      } else if (current == "<") {
        push();
        length = length / this.lf;
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

  addLsystem(strokePalette, fillPalette) {
    let wadj = this.values[0];
    let hadj = this.values[1];
    let level = this.values[2];
    push();
    translate(width * wadj, height * hadj);
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

  showShape() {
    //let shapeName = this.dropdown.value();
    let openShapes = [
      // "half_arc",
      "Arc",
      "Archimedes Spiral",
      "Cornu Spiral",
      // "spiral",
      // "zigzig",
    ];
    //push();
    //translate(0, 0);
    // Draw the shape on the canvas
    if (openShapes.includes(this.shapename)) {
      this.shape.openShow();
    } else {
      this.shape.show();
    }
    //pop();
  }

  adjustFill(fillPalette, strokePalette) {
    let fp = random(fillPalette);
    let sp = random(strokePalette);
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
}
