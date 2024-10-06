class RuleDropdown {
  constructor(posx, posy, lsystem, defaultChoice, label) {
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
    this.label = createP(label);
    this.label.position(posx, posy - 40);
    this.optionsArray = [
      "none",
      "ADH231a",
      "ADH256a",
      "board",
      "board2",
      "box",
      "recursive_circles",
      "circular",
      "cross",
      "crystal",
      "doily",
      "dragon1",
      "dragon2",
      "fern",
      "fern2",
      "fern3",
      "hilbert",
      "island_curve",
      "kolam",
      "koch_curve",
      "koch_curve2",
      "koch_snowflake",
      "krishna_anklet",
      "leaf",
      "levy_curve",
      "mango_leaf",
      "peano",
      "peano_c",
      "pentigree",
      "pentaplexity",
      "pentadentrite",
      "quadratic_gosper",
      "quadratic_koch_island",
      "quadratic_snowflake",
      "rings",
      "rounded_star",
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
    this.dropdown.selected(defaultChoice);
  }

  // Called when a ruleset is selected from the dropdown
  selectRule(choice) {
    this.currentFractal = choice; //this.dropdown.value();
    this.pickRule();
  }

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
      // case "flower":
      //   currentFractal = this.lsystem.flower;
      //   break;
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
      case "koch_curve2":
        this.currentFractal = this.lsystem.koch_curve2;
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
      // case "notched_square":
      //   currentFractal = this.lsystem.notched_square;
      //   break;
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
      case "quadratic_snowflake":
        this.currentFractal = this.lsystem.quadratic_snowflake;
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
      // case "rounded_cross":
      //   this.currentFractal = this.lsystem.rounded_cross;
      //   break;
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
    return this.currentFractal;
  }

  setRule(currentFractal) {
    this.axiom = currentFractal.axiom;
    this.rules = currentFractal.rules;
    this.angle = radians(currentFractal.angle);
    this.lf = currentFractal.length_factor;
    this.maxLevel = currentFractal.max_Level;
    this.sentence = this.axiom;
    return [this.rules, this.angle, this.lf, this.maxLevel, this.sentence];
  }
}
