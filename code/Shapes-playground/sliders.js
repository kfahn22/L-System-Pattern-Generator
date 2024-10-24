class SliderGroup {
  constructor(
    // pos,
    // sw,
    // strokeAlpha,
    // fillAlpha,
    // wadj,
    // hadj,
    // radius,
    // a,
    // b,
    // m,
    // n1,
    // n2,
    // n3,
    // n,
    // d,
    // shapeAngle
    values
  ) {
    // Initialize arrays for sliders and labels
    //console.log(values)
    this.pos = values.pos;
    this.sliders = [];
    this.labels = [];
    //this.update = false;

    // Define slider properties
    this.sliderProperties = [
      {
        min: 0.1,
        max: 8,
        value: values.colorVariables.strokeWeight,
        step: 0.1,
        label: "StrokeWeight:",
      },
      {
        min: 100,
        max: 255,
        value: values.colorVariables.strokeAlpha,
        step: 5,
        label: "Stroke Alpha:",
      },
      {
        min: 100,
        max: 255,
        value: values.colorVariables.fillAlpha,
        step: 5,
        label: "Fill Alpha:",
      },
      {
        min: -0.5,
        max: 0.5,
        value: values.shapeVariables.wadj,
        step: 0.05,
        label: "Translate x:",
      },
      {
        min: -0.5,
        max: 0.5,
        value: values.shapeVariables.hadj,
        step: 0.05,
        label: "Translate y:",
      },
      {
        min: 10,
        max: 400,
        value: values.shapeVariables.r,
        step: 5,
        label: "Shape radius:",
      },
      {
        min: -1,
        max: 10,
        value: values.shapeVariables.a,
        step: 0.1,
        label: "a:",
      },
      {
        min: 0,
        max: 20,
        value: values.shapeVariables.b,
        step: 0.1,
        label: "b:",
      },
      { min: 1, max: 20, value: values.shapeVariables.m, step: 1, label: "m:" },
      {
        min: 0.25,
        max: 5,
        value: values.shapeVariables.n1,
        step: 0.05,
        label: "n1:",
      },
      {
        min: 0.25,
        max: 2,
        value: values.shapeVariables.n2,
        step: 0.05,
        label: "n2:",
      },
      {
        min: 0.25,
        max: 2,
        value: values.shapeVariables.n3,
        step: 0.05,
        label: "n3:",
      },
      {
        min: -1,
        max: 1,
        value: values.shapeVariables.n,
        step: 0.1,
        label: "n:",
      },
      { min: 1, max: 20, value: values.shapeVariables.d, step: 1, label: "d:" },
      {
        min: -180,
        max: 180,
        value: values.shapeVariables.shapeAngle,
        step: 45,
        label: "Rotate shape:",
      },
    ];

    // Create sliders and labels
    this.createSliders();
  }

  // Create sliders and labels
  createSliders() {
    for (let i = 0; i < this.sliderProperties.length; i++) {
      // Create slider
      let slider = createSlider(
        this.sliderProperties[i].min,
        this.sliderProperties[i].max,
        this.sliderProperties[i].value,
        this.sliderProperties[i].step
      );
      slider.addClass("slider");
      slider.id("mySliders");
      slider.position(this.pos, 300 + i * 55);
      slider.size(250);
      slider.input(() => this.reset());

      // Create label
      let label = createP(this.sliderProperties[i].label);
      label.position(slider.x, slider.y - 35);
      label.style("color", "white");

      // Store slider and label
      this.sliders.push(slider);
      this.labels.push(label);
    }
  }

  // Update the labels if necessary
  updateLabels() {
    for (let i = 0; i < this.sliders.length; i++) {
      this.labels[i].html(
        `${this.sliderProperties[i].label} ${this.sliders[i].value()}`
      );
    }
  }

  // Method to reset or handle input changes
  reset() {
    this.getValues();
    this.updateLabels();
  }

  // Method to get the current values of the sliders
  getValues() {
    return this.sliders.map((slider) => slider.value());
  }
}
