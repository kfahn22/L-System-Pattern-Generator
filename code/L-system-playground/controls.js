class AddControls {
  constructor(
    index,
    pos,
    sliderValues,
    rulesetData,
    ruleChoice,
    shapeChoice,
    strokeChoice,
    fillChoice
  ) {
    this.strokeDropdown = new PaletteDropdown(
      pos,
      145,
      strokeChoice,
      "Stroke Color"
    );
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(pos, 200, fillChoice, "Fill Color");
    this.filldropdown = this.fillDropdown.dropdown;
    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      sliderValues
      // sliderValues["sliderPos"], // pos
      // sliderValues["colorValues"]["strokeWeight"], // strokeWeight
      // sliderValues["colorValues"]["strokeAlpha"], // stroke alpha
      // sliderValues["colorValues"]["fillAlpha"], // fill alpha
      // sliderValues["systemValues"]["wadj"], // wadj
      // sliderValues["systemValues"]["hadj"], // hadj
      // sliderValues["systemValues"]["level"], // level
      // sliderValues["systemValues"]["fractalAngle"], // fractal angle
      // sliderValues["systemValues"]["length"] * width, // length
      // sliderValues["shapeValues"]["shapeScale"], // shapeScale
      // sliderValues["shapeValues"]["a"], // a
      // sliderValues["shapeValues"]["b"], // b
      // sliderValues["shapeValues"]["m"], // m
      // sliderValues["shapeValues"]["n1"], // n1
      // sliderValues["shapeValues"]["n2"], // n2
      // sliderValues["shapeValues"]["n3"], // n3
      // sliderValues["shapeValues"]["n"], // n,
      // sliderValues["shapeValues"]["d"], // d
      // sliderValues["shapeValues"]["shapeAngle"]
    ); // shape angle
    this.sliders = this.sliderGroup.sliders;
    this.sliderValues = this.sliderGroup.getValues();
    this.shape_ui = new ShapeUI(pos, 90, shapeChoice, "Shape");
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(
      pos,
      35,
      rulesetData,
      ruleChoice,
      "L-system Ruleset"
    );
    this.rulesetDropdown = this.ruleset.dropdown;
    // Checkbox to determine whether shapes have stroke
    this.addStroke = createCheckbox("Add stroke", true);
    this.addStroke.position(pos, 335);
    this.addStroke.style("color", "white");
    // Checkbox to determine whether shapes are filled
    this.fillShape = createCheckbox("Fill shapes", true);
    this.fillShape.position(pos, 370);
    this.fillShape.style("color", "white");
    // Whether to add P5 Grain library
    // Will slow down the render so I recommend keeping to false most of the time
    this.addP5Grain = createCheckbox("Add p5.Grain", false);
    this.addP5Grain.position(pos, 405);
    this.addP5Grain.style("color", "white");
    this.removeRuleset = createCheckbox("Remove second ruleset", false);
    this.removeRuleset.position(900, 10);
    this.removeRuleset.style("color", "white");

    // Ensure checkboxes reflect initial values
    //this.updateCheckboxes();
    this.values = [];
  }

  setPalettes(stroke, fill) {
    this.strokeDropdown.setPalette(stroke);
    this.fillDropdown.setPalette(fill);
    return [this.strokeDropdown.palette, this.fillDropdown.palette];
  }

  // This isn't working -- not sure why
  // Add same code directly in sketch.js and works
  setColorMode() {
    let colorMode = null;
    // Stroke, no fill
    if (this.values[5] === true && this.values[6] === false) {
      colorMode = 0;
      // Fill, no Stroke
    } else if (this.values[5] === false && this.values[6] === true) {
      colorMode = 1;
      //  Both stroke and fill
    } else if (this.values[5] === true && this.values[5] === true) {
      colorMode = 2;
    }
    //console.log(this.values[5], this.values[6], colorMode)
    return colorMode;
  }

  // Return instance of dropdowns
  returnDropdowns() {
    return [
      this.rulesetDropdown,
      this.shapeDropdown,
      this.strokedropdown,
      this.filldropdown,
    ];
  }

  returnButtons() {
    return this.resetButton;
  }

  returnCheckboxes() {
    return [
      this.addStroke,
      this.fillShape,
      this.addP5Grain,
      this.removeRuleset,
    ];
  }

  // Get values from dropdowns, checkboxes, and sliders
  getValues() {
    this.values = [];
    this.values[0] = this.rulesetDropdown.selected();
    this.values[1] = this.shapeDropdown.selected();
    this.values[2] = this.strokedropdown.selected();
    this.values[3] = this.filldropdown.selected();
    this.values[4] = this.addStroke.checked();
    this.values[5] = this.fillShape.checked();
    this.values[6] = this.addP5Grain.checked();
    let sliderValues = this.sliderGroup.getValues();
    this.sliderGroup.updateLabels();
    for (let s of sliderValues) {
      this.values.push(s);
    }
  }
}
