class SliderGroup {
  constructor(
    pos,
    idName,
    wadj,
    hadj,
    level,
    sw,
    strokeAlpha,
    fillAlpha,
    fractalAngle,
    length,
    shapeScale,
    a,
    b,
    m,
    n,
    n1,
    n2,
    n3,
    shapeAngle
  ) {
    // Initialize arrays for sliders and labels
    this.sliders = [];
    this.labels = [];
    //this.update = false;

    // Define slider properties
    this.sliderProperties = [
      { min: -0.05, max: 1.05, value: wadj, step: 0.01, label: "Translate x:" },
      {
        min: -0.05,
        max: 1.05,
        value: hadj,
        step: 0.025,
        label: "Translate y:",
      },
      { min: 0, max: 13, value: level, step: 1, label: "Level:" },
      {
        min: 0.1,
        max: 8,
        value: sw,
        step: 0.1,
        label: "StrokeWeight:",
      },
      { min: 100, max: 255, value: strokeAlpha, step: 5, label: "Stroke Alpha:" },
      { min: 100, max: 255, value: fillAlpha, step: 5, label: "Fill Alpha:" },
      {
        min: -180,
        max: 180,
        value: fractalAngle,
        step: 5,
        label: "Rotate fractal:",
      },
      { min: 5, max: 200, value: length, step: 1, label: "Step length:" },
      { min: 0.15, max: 1.15, value: shapeScale, step: 0.05, label: "Shape scale:" },
      { min: 0, max: 10, value: a, step: 0.05, label: "a:" },
      { min: 0, max: 10, value: b, step: 0.05, label: "b:" },
      { min: 0, max: 10, value: m, step: 1, label: "m:" },
      { min: -1, max: 5, value: n, step: 0.5, label: "n:" },
      { min: 0.25, max: 5, value: n1, step: 0.05, label: "n1:" },
      { min: 0.25, max: 2, value: n2, step: 0.05, label: "n2:" },
      { min: 0.25, max: 2, value: n3, step: 0.05, label: "n3:" },
      {
        min: -180,
        max: 180,
        value: shapeAngle,
        step: 1,
        label: "Rotate shape:",
      },
    ];

    // Create sliders and labels
    this.createSliders(pos, idName);
  }

  // Create sliders and labels
  createSliders(pos, idName) {
    for (let i = 0; i < this.sliderProperties.length; i++) {
      // Create slider
      let slider = createSlider(
        this.sliderProperties[i].min,
        this.sliderProperties[i].max,
        this.sliderProperties[i].value,
        this.sliderProperties[i].step
      );
      slider.addClass("slider");
      slider.id(idName);
      slider.position(pos + 10, 35 + i * 50);
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
    //this.update = true;
    this.getValues();
    this.updateLabels();
  }

  // Method to get the current values of the sliders
  getValues() {
    return this.sliders.map((slider) => slider.value());
  }
}
