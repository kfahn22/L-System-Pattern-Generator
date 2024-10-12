class Turtle {
  constructor(
    values,
    shape_ui,
    ruleset,
    strokePalette,
    fillPalette,
    colorMode,
    images
  ) {
    // Refer to the example-dropdown.js file setExample() function for variables in values array
    this.values = values;
    // Lsystem Data
    this.ruleset = ruleset; // Ruleset object
    this.ruleset.selectRule(this.values[0]);
    this.lsystemValues = this.ruleset.setRule();
    this.rules = this.lsystemValues[0];
    this.angle = this.lsystemValues[1];
    this.lf = this.lsystemValues[2];
    this.maxLevel = this.lsystemValues[3];
    this.sentence = this.lsystemValues[4];
    // Shape data
    this.shape_ui = shape_ui; // Shape object
    this.shapeName = this.values[1];
    this.shapeValues = this.values.slice(-11);
    this.shape_ui.selectShape(this.shapeName, this.shapeValues);
    this.shape = this.shape_ui.shape; // Shape object
    // Palettes variables
    this.strokePalette = strokePalette;
    this.fillPalette = fillPalette;
    this.addStroke = this.values[5];
    this.fillShape = this.values[6];
    this.colorMode = colorMode;
    this.images = images;
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

  turtle(colorMode) {
    let length = this.values[15];
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      this.adjustFill(colorMode);
      let openShapes = ["Arc", "Archimedes Spiral", "Cornu Spiral", "Lissajous", "Spiral"];
      if (current === "F") {
        // Draw the shape/word on the canvas
        if (this.shapeName == "Word") {
          this.shape.showWord();
        } else if (this.shapeName == "Image") {
          this.shape.showImage(this.images);
        } else if (openShapes.includes(this.shapeName)) {
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
        if (this.shapeName != "Image" && this.shapeName != "Text") {
          push();
          this.values[15] = this.values[15] * this.lf;
          this.shape_ui.selectShape(this.shapeValues);
          pop();
        }
      } else if (current == "<") {
        if (this.shapeName != "Image" && this.shapeName != "Text") {
          push();
          this.values[15] = this.values[15] / this.lf;
          this.shape_ui.selectShape(this.shapeValues);
          pop();
        }
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

  // When both stroke and fill are used, they are rendered separately
  addLsystemStrokeFill() {
    let wadj = this.values[8];
    let hadj = this.values[9];
    let level = this.values[10];
    let fractalAngle = this.values[14];
    push();
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);
      for (let i = 0; i < level; i++) {
        this.generate();
      }
      this.turtle(1);
    pop();
    // We need to reset sentence else the level is doubled
    this.sentence = this.lsystemValues[4];
    push();
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);
      for (let i = 0; i < level; i++) {
        this.generate();
      }
      this.turtle(0);
    pop();
  }

  addLsystem(colorMode) {
    let wadj = this.values[8];
    let hadj = this.values[9];
    let level = this.values[10];
    let fractalAngle = this.values[14];
    push();
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);
    if (colorMode != null) {
        for (let i = 0; i < level; i++) {
          this.generate();
        }
        this.turtle(colorMode);
      }
      pop();
    if (this.shapeName == "Word") {
      this.addText();
    }
  }

  adjustFill(colorMode) {
    if (colorMode == 0) {
      this.setStroke();
    } else if (colorMode == 1) {
      this.setFill();
    }
  }

  setFill() {
    let fp = random(this.fillPalette);
    fp[3] = this.values[13]; // fillAlpha
    noStroke();
    fill(fp);
  }

  setStroke() {
    let sp = random(this.strokePalette);
    let sw = this.values[11];
    // Update alpha values
    sp[3] = this.values[12]; // strokeAlpha
    noFill();
    strokeWeight(sw);
    stroke(sp);
  }

  // Haven't reimplemented this yet
  addText() {
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(random(this.fillPalette));
    textSize(17);
    textAlign(CENTER, CENTER);
    text("TODAY IS A GOOD DAY!", 0, 0);
    pop();
  }
}
