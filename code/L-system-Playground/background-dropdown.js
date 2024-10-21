class BackgroundDropdown {
  constructor(posx, posy, defaultChoice, label) {
    // Create the dropdown element
    this.wrapper = createDiv().addClass("wrapper");
    this.dropdown = createSelect().addClass("dropdown");
    this.wrapper.position(posx, posy);
    this.selected = defaultChoice;
    this.optionsArray = [
      "white",
      "black",
      "gray",
      "rose",
      "red",
      "orange",
      "yellow",
      "green",
      "aqua",
      "teal",
      "blue",
      "purple",
      "raspberry",
    ];
    this.color = null;

    // Add options to the dropdown
    this.optionsArray.forEach((option) => this.dropdown.option(option));
    // Create label
    this.label = createP(label);
    // this.label.position(posx, posy - 40);

    this.label.style("color", "black");
    this.wrapper.child(this.label);
    this.wrapper.child(this.dropdown);
    // Set the default selected option
    if (defaultChoice) {
      this.dropdown.selected(defaultChoice);
    }
  }

  // Handle the dropdown selection change
  getColor(choice) {
    // Get the selected value
    this.selected = choice; //this.dropdown.value();

    // Convert the URL to a palette array
    this.color = this.setColor(this.selected);
  }

  // Get the URL for the selected palette
  setColor(col) {
    switch (this.selected) {
      case "white":
        col = [255, 255, 255];
        break;
      case "black":
        col = [0, 0, 0];
        break;
      case "gray":
        col = [73, 73, 73];
        break;
      case "rose":
        col = [201, 156, 196];
        break;
      case "red":
        col = [250, 0, 0];
        break;
      case "orange":
        col = [255, 169, 31];
        break;
      case "yellow":
        col = [255, 218, 31];
        break;
      case "green":
        col = [17, 136, 35];
        break;
      case "aqua":
        col = [31, 248, 255];
        break;
      case "teal":
        col = [52, 138, 167];
        break;
      case "blue":
        col = [42, 31, 255];
        break;
      case "purple":
        col = [139, 31, 255];
        break;
      case "raspberry":
        col = [255, 31, 233];
        break;
    }
    return col;
  }
}
