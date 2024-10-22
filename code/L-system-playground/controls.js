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
      sliderValues // values to initialize sliders
    );
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
    this.addP5Grain.position(250, 405);
    this.addP5Grain.style("color", "white");
    this.removeRuleset = createCheckbox("Remove second ruleset", false);
    this.removeRuleset.position(900, 10);
    this.removeRuleset.style("color", "white");

    //this.values = [];
  }

  setPalettes(stroke, fill) {
    this.strokeDropdown.setPalette(stroke);
    this.fillDropdown.setPalette(fill);
    return [this.strokeDropdown.palette, this.fillDropdown.palette];
  }

  // Return instance of dropdowns
  returnDropdowns() {
    let dropdowns = {
      rulesetDropdown: this.rulesetDropdown,
      shapeDropdown: this.shapeDropdown,
      strokeDropdown: this.strokedropdown,
      fillDropdown: this.filldropdown
    };
  return dropdowns;
  }

  returnButtons() {
    return this.resetButton;
  }

  returnCheckboxes() {
    let checkBoxes = {
      addStroke: this.addStroke,
      fillShape: this.fillShape,
      addp5Grain: this.addP5Grain,
      removeRuleset: this.removeRuleset

    }
    return checkBoxes;
  }
}
