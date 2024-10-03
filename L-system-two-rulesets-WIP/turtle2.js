class Turtle {
  constructor(lsystemArrays, images) {
    this.lsystemArrays = lsystemArrays;
    for (let i = 0; i < this.lsystemArrays.length; i++) {
      this.lsystemValues = this.lsystemArrays[i];
      this.axiom;
      this.sentence;
      this.rules = {};

      //console.log(this.lsystemValues);
      this.values = this.lsystemValues[0];
      // Shape Data
      this.shape_ui = this.lsystemValues[1];
      this.shapeName = this.values[1];
      this.shapeValues = this.values.slice(-10);
      this.shape_ui.selectShape(this.shapeName, this.shapeValues);
      this.shape = this.shape_ui.shape; // Shape object
      // Ruleset data
      this.ruleset = this.lsystemValues[2];
      this.lsystemData; // = this.ruleset.setRule();
      this.rules; // = this.lsystemData[0];
      this.angle; // = this.lsystemData[1];
      this.lf; // = this.lsystemData[2];
      this.maxLevel; // = this.lsystemData[3];
      this.sentence; // = this.lsystemData[4];
    }
    this.addWarning = false;
    this.warning = null;
    this.images = images;
  }

  setRule(pattern) {
    this.axiom = pattern.axiom;
    this.rules = pattern.rules;
    this.angle = radians(pattern.angle);
    this.lf = pattern.length_factor;
    this.maxLevel = pattern.max_Level;
    this.sentence = this.axiom;
  }

  generate() {
    // console.log(this.sentence)
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

  turtle(
    colorMode,
    currentStrokePalette,
    currentFillPalette,
    sw,
    strokeAlpha,
    fillAlpha
  ) {
    //  console.log(currentStrokePalette)
    //  console.log(currentFillPalette)
    let length = this.values[15];
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      this.adjustFill(
        colorMode,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha
      );
      let openShapes = ["Arc", "Cornu Spiral", "Lissajous", "Spiral", "Zigzag"];
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
  addLsystemStrokeFill(
    lsystemData,
    currentStrokePalette,
    currentFillPalette,
    values
  ) {
    //console.log(currentStrokePalette)
    let wadj = values[0];
    let hadj = values[1];
    let level = values[2];
    let sw = values[3];
    let strokeAlpha = values[4];
    let fillAlpha = values[5];
    let fractalAngle = values[6];
    this.setRule(lsystemData);

    push();
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);
    // I have imposed some limits on the level to keep the sketch from freezing
    if (level > this.maxLevel) {
      this.levelWarning(
        1,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha
      );
    } else {
      for (let i = 0; i < level; i++) {
        this.generate();
      }
      this.turtle(
        1,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha
      );
    }
    pop();
    // We need to reset sentence else the level is doubled
    this.setRule(lsystemData);
    push();
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);

    if (level > this.maxLevel) {
      this.levelWarning(
        0,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha
      );
    } else {
      for (let i = 0; i < level; i++) {
        this.generate();
      }
      this.turtle(
        0,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha
      );
    }
    pop();
  }

  addLsystem(
    lsystemData,
    colorMode,
    currentStrokePalette,
    currentFillPalette,
    values
  ) {
    this.setRule(lsystemData);
    let wadj = values[0];
    let hadj = values[1];
    let level = values[2];
    let sw = values[3];
    let strokeAlpha = values[4];
    let fillAlpha = values[5];
    let fractalAngle = values[6];
    push();
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);
    if (colorMode != null) {
      if (level > this.maxLevel) {
        this.levelWarning(
          colorMode,
          currentStrokePalette,
          currentFillPalette,
          sw,
          strokeAlpha,
          fillAlpha
        );
      } else {
        for (let i = 0; i < level; i++) {
          this.generate();
        }
        this.turtle(
          colorMode,
          currentStrokePalette,
          currentFillPalette,
          sw,
          strokeAlpha,
          fillAlpha
        );
      }
      pop();
    }
    if (this.shapeName == "Word") {
      this.addText(currentFillPalette);
    }
  }

  levelWarning(
    colorMode,
    currentStrokePalette,
    currentFillPalette,
    sw,
    strokeAlpha,
    fillAlpha
  ) {
    this.warning =
      "The level cannot be greater " +
      `${this.maxLevel}` +
      " with this rule-set.";
    this.addWarning = true;
    for (let i = 0; i < this.maxLevel; i++) {
      this.generate();
    }
    this.turtle(
      colorMode,
      currentStrokePalette,
      currentFillPalette,
      sw,
      strokeAlpha,
      fillAlpha
    );
  }

  adjustFill(
    colorMode,
    currentStrokePalette,
    currentFillPalette,
    sw,
    strokeAlpha,
    fillAlpha
  ) {
    if (colorMode == 0) {
      this.setStroke(currentStrokePalette, sw, strokeAlpha);
    } else if (colorMode == 1) {
      this.setFill(currentFillPalette, fillAlpha);
    }
  }

  setFill(fillPalette, fillAlpha) {
    let fp = random(fillPalette);
    fp[3] = fillAlpha;
    noStroke();
    fill(fp);
  }

  setStroke(strokePalette, sw, strokeAlpha) {
    let sp = random(strokePalette);
    // Update alpha values
    sp[3] = strokeAlpha;
    noFill();
    strokeWeight(sw);
    stroke(sp);
  }

  addText(fillPalette) {
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(random(fillPalette));
    textSize(17);
    textAlign(CENTER, CENTER);
    text("TODAY IS A GOOD DAY!", 0, 0);
    pop();
  }
}
