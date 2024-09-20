class AddControls {
  constructor(posSliders, posDropdown, data, shapeChoice, ruleChoice) {
    // Instantiate palette dropdowns
    this.backgroundDropdown = new PaletteDropdown(300, 50, "black");
    this.backgrounddropdown = this.backgroundDropdown.dropdown;
    this.strokeDropdown = new PaletteDropdown(600, 50, "blue");
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(450, 50, "purple");
    this.filldropdown = this.fillDropdown.dropdown;

    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      posSliders,
      "sliderSet1",
      0.5,
      0.5,
      2,
      20,
      2,
      150,
      0.5,
      0,
      0,
      1,
      1,
      6,
      1,
      1,
      1,
      1
    );
    this.sliders = this.sliderGroup.sliders;
    this.values = this.sliderGroup.getValues();
    this.shape_ui = new ShapeUI(posDropdown, shapeChoice, this.values);
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(800, 50, data, ruleChoice);
    this.ruleset.selectRule();
    this.lsystemValues = this.ruleset.setRule();
    this.rulesetDropdown = this.ruleset.dropdown;
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
}
