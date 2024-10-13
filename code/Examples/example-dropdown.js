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
      "ADH231a with Archimedes Spiral",
      "ADH231a with Astroid Curve",
      "ADH231a with Supershape Curve",
      "ADH256a with Superellipse",
      "ADH256a with Kiss Curve",
      "Board with Lissajous",
      "Box with Ceva",
      "Crystal with Maltese Cross",
      "Crystal with Supershape",
      "Doily with Supershape Curve",
      "Doily with Bicorn Curve",
      "Dragon2 with Gear Curve",
      "Dragon2 with Cornu Spiral",
      "Dragon1 with Astroid Curve",
      "Hilbert Ruleset with Clover Curve",
      "Hilbert Ruleset with Eight Curve",
      "Hilbert Ruleset with Gear Curve",
      "Hilbert Ruleset with Kiss Curve",
      "Hilbert Ruleset with Quadrifolium Curve",
      "Koch snowflake with Bicorn curve",
      "Koch snowflake with Kiss curve",
      "Koch snowflake with Quadrilateral",
      "Koch snowflake with Supershape",
      "Koch snowflake with Word",
      "Kolam with Butterfly",
      "Kolam with Ceva",
      "Kolam with Deltoid",
      "Kolam with Gear Curve",
      "Kolam with Image",
      "Krishna Anklet with Gear Curve (Background)",
      "Krishna Anklet with Gear Curve",
      "Mango Leaf with Flower Curve",
      "Mango Leaf with Rose Curve",
      "Peano with Cassini Oval",
      "Peano with Quadrilateral Curve",
      "Pentaplexity with Gear Curve",
      "Pentaplexity with Supershape Curve",
      "Quadratic gosper with Kiss curve",
      "Quadratic Snowflake with Quadrifolium curve",
      "Rounded Star with Cornu Spiral",
      "Rounded Star with Spiral",
      "Skierpinski with Gear curve",
      "Skierpinski carpet with Supershape",
      "Snake kolam with Tear curve",
      "Square Skierpinski with Cornu Spiral",
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
      case "ADH231a with Archimedes Spiral":
        this.currentExample = this.data.ADH231a_with_Archimedes_Spiral;
        break;
      case "ADH231a with Astroid Curve":
        this.currentExample = this.data.ADH231a_with_Astroid_Curve;
        break;
      case "ADH231a with Supershape Curve":
        this.currentExample = this.data.ADH231a_with_Supershape_Curve;
        break;
      case "ADH256a with Superellipse":
        this.currentExample = this.data.ADH256a_with_Superellipse;
        break;
      case "ADH256a with Kiss Curve":
        this.currentExample = this.data.ADH256a_with_Kiss_Curve;
        break;
      case "Board with Lissajous":
        this.currentExample = this.data.Board_with_Lissajous;
        break;
      case "Box with Ceva":
        this.currentExample = this.data.Box_with_Ceva;
        break;
      case "Crystal with Maltese Cross":
        this.currentExample = this.data.Crystal_with_Maltese_Cross;
        break;
      case "Crystal with Supershape":
        this.currentExample = this.data.Crystal_with_Supershape;
        break;
      case "Dragon2 with Gear Curve":
        this.currentExample = this.data.Dragon2_with_Gear_Curve;
        break;
      case "Dragon2 with Cornu Spiral":
        this.currentExample = this.data.Dragon2_with_Cornu_Spiral;
        break;
      case "Dragon1 with Astroid Curve":
        this.currentExample = this.data.Dragon1_with_Astroid_Curve;
        break;
      case "Doily with Bicorn Curve":
        this.currentExample = this.data.Doily_with_Bicorn;
        break;
      case "Doily with Supershape Curve":
        this.currentExample = this.data.Doily_with_supershape;
        break;
      case "Hilbert Ruleset with Clover Curve":
        this.currentExample = this.data.Hilbert_Curve_with_Clover_Curve;
        break;
      case "Hilbert Ruleset with Eight Curve":
        this.currentExample = this.data.Hilbert_Curve_with_Eight_Curve;
        break;
      case "Hilbert Ruleset with Gear Curve":
        this.currentExample = this.data.Hilbert_Curve_with_Gear_Curve;
        break;
      case "Hilbert Ruleset with Kiss Curve":
        this.currentExample = this.data.Hilbert_Curve_with_Kiss_Curve;
        break;
      case "Hilbert Ruleset with Quadrifolium Curve":
        this.currentExample = this.data.Hilbert_Curve_with_Quadrifolium_Curve;
        break;
      case "Koch snowflake with Bicorn curve":
        this.currentExample = this.data.Koch_snowflake_with_Bicorn_curve;
        break;
      case "Koch snowflake with Kiss curve":
        this.currentExample = this.data.Koch_snowflake_with_Kiss_curve;
        break;
      case "Koch snowflake with Quadrilateral":
        this.currentExample = this.data.Koch_snowflake_with_Quadrilateral;
        break;
      case "Koch snowflake with Supershape":
        this.currentExample = this.data.Koch_snowflake_with_Supershape;
        break;
      case "Koch snowflake with Word":
        this.currentExample = this.data.Koch_snowflake_with_Word;
        break;
      case "Kolam with Butterfly":
        this.currentExample = this.data.Kolam_with_Butterfly;
        break;
      case "Kolam with Ceva":
        this.currentExample = this.data.Kolam_with_Ceva_Curve;
        break;
      case "Kolam with Gear Curve":
        this.currentExample = this.data.Kolam_with_Gear_Curve;
        break;
      case "Kolam with Deltoid":
        this.currentExample = this.data.Kolam_with_Deltoid;
        break;
      case "Kolam with Image":
        this.currentExample = this.data.Kolam_with_Image;
        break;
      case "Krishna Anklet with Gear Curve":
        this.currentExample = this.data.Krishna_Anklet_with_Gear_Curve;
        break;
      case "Krishna Anklet with Gear Curve (Background)":
        this.currentExample =
          this.data.Background_Krishna_Anklet_with_Gear_Curve;
        break;
      case "Mango Leaf with Flower Curve":
        this.currentExample = this.data.Mango_Leaf_with_Flower_Curve;
        break;
      case "Mango Leaf with Rose Curve":
        this.currentExample = this.data.Mango_Leaf_with_Rose_Curve;
        break;
      case "Peano with Cassini Oval":
        this.currentExample = this.data.Peano_with_Cassini_Oval;
        break;
      case "Peano with Quadrilateral Curve":
        this.currentExample = this.data.Peano_with_Quadrilateral_Curve;
        break;
      case "Pentaplexity with Gear Curve":
        this.currentExample = this.data.Pentaplexity_with_Gear_Curve;
        break;
      case "Pentaplexity with Supershape Curve":
        this.currentExample = this.data.Pentaplexity_with_Supershape_Curve;
        break;
      case "Quadratic gosper with Kiss curve":
        this.currentExample = this.data.Quadratic_gosper_with_Kiss_curve;
        break;
      case "Quadratic Snowflake with Quadrifolium curve":
        this.currentExample =
          this.data.Quadratic_snowflake_with_Quadrifolium_curve;
        break;
      case "Rounded Star with Cornu Spiral":
        this.currentExample = this.data.Rounded_Star_with_Cornu_Spiral;
        break;
      case "Rounded Star with Spiral":
        this.currentExample = this.data.Rounded_Star_with_Spiral;
        break;
      case "Skierpinski with Gear curve":
        this.currentExample = this.data.Skierpinski_with_Gear_curve;
        break;
      case "Skierpinski carpet with Supershape":
        this.currentExample = this.data.Skierpinski_carpet_with_Supershape;
        break;
      case "Snake kolam with Tear curve":
        this.currentExample = this.data.Snake_kolam_with_Tear_curve;
        break;
      case "Square Skierpinski with Cornu Spiral":
        this.currentExample = this.data.Square_Skierpinski_with_Cornu_Spiral;
        break;

      // case "koch_snowflake":
      //   this.currentExample = this.data.koch_snowflake;
      //   break;
      // case "leaf":
      //   this.currentExample = this.data.leaf;
      //   break;
    }
  }

  setExample() {
    let ruleset = this.currentExample.ruleset; // 0
    let shape = this.currentExample.shape; // 1
    let backgroundColor = this.currentExample.background_color; // 2
    let strokePalette = this.currentExample.stroke_palette; // 3
    let fillPalette = this.currentExample.fill_palette; // 4
    let addStroke = this.currentExample.add_stroke; // 5
    let fillShape = this.currentExample.fill_shape; // 6
    let addp5Grain = this.currentExample.add_grain; // 7
    let wadj = this.currentExample.wadj; // 8
    let hadj = this.currentExample.hadj; // 9
    let level = this.currentExample.level; // 10
    let sw = this.currentExample.strokeWeight; // 11
    let strokeAlpha = this.currentExample.strokeAlpha; // 12
    let fillAlpha = this.currentExample.fillAlpha; // 13
    let fractalAngle = radians(this.currentExample.fractal_angle); //14
    let length = this.currentExample.length * width; // 15
    let shapeScale = this.currentExample.shapeScale; // 16
    let a = this.currentExample.a; // 17
    let b = this.currentExample.b; // 18
    let m = this.currentExample.m; // 19
    let n = this.currentExample.n; // 20
    let n1 = this.currentExample.n1; // 21
    let n2 = this.currentExample.n2; // 22
    let n3 = this.currentExample.n3; // 23
    let d = this.currentExample.d; // 24
    let shapeAngle = radians(this.currentExample.shape_angle); // 25

    return [
      ruleset,
      shape,
      backgroundColor,
      strokePalette,
      fillPalette,
      addStroke,
      fillShape,
      addp5Grain,
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
      d,
      shapeAngle,
    ];
  }
}
