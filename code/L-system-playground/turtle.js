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
    this.length;
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

  turtle(params, colorParams) {
    let shapeChoices = params[0];
    let index = params[1];
    let colorMode = params[3];
    for (let i = 0; i < this.sentence.length; i++) {
      this.adjustFill(colorMode, colorParams);
      let current = this.sentence.charAt(i);
      // Catch-all array for arcs, spirals, lissajous, zigzag
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
        if (shapeChoices[index] != "Image" && shapeChoices[index] != "Text") {
          push();
          this.length = this.length * this.lf;
          // We need to update length and recall selectShape
          this.shapeValues[0] = this.length;
          this.shape_ui.selectShape(shapeChoices[index], this.shapeValues);
          this.shape = this.shape_ui.shape;
          pop();
        }
      } else if (current == "<") {
        if (shapeChoices[index] != "Image" && shapeChoices[index] != "Text") {
          push();
          this.length = this.length / this.lf;
          this.shapeValues[0] = this.length;
          this.shape_ui.selectShape(shapeChoices[index], this.shapeValues);
          this.shape = this.shape_ui.shape;
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
        let fillAlpha = colorParams[4];
        let fillPalette = colorParams[3];
        let c = random(fillPalette);
        c[3] = fillAlpha;
        noStroke();
        fill(c);
        endShape();
      }
    }
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
    let fractalAngle = values[6];
    this.length = values[7];
    this.shapeValues = values.slice(-11);

    // We will send some values to the render/turtle functions
    let params = [];
    params.push(level);
    params.push(shapeChoices);
    params.push(index); //2
    params.push(length);
    params.push(colorMode);
    let colorParams = [];
    colorParams.push(currentStrokePalette);
    colorParams.push(values[3]); // sw
    colorParams.push(values[4]); // strokeAlpha
    colorParams.push(currentFillPalette);
    colorParams.push(values[5]); // fillAlpha

    this.shape_ui.selectShape(shapeChoices[index], this.shapeValues);
    this.shape = this.shape_ui.shape;
    this.shape_messages.push(this.shape_ui.message);
    push();
    translate(width * wadj, height * hadj);
    rotate(radians(fractalAngle));
    if (colorMode != 2) {
      if (level > this.maxLevel) {
        params[0] = this.maxLevel;
        this.levelWarning(params, colorParams, ruleChoices);
      } else {
        this.render(params, colorParams);
      }
      pop();
    } else {
      // With both stroke and fill, add stroke after fill so stroke doesn't show through fill (when alpha < 255)
      //this.setFill(currentFillPalette, fillAlpha);
      params[4] = 1; // Set colorMode to fill shape
      if (level > this.maxLevel) {
        this.addWarning = true;
        params[0] = this.maxLevel;
        this.levelWarning(params, colorParams, ruleChoices);
      } else {
        this.ruleWarnings[index] = null;
        this.render(params, colorParams);
      }
      pop();
      // We need to reset sentence so level is not doubled
      this.setRule(lsystemData);
      params[4] = 0; // Set colorMode to 0 to add stroke after fill
      push();
      translate(width * wadj, height * hadj);
      rotate(radians(fractalAngle));
      //this.setStroke(currentStrokePalette, sw, strokeAlpha);
      if (level > this.maxLevel) {
        params[0] = this.maxLevel;
        this.levelWarning(params, colorParams, ruleChoices);
      } else {
        this.ruleWarnings[index] = null;
        this.render(params, colorParams);
      }
      pop();
    }

    // If the "shape" is not a shape but text it is added differently
    if (shapeChoices[index] == "Word") {
      this.addText(currentFillPalette);
    }
  }

  // Add warnings if level gets too high for certain rulesets so sketch doesn't freeze
  levelWarning(params, colorParams, ruleChoices) {
    let index = params[2];
    let warning =
      "The level can't be > " +
      `${this.maxLevel}` +
      " with the " +
      `${ruleChoices[index]}` +
      " rulset.";
    this.ruleWarnings[index] = warning;
    this.render(params, colorParams);
  }

  render(params, colorParams) {
    let level = params[0];
    let turtleParams = params.slice(-4);
    for (let i = 0; i < level; i++) {
      this.generate();
    }
    this.turtle(turtleParams, colorParams);
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

  adjustFill(colorMode, colorParams) {
    let strokePalette = colorParams[0];
    let sw = colorParams[1];
    let strokeAlpha = colorParams[2];
    let fillPalette = colorParams[3];
    let fillAlpha = colorParams[4];
    if (colorMode == 0) {
      this.setStroke(strokePalette, sw, strokeAlpha);
    } else if (colorMode == 1) {
      this.setFill(fillPalette, fillAlpha);
      // } else if (colorMode == 2) {
      //   this.setFill(fillPalette, fillAlpha);
    }
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
