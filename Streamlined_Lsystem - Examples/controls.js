class AddControls {
  constructor(posButtons, rulesetData, values) {
    this.values = values;
    this.backgroundDropdown = new PaletteDropdown(
      450,
      30,
      this.values[2],
      "Background Color"
    );
    this.backgrounddropdown = this.backgroundDropdown.dropdown;
    this.strokeDropdown = new PaletteDropdown(
      450,
      80,
      this.values[3],
      "Stroke Color"
    );
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(
      450,
      130,
      this.values[4],
      "Fill Color"
    );

    this.filldropdown = this.fillDropdown.dropdown;
    this.shape_ui = new ShapeUI(250, this.values[1]);
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(250, 10, rulesetData, this.values[0]);
    // this.ruleset.selectRule(this.values[0]);
    // this.lsystemValues = this.ruleset.setRule();
    this.rulesetDropdown = this.ruleset.dropdown;
    // checkbox for filling shape
    this.fillShape = createCheckbox("Fill L-system 1 shapes", this.values[5]);
    this.resetButton = createButton("Reset");
    this.resetButton.position(posButtons, 90);
    this.fillShape.position(posButtons, 120);
    this.fillShape.style("color", "white");
    // Checkbox to determine whether shapes have stroke
    this.addStroke = createCheckbox("Add stroke L-system 1", this.values[6]);
    this.addStroke.position(posButtons, 150);
    this.addStroke.style("color", "white");
    // Whether to add P5 Grain library
    // Will slow down the render so I recommend keeping to false most of the time
    this.addGrain = createCheckbox("Add grain", this.values[7]);
    this.addGrain.position(posButtons, 180);
    this.addGrain.style("color", "white");
    this.showExample = createCheckbox("Display examples", true);
    this.showExample.position(posButtons, 200);
    this.showExample.style("color", "white");
    this.colorMode = null;
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

  setColorMode() {
    let colorMode = null;
    if (this.values[6] === true && this.values[5] === false) {
      colorMode = 0;
    } else if (this.values[6] === false && this.values[5] === true) {
      colorMode = 1;
    } else if (this.values[6] === true && this.values[5] === true) {
      colorMode = 2;
    }
    //console.log(this.values[5], this.values[6], colorMode)
    return colorMode;
  }

  // setColorMode() {
  //   if (this.values[6] == true && this.values[5] == false) {
  //     this.colorMode = 0;
  //   } else if (this.values[6] == false && this.values[5] == true) {
  //     this.colorMode = 1;
  //   } else if (this.values[6] == true && this.values[5] == true) {
  //     this.colorMode = 2;
  //   }
  //   //console.log(this.colorMode)
  // }

  // returnColorPalettes() {
  //   return [
  //     this.backgroundDropdown.palette,
  //     this.strokeDropdown.palette,
  //     this.fillDropdown.palette,
  //   ];
  // }

  returnDropdowns() {
    return [
      this.backgrounddropdown,
      this.strokedropdown,
      this.filldropdown,
      this.shapeDropdown,
      this.rulesetDropdown,
    ];
  }

  returnButtons() {
    return this.resetButton;
  }

  returnCheckboxes() {
    return [this.fillShape, this.addStroke, this.addGrain];
  }
}
