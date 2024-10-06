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
      "grayPalette",
      "rose",
      "rosePalette",
      "lavender",
      "lavenderPalette",
      "red",
      "redPalette",
      "orange",
      "orangePalette",
      "yellow",
      "yellowPalette",
      "green",
      "greenPalette",
      "blue",
      "bluePalette",
      "purple",
      "purplePalette",
      "raspberry",
      "raspberryPalette",
      "purple_aqua",
      "plant-greens",
      "fushia_blue",
      "fushia_multi",
      "pink_ltblue",
      "blue_green",
      "blue_aqua",
      "blue_yellow",
      "orange_blue",
      "purple_green",
      "red_multi",
      "primary",
      "sunny",
      "orange_green",
    ];
    this.palette;

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
  setPalette(choice) {
    // Get the selected value
    this.selected = choice;//this.dropdown.value();

    // Get the URL based on the selected value
    let url = this.getPaletteUrl(this.selected);

    // Convert the URL to a palette array
    this.palette = this.createPaletteFromURL(url);
  }

  // Get the URL for the selected palette
  getPaletteUrl() {
    let url;
    switch (this.selected) {
      case "white":
        url = "https://supercolorpalette.com/?scp=G0-hsl-FFFFFF";
        break;
      case "black":
        url = "https://supercolorpalette.com/?scp=G0-hsl-000000";
        break;
      case "gray":
        url = "https://supercolorpalette.com/?scp=G0-hsl-4D4D4D";
        break;
      case "grayPalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-4D4D4D-737373-999999-BFBFBF-E6E6E6";
        break;
      case "blue":
        url = "https://supercolorpalette.com/?scp=G0-hsl-2A1FFF";
        break;
      case "bluePalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-2A1FFF-242BFF-2942FF-2E58FF-336DFF-3881FF";
        break;
      case "rose":
        url = "https://supercolorpalette.com/?scp=G0-hsl-C99CC4";
        break;
      case "rosePalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-C99CC4-CFA5CD-D2AFD4-D5B9DA-D9C3DF-DDCDE4-E3D7EA-E9E1EF";
        break;
      case "lavender":
        url = "https://supercolorpalette.com/?scp=G0-hsl-C99CC4";
        break;
      case "lavenderPalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-C99CC4-CFA5CD-D2AFD4-D5B9DA-D9C3DF-DDCDE4-E3D7EA-E9E1EF";
        break;
      case "red":
        url = "https://supercolorpalette.com/?scp=G0-hsl-FA0000";
        break;
      case "redPalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FA0000-FF1414-FF2E2E-FF4747-FF6161";
        break;
      case "orange":
        url = "https://supercolorpalette.com/?scp=G0-hsl-FFA91F";
        break;
      case "orangePalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FFA91F-FF9924-FF8929-FF7B2E-FF6D33-FF6038";
        break;
      case "yellow":
        url = "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F";
        break;
      case "yellowPalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFDE38-FFE252-FFE66B-FFEB85";
        break;
      case "green":
        url = "https://supercolorpalette.com/?scp=G0-hsl-118823";
        break;
      case "greenPalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-118823-13961B-17A314-25B116-36BF18-49CC19-5EDA1B-75E421";
        break;
      case "purple":
        url = "https://supercolorpalette.com/?scp=G0-hsl-8B1FFF";
        break;
      case "purplePalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-8B1FFF-961FFF-A11FFF-AD1FFF-B81FFF-C31FFF";
        break;
      case "raspberry":
        url = "https://supercolorpalette.com/?scp=G0-hsl-FF1FE9";
        break;
      case "raspberryPalette":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FF1FE9-FF1FFB-F01FFF-DD1FFF-CB1FFF";
        break;
      case "orange_green":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FF9E1F-FFE957-F4C148-73BE50-18AF6B";
        break;
      case "blue_yellow":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-FFA21F-1F44FF-1F57FF-1F69FF-1F7CFF";
        break;
      case "plant-greens":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-015A0F-015F08-036402-0C6902-166F02-207402-2B7902-387E02-448302-528802";
        break;
      case "fushia_blue":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FF1FE9-DD1FFF-A51FFF-6D1FFF-351FFF-531FFF-711FFF";
        break;
      case "pink_ltblue":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-E198B8-E3A1CE-E5A9E1-DDB0E8-D4B8EA-CEC0EC-CBC8EF-D0D6F1";
        break;
      case "blue_green":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-3C80B4-3C8AB4-3C94B4-3C9EB4-3CA8B4-3CB2B4-3CB4AC-3CB4A2";
        break;
      case "blue_aqua":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-1F75FF-1F87FF-1F9AFF-1FADFF-1FBFFF-1FD2FF-1FE5FF-1FF8FF";
        break;
      case "orange_blue":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FF8B1F-FF781F-FF661F-1F9CFF-1FAFFF";
        break;
      case "purple_green":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-8F1FFF-7C1FFF-691FFF-93FF1F-A5FF1F-B8FF1F";
        break;
      case "fushia_multi":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FF1FE1-FF1FF4-FFA91F-FF961F-1FFF39-1FFF26-1F75FF-1F87FF";
        break;
      case "red_multi":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-B80000-B8000F-5FB800-6EB800-00B8B5-00B8A5-5900B8-4900B8";
        break;
      case "primary":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-1F75FF-1F87FF-1F9AFF-FF2F1F-FF201F-FF1F30-F5FF1F-FFF61F";
        break;
      case "sunny":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-FBFF05-FFDA05-FFB005-FF8605-FF5D05-FF3305-FF0905-FF0526";
        break;
      case "purple_aqua":
        url =
          "https://supercolorpalette.com/?scp=G0-hsl-BF1FFF-9C24FF-7B29FF-5B2EFF-3D33FF-384FFF-3D74FF-4297FF-47B9FF-4DD8FF";
        break;
    }
    return url;
  }

  // Create the palette array from the URL
  createPaletteFromURL(url) {
    // Extract the color codes from the URL using a regular expression
    let regex = /[0-9A-F]{6}/gi;
    let matches = url.match(regex);

    // Convert HEX codes to RGB and create the palette array
    let palette = matches.map((hex) => this.hexToRgb(hex));
    return palette;
  }

  // Helper function to convert HEX to RGB
  hexToRgb(hex) {
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    let a = 255;
    return [r, g, b, a];
  }
}
