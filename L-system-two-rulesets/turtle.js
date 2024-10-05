class Turtle {
  constructor(lsystemArrays, images) {
    this.lsystemArrays = lsystemArrays;
    for (let i = 0; i < this.lsystemArrays.length; i++) {
      this.lsystemValues = this.lsystemArrays[i];
      this.axiom;
      this.sentence;
      this.rules = {};
      this.values = this.lsystemValues[0];
      // Shape Data
      this.shape_ui = this.lsystemValues[1];
      this.shapeName;
      this.shapeValues;
      this.shape; //Shape object
      this.shape_messages = [];
      // Ruleset data
      this.ruleset = this.lsystemValues[2];
      this.lsystemData;
      this.rules;
      this.angle;
      this.lf;
      this.maxLevel;
      this.sentence;
    }
    this.addWarning;
    this.ruleWarnings = [null, null];
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
    shapeChoices,
    currentStrokePalette,
    currentFillPalette,
    sw,
    strokeAlpha,
    fillAlpha,
    index
  ) {
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
        if (shapeChoices[index] == "Word") {
          this.shape.showWord();
        } else if (shapeChoices[index] == "Image") {
          this.shape.showImage(this.images);
        } else if (openShapes.includes(shapeChoices[index])) {
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
        if (shapeChoices[index] != "Image" && shapeChoices[index] != "Text") {
          push();
          this.values[15] = this.values[15] * this.lf;
          this.shape_ui.selectShape(this.shapeValues);
          pop();
        }
      } else if (current == "<") {
        if (shapeChoices[index] != "Image" && shapeChoices[index] != "Text") {
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
    shapeChoices,
    currentStrokePalette,
    currentFillPalette,
    sliderValues,
    index,
    ruleChoices
  ) {
    let values = sliderValues[index];
    let wadj = values[0];
    let hadj = values[1];
    let level = values[2];
    let sw = values[3];
    let strokeAlpha = values[4];
    let fillAlpha = values[5];
    let fractalAngle = values[6];
    this.setRule(lsystemData);
    this.shapeValues = values.slice(-10);
    push();
    this.shape_ui.selectShape(shapeChoices[index], this.shapeValues);
    this.shape = this.shape_ui.shape;
    this.shape_messages.push(this.shape_ui.message);
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);
    // I have imposed some limits on the level to keep the sketch from freezing
    if (level > this.maxLevel) {
      this.addWarning = true;
      this.levelWarning(
        1,
        shapeChoices,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha,
        index, // index of lsystem
        ruleChoices
      );
    } else {
      //this.addWarning = false;
      this.ruleWarnings[index] = null;
      for (let i = 0; i < level; i++) {
        this.generate();
      }
      this.turtle(
        1,
        shapeChoices,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha,
        index
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
        shapeChoices,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha,
        index,
        ruleChoices
      );
    } else {
      this.ruleWarnings[index] = null;
      for (let i = 0; i < level; i++) {
        this.generate();
      }
      this.turtle(
        0,
        shapeChoices,
        currentStrokePalette,
        currentFillPalette,
        sw,
        strokeAlpha,
        fillAlpha,
        index
      );
    }
    pop();
  }

  addLsystem(
    lsystemData,
    shapeChoices,
    colorMode,
    currentStrokePalette,
    currentFillPalette,
    sliderValues,
    index,
    ruleChoices
  ) {
    this.setRule(lsystemData);
    let values = sliderValues[index];
    let wadj = values[0];
    let hadj = values[1];
    let level = values[2];
    let sw = values[3];
    let strokeAlpha = values[4];
    let fillAlpha = values[5];
    let fractalAngle = values[6];
    this.shapeValues = values.slice(-10);

    this.shape_ui.selectShape(shapeChoices[index], this.shapeValues);
    this.shape = this.shape_ui.shape;
    this.shape_messages.push(this.shape_ui.message);
    //this.ruleWarnings[index] = null; // reset warnings
    push();
    translate(width * wadj, height * hadj);
    rotate(fractalAngle);
    if (colorMode != null) {
      if (level > this.maxLevel) {
        this.levelWarning(
          colorMode,
          shapeChoices,
          currentStrokePalette,
          currentFillPalette,
          sw,
          strokeAlpha,
          fillAlpha,
          index,
          ruleChoices
        );
      } else {
        for (let i = 0; i < level; i++) {
          this.generate();
        }
        this.turtle(
          colorMode,
          shapeChoices,
          currentStrokePalette,
          currentFillPalette,
          sw,
          strokeAlpha,
          fillAlpha,
          index
        );
      }
      pop();
    }
    if (shapeChoices[index] == "Word") {
      this.addText(currentFillPalette);
    }
  }

  levelWarning(
    colorMode,
    shapeChoices,
    currentStrokePalette,
    currentFillPalette,
    sw,
    strokeAlpha,
    fillAlpha,
    index,
    ruleChoices
  ) {
    let warning =
      "The level can't be > " +
      `${this.maxLevel}` +
    " with the " + `${ruleChoices[index]}` + " rulset.";
    this.ruleWarnings[index] = warning;
    //console.log(this.ruleWarnings)
    for (let i = 0; i < this.maxLevel; i++) {
      this.generate();
    }
    this.turtle(
      colorMode,
      shapeChoices,
      currentStrokePalette,
      currentFillPalette,
      sw,
      strokeAlpha,
      fillAlpha,
      index
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
