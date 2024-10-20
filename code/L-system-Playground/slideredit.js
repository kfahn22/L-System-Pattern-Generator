class SliderGroup {
  constructor(pos, wadj, hadj) {
    this.sliders = [];
    this.labels = [];

    // Define slider properties
    this.sliderProperties = [
      { min: -0.05, max: 1.05, value: wadj, step: 0.01, label: "Translate x:" },
      {
        min: -0.05,
        max: 1.05,
        value: hadj,
        step: 0.05,
        label: "Translate y:",
      },
    ];

    // Create sliders and labels inside a flexbox container
    this.createSliders(pos);
  }

  createSliders(pos) {
    // Create a flex container div
    let container = createDiv().addClass("flex-container");
    container.position(pos, 30);

    // Apply flexbox styles to the container
    container.style("display", "flex");
    container.style("flex-direction", "column"); // vertical layout
    container.style("gap", "10px"); // spacing between elements

    for (let i = 0; i < this.sliderProperties.length; i++) {
      // Create a wrapper div for each slider and label pair
      let wrapper = createDiv().addClass("slider-wrapper");
      wrapper.style("display", "flex");
      wrapper.style("align-items", "center"); // align label and slider horizontally

      // Create label
      let label = createP(this.sliderProperties[i].label);
      label.style("color", "white");
      label.style("margin-right", "10px"); // spacing between label and slider

      // Create slider
      let slider = createSlider(
        this.sliderProperties[i].min,
        this.sliderProperties[i].max,
        this.sliderProperties[i].value,
        this.sliderProperties[i].step
      );
      slider.addClass("slider");
      slider.input(() => this.reset());

      // Append label and slider to the wrapper
      wrapper.child(label);
      wrapper.child(slider);

      // Append the wrapper to the main container
      container.child(wrapper);

      // Store slider and label
      this.sliders.push(slider);
      this.labels.push(label);
    }
  }

  updateLabels() {
    for (let i = 0; i < this.sliders.length; i++) {
      this.labels[i].html(
        `${this.sliderProperties[i].label} ${this.sliders[i].value()}`
      );
    }
  }

  reset() {
    this.getValues();
    this.updateLabels();
  }

  getValues() {
    return this.sliders.map((slider) => slider.value());
  }
}
