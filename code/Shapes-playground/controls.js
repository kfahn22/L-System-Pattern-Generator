class AddControls {
  constructor(values, shapeChoice, strokeChoice, fillChoice) {
    this.pos = values.pos;
    this.strokeDropdown = new PaletteDropdown(
      this.pos,
      100,
      strokeChoice,
      "Stroke Color"
    );
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(
      this.pos,
      170,
      fillChoice,
      "Fill Color"
    );
    this.filldropdown = this.fillDropdown.dropdown;
    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      values
      // pos,
      // values[0], // sw
      // values[1], // strokeAlpha
      // values[2], // fillAlpha
      // values[3], // wadj
      // values[4], // hadj
      // values[5] * width, // r
      // values[6], // a
      // values[7], // b
      // values[8], // m
      // values[9], // n1
      // values[10], // n2
      // values[11], // n3
      // values[12], // n,
      // values[13], // d
      // values[14] //  shape angle
    );
    this.sliders = this.sliderGroup.sliders;
    this.sliderValues = this.sliderGroup.getValues();
    this.shape_ui = new ShapeUI(this.pos, 20, shapeChoice, "Shape");
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    // Checkbox to determine whether shapes have stroke
    this.addStroke = createCheckbox("Add stroke", true);
    this.addStroke.position(this.pos, 210);
    this.addStroke.style("color", "white");
    // Checkbox to determine whether shapes are filled
    this.fillShape = createCheckbox("Fill shape", false);
    this.fillShape.position(this.pos, 240);
    this.fillShape.style("color", "white");
   
    this.values = [];
  }

  getColors(stroke, fill) {
    //this.backgroundDropdown.getColor(background);
    this.strokeDropdown.getColor(stroke);
    this.fillDropdown.getColor(fill);
    return [
     // this.backgroundDropdown.color,
      this.strokeDropdown.color,
      this.fillDropdown.color,
    ];
  }

  // Return instance of dropdowns
  returnDropdowns() {
    let dropdowns = {
      shapeDropdown: this.shapeDropdown,
      strokeDropdown: this.strokedropdown,
      fillDropdown: this.filldropdown
    }
    // return [
    //   this.shapeDropdown,   
    //   this.strokedropdown,
    //   this.filldropdown,
    // ];
    return dropdowns;
  }

  returnCheckboxes() {
    let checkBoxes = {
      addStroke: this.addStroke,
      fillShape: this.fillShape,
    };
    return checkBoxes;
    // return [this.addStroke, this.fillShape];
  }

  // Get values from dropdowns, checkboxes, and sliders
  // getValues() {
  //   this.values = [];
  //   this.values[0] = this.shapeDropdown.selected();
  //   // this.values[1] = this.backgrounddropdown.selected();
  //   this.values[2] = this.strokedropdown.selected();
  //   this.values[3] = this.filldropdown.selected();
  //   this.values[4] = this.addStroke.checked();
  //   this.values[5] = this.fillShape.checked();
  //   let sliderValues = this.sliderGroup.getValues();
  //   this.sliderGroup.updateLabels();
  //   for (let s of sliderValues) {
  //     this.values.push(s);
  //   }
  // }
}
