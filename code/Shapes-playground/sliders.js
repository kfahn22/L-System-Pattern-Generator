class SliderGroup {
  constructor(
    pos,
    sw,
    strokeAlpha,
    fillAlpha,
    wadj,
    hadj,
    radius,
    a,
    b,
    m,
    n1,
    n2,
    n3,
    n,
    shapeAngle
  ) {
    // Initialize arrays for sliders and labels
    this.pos = pos;
    this.sliders = [];
    this.labels = [];
    //this.update = false;

    // Define slider properties
    this.sliderProperties = [
      {
        min: 0.1,
        max: 8,
        value: sw,
        step: 0.1,
        label: "StrokeWeight:",
      },
      {
        min: 100,
        max: 255,
        value: strokeAlpha,
        step: 5,
        label: "Stroke Alpha:",
      },
      { min: 100, max: 255, value: fillAlpha, step: 5, label: "Fill Alpha:" },
      { min: -0.5, max: 0.5, value: wadj, step: 0.05, label: "Translate x:" },
      {
        min: -0.5,
        max: 0.5,
        value: hadj,
        step: 0.05,
        label: "Translate y:",
      },
      { min: 10, max: 400, value: radius, step: 5, label: "Shape radius:" },
      { min: 0, max: 10, value: a, step: 0.01, label: "a:" },
      { min: 0, max: 20, value: b, step: 0.1, label: "b:" },
      { min: 0, max: 20, value: m, step: 1, label: "m:" },
      { min: 0.25, max: 5, value: n1, step: 0.05, label: "n1:" },
      { min: 0.25, max: 2, value: n2, step: 0.05, label: "n2:" },
      { min: 0.25, max: 2, value: n3, step: 0.05, label: "n3:" },
      { min: -1, max: 1, value: n, step: 0.1, label: "n:" },
      {
        min: -180,
        max: 180,
        value: shapeAngle,
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
      slider.position(this.pos, 260 + i * 55);
      slider.size(200);
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
