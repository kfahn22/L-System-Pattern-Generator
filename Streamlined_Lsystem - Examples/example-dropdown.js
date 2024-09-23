class ExampleDropdown {
  constructor(posx, posy, data, defaultChoice) {
    // Create the dropdown element
    this.posx = posx;
    this.posy = posy;
    this.data = data;
    this.currentExample = defaultChoice;
    this.dropdown = createSelect();
    this.dropdown.position(this.posx, this.posy);
    this.dropdown.addClass("dropdown");
    this.optionsArray = [
      "Dragon1 with Gear Curve",
      "ADH231a with Astroid Curve",
      "Doily with Supershape",
      "Rounded Star with Cornu Spiral",
    ];

    // Add options to the dropdown
    this.optionsArray.forEach((option) => this.dropdown.option(option));
    this.dropdown.selected(defaultChoice);
  }

  // Called when a example is selected from the dropdown
  selectExample() {
    this.currentExample = this.dropdown.value();
    this.pickExample();
  }

  pickExample() {
    switch (this.currentExample) {
      case "Dragon1 with Gear Curve":
        this.currentExample = this.data.Dragon1_with_Gear_Curve;
        break;
      case "ADH231a with Astroid Curve":
        this.currentExample = this.data.ADH231a_with_Astroid_Curve;
        break;
      case "Doily with Supershape":
        this.currentExample = this.data.Doily_with_supershape;
        break;
      case "Rounded Star with Cornu Spiral":
        this.currentExample = this.data.Rounded_Star_with_Cornu_Spiral;
        break;
      // case "board2":
      //   this.currentExample = this.lsystem.board2;
      //   break;
      // case "box":
      //   this.currentFractal = this.lsystem.box;
      //   break;
      // case "recursive_circles":
      //   this.currentFractal = this.lsystem.recursive_circles;
      //   break;
      // // case "recursive_circles2":
      // //   this.currentFractal = this.lsystem.recursive_circles2;
      // //   break;
      // case "circular":
      //   this.currentFractal = this.lsystem.circular;
      //   break;
      // case "cross":
      //   this.currentFractal = this.lsystem.cross;
      //   break;
      // case "crystal":
      //   this.currentFractal = this.lsystem.crystal;
      //   break;
      // case "doily":
      //   this.currentFractal = this.lsystem.doily;
      //   break;
      // case "dragon1":
      //   this.currentFractal = this.lsystem.dragon1;
      //   break;
      // case "dragon2":
      //   this.currentFractal = this.lsystem.dragon2;
      //   break;
      // case "fern":
      //   this.currentFractal = this.lsystem.fern;
      //   break;
      // case "fern2":
      //   this.currentFractal = this.lsystem.fern2;
      //   break;
      // case "fern3":
      //   this.currentFractal = this.lsystem.fern3;
      //   break;
      // // case "flower":
      // //   currentFractal = this.lsystem.flower;
      // //   break;
      // case "island_curve":
      //   this.currentFractal = this.lsystem.island_curve;
      //   break;
      // case "hilbert":
      //   this.currentFractal = this.lsystem.hilbert;
      //   break;
      // case "kolam":
      //   this.currentFractal = this.lsystem.kolam;
      //   break;
      // case "krishna_anklet":
      //   this.currentFractal = this.lsystem.krishna_anklet;
      //   break;
      // case "koch_curve":
      //   this.currentFractal = this.lsystem.koch_curve;
      //   break;
      // case "koch_snowflake":
      //   this.currentFractal = this.lsystem.koch_snowflake;
      //   break;
      // case "leaf":
      //   this.currentFractal = this.lsystem.leaf;
      //   break;
      // case "levy_curve":
      //   this.currentFractal = this.lsystem.levy_curve;
      //   break;
      // case "mango_leaf":
      //   this.currentFractal = this.lsystem.mango_leaf;
      //   break;
      // case "maze":
      //   this.currentFractal = this.lsystem.maze;
      //   break;
      // // case "notched_square":
      // //   currentFractal = this.lsystem.notched_square;
      // //   break;
      // case "peano":
      //   this.currentFractal = this.lsystem.peano;
      //   break;
      // case "peano_c":
      //   this.currentFractal = this.lsystem.peano_c;
      //   break;
      // case "pentaplexity":
      //   this.currentFractal = this.lsystem.pentaplexity;
      //   break;
      // case "pentadentrite":
      //   this.currentFractal = this.lsystem.pentadentrite;
      //   break;
      // case "pentigree":
      //   this.currentFractal = this.lsystem.pentigree;
      //   break;
      // case "quadratic_gosper":
      //   this.currentFractal = this.lsystem.quadratic_gosper;
      //   break;
      // case "quadratic_koch_island":
      //   this.currentFractal = this.lsystem.quadratic_koch_island;
      //   break;
      // case "quadratic_koch_island2":
      //   this.currentFractal = this.lsystem.quadratic_koch_island2;
      //   break;
      // case "quadratic_snowflake2":
      //   this.currentFractal = this.lsystem.quadratic_snowflake2;
      //   break;
      // case "rings":
      //   this.currentFractal = this.lsystem.rings;
      //   break;
      // case "snake_kolam":
      //   this.currentFractal = this.lsystem.snake_kolam;
      //   break;
      // case "rings":
      //   this.currentFractal = this.lsystem.rings;
      //   break;
      // // case "rounded_cross":
      // //   this.currentFractal = this.lsystem.rounded_cross;
      // //   break;
      // case "rounded_star":
      //   this.currentFractal = this.lsystem.rounded_star;
      //   break;
      // case "skierpinski":
      //   this.currentFractal = this.lsystem.skierpinski;
      //   break;
      // case "skierpinski_carpet":
      //   this.currentFractal = this.lsystem.skierpinski_carpet;
      //   break;
      // case "square_skierpinski":
      //   this.currentFractal = this.lsystem.square_skierpinski;
      //   break;
      // case "sticks":
      //   this.currentFractal = this.lsystem.sticks;
      //   break;
      // case "tiles":
      //   this.currentFractal = this.lsystem.tiles;
      //   break;
      // case "tiles2":
      //   this.currentFractal = this.lsystem.tiles;
      //   break;
      // case "tree":
      //   this.currentFractal = this.lsystem.tree;
      //   break;
      // case "torn_square":
      //   this.currentFractal = this.lsystem.torn_square;
      //   break;
      // case "triangle":
      //   this.currentFractal = this.lsystem.triangle;
      //   break;
    }
  }

  setExample() {
    //console.log(this.currentExample);
    let ruleset = this.currentExample.ruleset; // 0
    let shape = this.currentExample.shape; // 1
    let wadj = this.currentExample.wadj; // 2
    let hadj = this.currentExample.hadj; // 3
    let level = this.currentExample.level; //4
    let length = this.currentExample.length; // 5
    let sw = this.currentExample.strokeWeight; // 6
    let alpha = this.currentExample.alpha; // 7
    let shapeScale = this.currentExample.shapeScale; // 8
    let fractalAngle = radians(this.currentExample.fractal_angle); //9
    let shapeAngle = radians(this.currentExample.shape_angle); // 10
    let a = this.currentExample.a; // 11
    let b = this.currentExample.b; // 12
    let m = this.currentExample.m; // 13
    let n = this.currentExample.n; // 14
    let n1 = this.currentExample.n1; // 15
    let n2 = this.currentExample.n2; // 16
    let n3 = this.currentExample.n3; // 17
    let backgroundColor = this.currentExample.background_color; // 18
    let strokePalette = this.currentExample.stroke_palette; // 19
    let fillPalette = this.currentExample.fill_palette; // 20
    let fillShape = this.currentExample.fill_shape;
    let addStroke = this.currentExample.add_stroke;
    let addGrain = this.currentExample.add_grain;
    return [
      ruleset,
      shape,
      backgroundColor,
      strokePalette,
      fillPalette,
      fillShape,
      addStroke,
      addGrain,
      wadj,
      hadj,
      level,
      sw,
      alpha,
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
    ];
  }
}
