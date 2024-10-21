class Turtle {
  constructor(lsystemArrays, images) {
    this.lsystemArrays = lsystemArrays;
    //console.log(lsystemArrays)
    for (let i = 0; i < this.lsystemArrays.length; i++) {
      this.lsystemValues = this.lsystemArrays[i];
      this.axiom;
      this.sentence;
      this.rules = {};
      this.values = this.lsystemValues["LsystemValues"];
      // Shape Data
      this.shape_ui = this.lsystemValues["Shape_UI"];
      this.shapeName;
      this.shapeValues;
      this.shape; //Shape object
      this.shape_messages = [];
      // Ruleset data
      this.ruleset = this.lsystemValues["ruleset"];
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

  turtle(data, colorParams) {
    let shapeChoices = data["shapeChoices"];
    let index = data["index"];
    let colorMode = data["colorMode"];
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
    // console.log(sliderValues)
    let systemValues = sliderValues[index]["systemValues"];

    let shapeValues = sliderValues[index]["shapeValues"];
    let colorValues = sliderValues[index]["colorValues"];
    let wadj = systemValues["wadj"];
    let hadj = systemValues["hadj"];
    let level = systemValues["level"];
    let fractalAngle = systemValues["fractalAngle"];
    this.length = systemValues["length"];
    //console.log(this.length)
    this.shapeValues = {
      length: systemValues["length"],
      shapeScale: shapeValues["shapeScale"],
      a: shapeValues["a"],
      b: shapeValues["b"],
      m: shapeValues["m"],
      n1: shapeValues["n1"],
      n2: shapeValues["n2"],
      n3: shapeValues["n3"],
      n: shapeValues["n"],
      d: shapeValues["d"],
      shapeAngle: shapeValues["shapeAngle"],
    };

    // We will send some values to the render/turtle functions
    let turtleData = {
      shapeChoices: shapeChoices,
      index: index,
      length: systemValues["length"],
      colorMode: colorMode,
    };
    let colorParams = [];
    colorParams.push(currentStrokePalette);
    colorParams.push(colorValues["strokeWeight"]); // sw
    colorParams.push(colorValues["strokeAlpha"]); // strokeAlpha
    colorParams.push(currentFillPalette);
    colorParams.push(colorValues["fillAlpha"]); // fillAlpha
    this.shape_ui.selectShape(shapeChoices[index], this.shapeValues);
    this.shape = this.shape_ui.shape;
    this.shape_messages.push(this.shape_ui.message);
    push();
    translate(width * wadj, height * hadj);
    rotate(radians(fractalAngle));
    if (colorMode != 2) {
      if (level > this.maxLevel) {
        systemValues["level"] = this.maxLevel;
        this.levelWarning(
          systemValues["level"],
          turtleData,
          colorParams,
          ruleChoices
        );
      } else {
        this.render(systemValues["level"], turtleData, colorParams);
      }
      pop();
    } else {
      // With both stroke and fill, add stroke after fill so stroke doesn't show through fill (when alpha < 255)
      //this.setFill(currentFillPalette, fillAlpha);
      turtleData["colorMode"] = 1; // Set colorMode to fill shape
      if (level > this.maxLevel) {
        this.addWarning = true;
        systemValues["level"] = this.maxLevel;
        this.levelWarning(
          systemValues["level"],
          turtleData,
          colorParams,
          ruleChoices
        );
      } else {
        this.ruleWarnings[index] = null;
        this.render(systemValues["level"], turtleData, colorParams);
      }
      pop();
      // We need to reset sentence so level is not doubled
      this.setRule(lsystemData);
      turtleData["colorMode"] = 0; // Set colorMode to 0 to add stroke after fill
      push();
      translate(width * wadj, height * hadj);
      rotate(radians(fractalAngle));
      //this.setStroke(currentStrokePalette, sw, strokeAlpha);
      if (level > this.maxLevel) {
        level = this.maxLevel;
        this.levelWarning(level, turtleData, colorParams, ruleChoices);
      } else {
        this.ruleWarnings[index] = null;
        this.render(level, turtleData, colorParams);
      }
      pop();
    }

    // If the "shape" is not a shape but text it is added differently
    if (shapeChoices[index] == "Word") {
      this.addText(currentFillPalette);
    }
  }

  // Add warnings if level gets too high for certain rulesets so sketch doesn't freeze
  levelWarning(level, turtleData, colorParams, ruleChoices) {
    let index = turtleData["index"];
    let warning =
      "The level can't be > " +
      `${this.maxLevel}` +
      " with the " +
      `${ruleChoices[index]}` +
      " rulset.";
    this.ruleWarnings[index] = warning;
    this.render(level, turtleData, colorParams);
  }

  render(level, turtleData, colorParams) {
    for (let i = 0; i < level; i++) {
      this.generate();
    }
    this.turtle(turtleData, colorParams);
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
