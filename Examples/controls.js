class AddControls {
  constructor(posButtons, rulesetData, values) {
    this.values = values;
    this.backgroundDropdown = new PaletteDropdown(
      600,
      30,
      this.values[2],
      "Background Color"
    );
    this.backgrounddropdown = this.backgroundDropdown.dropdown;
    this.strokeDropdown = new PaletteDropdown(
      600,
      80,
      this.values[3],
      "Stroke Color"
    );
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(
      600,
      130,
      this.values[4],
      "Fill Color"
    );
    this.filldropdown = this.fillDropdown.dropdown;
    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      10,
      "group 1",
      this.values[8], // wadj
      this.values[9], // hadj
      this.values[10], // level
      this.values[11], // strokeWeight
      this.values[12], // stroke alpha
      this.values[13], // fill alpha
      this.values[14], // fractal angle
      this.values[15], // length
      this.values[16], // shapeScale
      this.values[17], // a
      this.values[18], // b
      this.values[19], // m
      this.values[20], // n
      this.values[21], // n1
      this.values[22], // n2
      this.values[23], // n3
      this.values[24] // shape angle
    );
    this.sliders = this.sliderGroup.sliders;
    this.sliderValues = this.sliderGroup.getValues();
    this.shape_ui = new ShapeUI(250, this.values[1]);
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(250, 50, rulesetData, this.values[0]);
    this.rulesetDropdown = this.ruleset.dropdown;
    this.resetButton = createButton("Reset");
    this.resetButton.position(posButtons, 10);
    // Checkbox to determine whether shapes have stroke
    this.addStroke = createCheckbox("Add stroke L-system 1", this.values[5]);
    this.addStroke.position(posButtons, 40);
    this.addStroke.style("color", "white");
    // Checkbox to determine whether shapes are filled
    this.fillShape = createCheckbox("Fill L-system 1 shapes", this.values[6]);
    this.fillShape.position(posButtons, 70);
    this.fillShape.style("color", "white");
    // Whether to add P5 Grain library
    // Will slow down the render so I recommend keeping to false most of the time
    this.addP5Grain = createCheckbox("Add p5.Grain", this.values[7]);
    this.addP5Grain.position(posButtons, 100);
    this.addP5Grain.style("color", "white");
    this.showExample = createCheckbox("Display examples", true);
    this.showExample.position(posButtons, 130);
    this.showExample.style("color", "white");
    //this.colorMode = null;

    // Ensure checkboxes reflect initial values
    this.updateCheckboxes();
  }

  setPalettes(bkgroundChoice, strokeChoice, fillChoice) {
    this.backgroundDropdown.setPalette(bkgroundChoice);
    this.strokeDropdown.setPalette(strokeChoice);
    this.fillDropdown.setPalette(fillChoice);
    return [
      this.backgroundDropdown.palette,
      this.strokeDropdown.palette,
      this.fillDropdown.palette,
    ];
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

  returnDropdowns() {
    return [
      this.rulesetDropdown,
      this.shapeDropdown,
      this.backgrounddropdown,
      this.strokedropdown,
      this.filldropdown,
    ];
  }

  returnButtons() {
    return this.resetButton;
  }

  updateCheckboxes() {
    this.addStroke.checked(false);
    this.addStroke.checked(this.values[5]);

    this.fillShape.checked(false);
    this.fillShape.checked(this.values[6]);

    this.addP5Grain.checked(false);
    this.addP5Grain.checked(this.values[7]);
  }

  returnCheckboxes() {
    return [this.addStroke, this.fillShape, this.addP5Grain, this.showExample];
  }
}
