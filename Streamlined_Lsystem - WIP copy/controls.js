class AddControls {
  constructor(posSliders, posDropdown, data, shapeChoice, ruleChoice) {
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
    //this.sliderGroup.updateLabels();
    this.shape_ui = new ShapeUI(posDropdown, shapeChoice, this.values);
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(800, 50, data, ruleChoice);
    this.ruleset.selectRule();
    this.lsystemValues = this.ruleset.setRule();
    this.rulesetDropdown = this.ruleset.dropdown;
    // this.rules = this.lsystemValues[0];
    // this.angle = this.lsystemValues[1];
    // this.lf = this.lsystemValues[2];
    // this.maxLevel = this.lsystemValues[3];
    // this.sentence = this.lsystemValues[4];
    // this.warning = null;
  }

  returnDropdowns() {
    return [this.shapeDropdown, this.rulesetDropdown];
  }
}
