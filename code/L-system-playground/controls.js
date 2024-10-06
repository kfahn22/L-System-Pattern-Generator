class AddControls {
  constructor(pos, posSliders, rulesetData) {
    this.backgroundDropdown = new PaletteDropdown(
      pos,
      145,
      "black",
      "Background Color"
    );
    this.backgrounddropdown = this.backgroundDropdown.dropdown;
    this.strokeDropdown = new PaletteDropdown(
      pos,
      200,
      "orange",
      "Stroke Color"
    );
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(
      pos,
      255,
      "purplePalette",
      "Fill Color"
    );
    this.filldropdown = this.fillDropdown.dropdown;
    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      posSliders,
      "group 1",
      0.03, // wadj
      0.5, // hadj
      3, // level
      1, // strokeWeight
      220, // stroke alpha
      150, // fill alpha
      0, // fractal angle
      0.024 * width, // length
      0.4, // shapeScale
      3.8, // a
      1, // b
      8, // m
      1, // n1
      0.8, // n2
      1, // n3
      1, // n
      0 // shape angle
    );
    this.sliders = this.sliderGroup.sliders;
    this.sliderValues = this.sliderGroup.getValues();
    this.shape_ui = new ShapeUI(pos, 90, "Supershape", "Shape");
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(
      pos,
      35,
      rulesetData,
      "ADH231a",
      "L-system Ruleset"
    );
    this.rulesetDropdown = this.ruleset.dropdown;
    this.resetButton = createButton("Reset");
    this.resetButton.position(pos, 300);
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
    //this.colorMode = null;

    // Ensure checkboxes reflect initial values
    //this.updateCheckboxes();
    this.values = [];
  }

  setPalettes(background, stroke, fill) {
    this.backgroundDropdown.setPalette(background);
    this.strokeDropdown.setPalette(stroke);
    this.fillDropdown.setPalette(fill);
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

  // Return instance of dropdowns
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

  // updateCheckboxes() {
  //   this.addStroke.checked(false);
  //   this.addStroke.checked(this.values[5]);

  //   this.fillShape.checked(false);
  //   this.fillShape.checked(this.values[6]);

  //   this.addP5Grain.checked(false);
  //   this.addP5Grain.checked(this.values[7]);
  // }

  returnCheckboxes() {
    return [this.addStroke, this.fillShape, this.addP5Grain];
  }

  // Get values from dropdowns, checkboxes, and sliders
  getValues() {
    this.values = [];
    this.values[0] = this.rulesetdropdown.selected();
    this.values[1] = this.shapedropdown.selected();
    this.values[2] = this.backgrounddropdown.selected();
    this.values[3] = this.strokedropdown.selected();
    this.values[4] = this.filldropdown.selected();
    this.values[5] = this.addStroke.checked();
    this.values[6] = this.fillShape.checked();
    this.values[7] = this.addP5Grain.checked();
    let sliderValues = this.sliderGroup.getValues();
    this.sliderGroup.updateLabels();
    for (let s of sliderValues) {
      this.values.push(s);
    }
  }
}
