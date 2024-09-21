class AddControls {
  constructor(posSliders, posDropdown, posButtons, data, shapeChoice, ruleChoice) {
    // Instantiate palette dropdowns
    this.backgroundDropdown = new PaletteDropdown(
      450,
      30,
      "black",
      "Background Color"
    );
    this.backgrounddropdown = this.backgroundDropdown.dropdown;
    this.strokeDropdown = new PaletteDropdown(450, 80, "blue", "Stroke Color");
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(450, 130, "purple", "Fill Color");
    this.filldropdown = this.fillDropdown.dropdown;
    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      posSliders,
      "group 1",
      0.5, // wadj
      0.5, // hadj
      2, // level
      20, // length
      2, // strokeWeight
      150, // alpha
      0.5, //shapeScale
      0, // rotateFractal
      0, // rotateShape
      1, //a
      1, //b
      6, //m
      1, //n
      1, //n1
      1, //n2
      1 //n3
    );
    this.sliders = this.sliderGroup.sliders;
    this.values = this.sliderGroup.getValues();
    this.shape_ui = new ShapeUI(250, shapeChoice, this.values);
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(250, 10, data, ruleChoice);
    this.ruleset.selectRule();
    this.lsystemValues = this.ruleset.setRule();
    this.rulesetDropdown = this.ruleset.dropdown;
    // checkbox for filling shape
    this.fillShape = createCheckbox("Fill L-system 1 shapes", false);
    this.resetButton = createButton("Reset");
    this.resetButton.position(posButtons, 90);
    this.fillShape.position(posButtons, 120);
    this.fillShape.style("color", "white");
    // Checkbox to determine whether shapes have stroke
    this.addStroke = createCheckbox("Add stroke L-system 1", true);
    this.addStroke.position(posButtons, 150);
    this.addStroke.style("color", "white");
    // Whether to add P5 Grain library
    // Will slow down the render so I recommend keeping to false most of the time
    this.addGrain = createCheckbox("Add grain", false);
    this.addGrain.position(posButtons, 180);
    this.addGrain.style("color", "white");
  }

  setPalettes() {
    this.backgroundDropdown.setPalette();
    this.strokeDropdown.setPalette();
    this.fillDropdown.setPalette();
    return [
      this.backgroundDropdown.palette,
      this.strokeDropdown.palette,
      this.fillDropdown.palette,
    ];
  }

  returnDropdowns() {
    return [
      this.backgrounddropdown,
      this.strokedropdown,
      this.filldropdown,
      this.shapeDropdown,
      this.rulesetDropdown,
    ];
  }

  returnColorPalettes() {
    return [
      this.backgroundDropdown.palette,
      this.strokeDropdown.palette,
      this.fillDropdown.palette,
    ];
  }

  returnButtons() {
    return this.resetButton;
  }

  returnCheckboxes() {
    return [this.fillShape, this.addStroke, this.addGrain];
  }
}
