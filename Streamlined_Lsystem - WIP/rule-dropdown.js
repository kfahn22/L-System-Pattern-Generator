class RuleDropdown {
  //constructor(posx, posy, lsystem, defaultChoice, onChangeCallback) {
  constructor(posx, posy, lsystem, defaultChoice) {
    // Create the dropdown element
    this.posx = posx;
    this.posy = posy;
    this.lsystem = lsystem;
    this.currentFractal = defaultChoice;
    this.dropdown = createSelect();
    this.dropdown.position(this.posx, this.posy);
    this.axiom = "";
    this.rules = "";
    this.angle = 0;
    this.maxLevel = 2;
    this.lf = 1;
    this.sentence = this.axiom;
    this.dropdown.addClass("dropdown");
    this.optionsArray = [
      "none",
      "ADH231a",
      "ADH256a",
      "board",
      "board2",
      "box",
      "recursive_circles",
      "recursive_circles2",
      "circular",
      "cross",
      "crystal",
      "doily",
      "dragon1",
      "dragon2",
      "fern",
      "fern2",
      "fern3",
      "flower",
      "hilbert",
      "island_curve",
      "kolam",
      "koch_curve",
      "koch_snowflake",
      "krishna_anklet",
      "leaf",
      "levy_curve",
      "mango_leaf",
      "notched_square",
      "peano",
      "peano_c",
      "pentigree",
      "pentaplexity",
      "pentadentrite",
      "quadratic_gosper",
      "quadratic_koch_island",
      "quadratic_snowflake2",
      "rings",
      "rounded_star",
      "rounded_cross",
      "snake_kolam",
      "skierpinski",
      "square_skierpinski",
      "skierpinski_carpet",
      "sticks",
      "tiles",
      "tiles2",
      "torn_square",
      "tree",
      "triangle",
    ];

    // Add options to the dropdown
    this.optionsArray.forEach((option) => this.dropdown.option(option));

    // Set the default selected option
    if (this.defaultChoice) {
      this.dropdown.selected(this.defaultChoice);
    }

    // Set the callback for when the selection changes
    // if (onChangeCallback) {
    //   this.dropdown.changed(onChangeCallback);
    //   console.log(this.dropdown.value);
    // }
  }

  // Called when a ruleset is selected from the dropdown
  selectRule() {
    //let ruleName = this.dropdown.value();
    // this.pickRule(ruleName);
    this.currentFractal = this.dropdown.value();
    this.pickRule();
  }
  // // Handle the dropdown selection change
  // handleChange() {
  //   // Get the selected value
  //   let selected = this.dropdown.value();

  //   // Get the ruleset based on the selected value
  //   let ruleset = this.pickRule(selected);

  //   // Convert the URL to a palette array
  //   //let palette = this.createPaletteFromURL(url);

  //   // Call the user's onChange callback with the palette array
  //   // if (this.onChangeCallback) {
  //   //   this.onChangeCallback(ruleset);
  //   // }
  // }

  pickRule() {
    switch (this.currentFractal) {
      case "none":
        this.currentFractal = this.lsystem.none;
        break;
      case "ADH231a":
        this.currentFractal = this.lsystem.ADH231a;
        break;
      case "ADH256a":
        this.currentFractal = this.lsystem.ADH256a;
        break;
      case "board":
        this.currentFractal = this.lsystem.board;
        break;
      case "board2":
        this.currentFractal = this.lsystem.board2;
        break;
      case "box":
        this.currentFractal = this.lsystem.box;
        break;
      case "recursive_circles":
        this.currentFractal = this.lsystem.recursive_circles;
        break;
      case "recursive_circles2":
        this.currentFractal = this.lsystem.recursive_circles2;
        break;
      case "circular":
        this.currentFractal = this.lsystem.circular;
        break;
      case "cross":
        this.currentFractal = this.lsystem.cross;
        break;
      case "crystal":
        this.currentFractal = this.lsystem.crystal;
        break;
      case "doily":
        this.currentFractal = this.lsystem.doily;
        break;
      case "dragon1":
        this.currentFractal = this.lsystem.dragon1;
        break;
      case "dragon2":
        this.currentFractal = this.lsystem.dragon2;
        break;
      case "fern":
        this.currentFractal = this.lsystem.fern;
        break;
      case "fern2":
        this.currentFractal = this.lsystem.fern2;
        break;
      case "fern3":
        this.currentFractal = this.lsystem.fern3;
        break;
      case "flower":
        currentFractal = this.lsystem.flower;
        break;
      case "island_curve":
        this.currentFractal = this.lsystem.island_curve;
        break;
      case "hilbert":
        this.currentFractal = this.lsystem.hilbert;
        break;
      case "kolam":
        this.currentFractal = this.lsystem.kolam;
        break;
      case "krishna_anklet":
        this.currentFractal = this.lsystem.krishna_anklet;
        break;
      case "koch_curve":
        this.currentFractal = this.lsystem.koch_curve;
        break;
      case "koch_snowflake":
        this.currentFractal = this.lsystem.koch_snowflake;
        break;
      case "leaf":
        this.currentFractal = this.lsystem.leaf;
        break;
      case "levy_curve":
        this.currentFractal = this.lsystem.levy_curve;
        break;
      case "mango_leaf":
        this.currentFractal = this.lsystem.mango_leaf;
        break;
      case "maze":
        this.currentFractal = this.lsystem.maze;
        break;
      case "notched_square":
        currentFractal = this.lsystem.notched_square;
        break;
      case "peano":
        this.currentFractal = this.lsystem.peano;
        break;
      case "peano_c":
        this.currentFractal = this.lsystem.peano_c;
        break;
      case "pentaplexity":
        this.currentFractal = this.lsystem.pentaplexity;
        break;
      case "pentadentrite":
        this.currentFractal = this.lsystem.pentadentrite;
        break;
      case "pentigree":
        this.currentFractal = this.lsystem.pentigree;
        break;
      case "quadratic_gosper":
        this.currentFractal = this.lsystem.quadratic_gosper;
        break;
      case "quadratic_koch_island":
        this.currentFractal = this.lsystem.quadratic_koch_island;
        break;
      case "quadratic_koch_island2":
        this.currentFractal = this.lsystem.quadratic_koch_island2;
        break;
      case "quadratic_snowflake2":
        this.currentFractal = this.lsystem.quadratic_snowflake2;
        break;
      case "rings":
        this.currentFractal = this.lsystem.rings;
        break;
      case "snake_kolam":
        this.currentFractal = this.lsystem.snake_kolam;
        break;
      case "rings":
        this.currentFractal = this.lsystem.rings;
        break;
      case "rounded_cross":
        this.currentFractal = this.lsystem.rounded_cross;
        break;
      case "rounded_star":
        this.currentFractal = this.lsystem.rounded_star;
        break;
      case "skierpinski":
        this.currentFractal = this.lsystem.skierpinski;
        break;
      case "skierpinski_carpet":
        this.currentFractal = this.lsystem.skierpinski_carpet;
        break;
      case "square_skierpinski":
        this.currentFractal = this.lsystem.square_skierpinski;
        break;
      case "sticks":
        this.currentFractal = this.lsystem.sticks;
        break;
      case "tiles":
        this.currentFractal = this.lsystem.tiles;
        break;
      case "tiles2":
        this.currentFractal = this.lsystem.tiles;
        break;
      case "tree":
        this.currentFractal = this.lsystem.tree;
        break;
      case "torn_square":
        this.currentFractal = this.lsystem.torn_square;
        break;
      case "triangle":
        this.currentFractal = this.lsystem.triangle;
        break;
    }
    //this.setRule();
  }

  setRule() {
    this.axiom = this.currentFractal.axiom;
    this.rules = this.currentFractal.rules;
    this.angle = radians(this.currentFractal.angle);
    this.lf = this.currentFractal.length_factor;
    this.maxLevel = this.currentFractal.max_Level;
    this.sentence = this.axiom;
    return [this.rules, this.angle, this.lf, this.maxLevel, this.sentence];
  }

  // // Return the dropdown element if needed
  // getElement() {
  //   return this.dropdown;
  // }
}