class AddControls {
  constructor(
    id,
    pos,
    sliderValues,
    rulesetData,
    ruleChoice,
    shapeChoice,
    strokeChoice,
    fillChoice
  ) {
    this.strokeDropdown = new PaletteDropdown(strokeChoice, "Stroke Color");
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(fillChoice, "Fill Color");
    this.filldropdown = this.fillDropdown.dropdown;
    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      sliderValues[0], // pos
      id,
      sliderValues[1], // wadj
      sliderValues[2], // hadj
      sliderValues[3], // level
      sliderValues[4], // strokeWeight
      sliderValues[5], // stroke alpha
      sliderValues[6], // fill alpha
      sliderValues[7], // fractal angle
      sliderValues[8] * width, // length
      sliderValues[9], // shapeScale
      sliderValues[10], // a
      sliderValues[11], // b
      sliderValues[12], // m
      sliderValues[13], // n1
      sliderValues[14], // n2
      sliderValues[15], // n3
      sliderValues[16], // n,
      sliderValues[17], // d
      sliderValues[18]
    ); // shape angle

    //console.log(this.sliderGroup)
    this.sliders = this.sliderGroup.sliders;
    this.sliderValues = this.sliderGroup.getValues();
    this.shape_ui = new ShapeUI(shapeChoice, "Shape");
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(
      rulesetData,
      ruleChoice,
      "L-system Ruleset"
    );
    this.rulesetDropdown = this.ruleset.dropdown;
    // Checkbox to determine whether shapes have stroke
    this.addStroke = createCheckbox("Add stroke", true).addClass("custom-checkbox");
    // In your HTML or p5.js sketch, you can add the following CSS:
    let style = document.createElement("style");
    style.innerHTML = `
  .custom-checkbox input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
`;
    document.head.appendChild(style);
    // this.addStroke.type("")
    // this.addStroke.position(pos, 335);
    // this.addStroke.style("color", "white");
    // Checkbox to determine whether shapes are filled
    this.fillShape = createCheckbox("Fill shapes", true).addClass("custom-checkbox");
    // this.fillShape.position(pos, 370);
    // this.fillShape.style("color", "white");
    // Whether to add P5 Grain library
    // Will slow down the render so I recommend keeping to false most of the time
    this.addP5Grain = createCheckbox("Add p5.Grain", false).addClass(
      "custom-checkbox"
    );
    //this.addP5Grain.position(pos, 405);
    // this.addP5Grain.style("color", "white");
    this.removeRuleset = createCheckbox(
      "Remove second ruleset",
      false
    ).addClass("custom-checkbox");
    this.removeRuleset.position(900, 10);
    this.removeRuleset.style("color", "white");
    this.id = id;
    this.idName = `Lsystem${id}`;
    this.values = [];
    this.addtoDiv(pos);
  }

  setPalettes(stroke, fill) {
    // this.backgroundDropdown.setPalette(bkground);
    this.strokeDropdown.setPalette(stroke);
    this.fillDropdown.setPalette(fill);
    return [this.strokeDropdown.palette, this.fillDropdown.palette];
  }

  addtoDiv(pos) {
    let container = createDiv().addClass("controls");
    container.position(pos, 10);
    container.child(this.ruleset.wrapper);
    container.child(this.shape_ui.wrapper);
    container.child(this.strokeDropdown.wrapper);
    container.child(this.fillDropdown.wrapper);
    // We only want to add one background Dropdown
    // if (this.id == 0) {
    //   container.child(this.backgroundDropdown.wrapper);
    // }
    container.child(this.addStroke);
    container.child(this.fillShape);
    container.child(this.addP5Grain);
  }

  // This isn't working -- not sure why
  // Add same code directly in sketch.js and works
  // setColorMode() {
  //   let colorMode = null;
  //   // Stroke, no fill
  //   if (this.values[5] === true && this.values[6] === false) {
  //     colorMode = 0;
  //     // Fill, no Stroke
  //   } else if (this.values[5] === false && this.values[6] === true) {
  //     colorMode = 1;
  //     //  Both stroke and fill
  //   } else if (this.values[5] === true && this.values[5] === true) {
  //     colorMode = 2;
  //   }
  //console.log(this.values[5], this.values[6], colorMode)
  //   return colorMode;
  // }

  // Return instance of dropdowns
  returnDropdowns() {
    return [
      this.rulesetDropdown,
      this.shapeDropdown,
      this.strokedropdown,
      this.filldropdown,
      // this.backgrounddropdown
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
