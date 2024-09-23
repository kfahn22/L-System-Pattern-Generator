class AddControls {
  constructor(
    posSliders,
    posDropdown,
    posButtons,
    rulesetData,
    exampleData,
    defaultChoice
  ) {
    this.exampleDropdown = new ExampleDropdown(
      550,
      150,
      exampleData,
      defaultChoice
    );
    this.exampleDropdown.selectExample();
    this.exampleData = this.exampleDropdown.setExample();
    this.exampledropdown = this.exampleDropdown.dropdown; // instance
    // Instantiate palette dropdowns
    this.backgroundDropdown = new PaletteDropdown(
      450,
      30,
      this.exampleData[18],
      "Background Color"
    );
    this.backgrounddropdown = this.backgroundDropdown.dropdown;
    this.strokeDropdown = new PaletteDropdown(
      450,
      80,
      this.exampleData[19],
      "Stroke Color"
    );
    this.strokedropdown = this.strokeDropdown.dropdown;
    this.fillDropdown = new PaletteDropdown(
      450,
      130,
      this.exampleData[20],
      "Fill Color"
    );
    this.filldropdown = this.fillDropdown.dropdown;
    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      posSliders,
      "group 1",
      0.5,
      0.5,
      7,
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
      // // this.wadj,
      // // this.hadj,
      // // this.level,
      // // this.length,
      // // this.sw,
      // // this.alpha,
      // // this.shapeScale,
      // // this.rotateFractal,
      // // this.rotateShape,
      // // this.a,
      // // this.b,
      // // this.m,
      // // this.n,
      // // this.n1,
      // // this.n2,
      // // this.n3
      // this.exampleData[2], // wadj
      // this.exampleData[3], // hadj
      // this.exampleData[4], // level
      // 20, //this.exampleData[5], // length
      // this.exampleData[6], // strokeWeight
      // this.exampleData[7], // alpha
      // this.exampleData[8], //shapeScale
      // this.exampleData[9], // rotateFractal
      // this.exampleData[10], // rotateShape
      // this.exampleData[11], //a
      // this.exampleData[12], //b
      // this.exampleData[13], //m
      // this.exampleData[14], //n
      // this.exampleData[15], //n1
      // this.exampleData[16], //n2
      // this.exampleData[17] //n3
    );
    this.sliders = this.sliderGroup.sliders;
    this.values = [];//this.sliderGroup.getValues();
    this.shape_ui = new ShapeUI(250, this.exampleData[1], this.values);
    this.shapeMessage = this.shape_ui.message;
    this.addMessage = this.shape_ui.addMessage;
    this.shapeDropdown = this.shape_ui.dropdown;
    this.ruleset = new RuleDropdown(250, 10, rulesetData, this.exampleData[0]);
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
    this.showExample = createCheckbox("Display examples", true);
    this.showExample.position(posButtons, 200);
    this.showExample.style("color", "white");
  }

  // updateExample() {
  //   this.exampleDropdown.selectExample();
  //   this.exampleData = this.exampleDropdown.setExample();
  // }

  returnShapeData() {
    if (this.showExample.checked() === true) {
      this.exampleDropdown.selectExample();
      this.exampleDropdown.setExample();
      for (let i = 2; i < 17; i++) {
        this.values.push(this.exampleData[i]);
      }
    } else {
      this.values = this.sliderGroup.getValues();
      this.sliderGroup.updateLabels();
    }
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
      this.exampledropdown,
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
    return [this.fillShape, this.addStroke, this.addGrain, this.showExample];
  }
}
