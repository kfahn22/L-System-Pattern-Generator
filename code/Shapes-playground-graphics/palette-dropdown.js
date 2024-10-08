class PaletteDropdown {
  constructor(posx, posy, defaultChoice, label) {
    // Create the dropdown element
    this.dropdown = createSelect();
    this.dropdown.position(posx, posy);
    this.dropdown.addClass("dropdown");
    this.selected = defaultChoice;
    this.optionsArray = [
      "white",
      "black",
      "gray",
      "red",
      "orange",
      "yellow",
      "green",
      "aqua",
      "teal",
      "blue",
      "purple",
    ];
    this.color;

    // Add options to the dropdown
    this.optionsArray.forEach((option) => this.dropdown.option(option));
    // Create label
    this.label = createP(label);
    this.label.position(posx, posy - 40);

    this.label.style("color", "white");

    // Set the default selected option
    if (defaultChoice) {
      this.dropdown.selected(defaultChoice);
    }
  }

  // Handle the dropdown selection change
  getColor(choice) {
    // Get the selected value
    this.selected = choice;//this.dropdown.value();

    // Convert the URL to a palette array
    this.color = this.setColor(this.selected);
  }

  // Get the URL for the selected palette
  setColor(col) {
    switch (this.selected) {
      case "white":
        col = [255, 255, 255]; //color(255);
        break;
      case "black":
        col = [0, 0, 0]; //color(0);
        break;
      case "gray":
        col = [59, 59, 59]; //color(59);
        break;
      case "red":
        col = [255, 0, 0];
        break;
      case "orange":
        col = [255, 255, 0];
        break;
      case "yellow":
        col = [200, 200, 0];
        break;
      case "green":
        col = [0, 255, 0];
        break;
      case "aqua":
        col = [177, 248, 242];
        break;
      case "teal":
        col = [52,138,167];
        break;
      case "blue":
        col = [0, 0, 255]; //color(0,0,255);
        break;
      case "purple":
        col = [81, 59, 86];
        break;
    }
    return col;
  }
}
