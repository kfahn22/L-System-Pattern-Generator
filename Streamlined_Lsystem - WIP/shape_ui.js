class ShapeUI {
  constructor(
    posSliders,
    posDropdown,
    strokePalette,
    fillPalette,
    fillShape,
    addStroke
  ) {
    this.posSliders = posSliders; // Position for the dropdown
    this.posDropdown = posDropdown;
    this.strokePalette = strokePalette;
    this.fillPalette = fillPalette;
    this.fillShape = fillShape;
    this.addStroke = addStroke;
    this.choice = "Gear";
    this.message = null;
    this.addMessage = false;
    // Create an instance of the SliderGroup class
    this.sliderGroup = new SliderGroup(
      posSliders,
      "sliderSet1",
      0.5,
      0.5,
      2,
      20,
      2,
      150,
      0.5,
      0,
      0,
      1,
      1,
      6,
      1,
      1,
      1,
      1
    );
    this.sliders = this.sliderGroup.sliders;
    this.values = this.sliderGroup.getValues();
    this.shape = null;
    this.dropdown = createSelect(); // Create a select element
    this.dropdown.position(this.posDropdown, 10); // Position the dropdown
    this.setupDropdown(); // Initialize dropdown with options
  }

  // Populate the dropdown with shape options
  setupDropdown() {
    const shapes = [
      "Archimedes Spiral",
      "Arc",
      "Astroid",
      "Atom",
      "Bicorn",
      "Box",
      "Cassini Oval",
      "Ceva",
      "Cornu Spiral",
      "Maltese Cross",
      "Deltoid",
      "Eight",
      "Gear",
      "Heart",
      "Kiss Curve",
      "Knot",
      "Line",
      "Quadrifolium",
      "Quadrilateral",
      "Rose",
      "Superellipse",
      "Supershape",
      "Tear Drop",
    ];

    // Add shape options to the dropdown
    shapes.forEach((shape) => this.dropdown.option(shape));
    this.dropdown.selected(this.choice);

    // Add change event listener to the dropdown
    //this.dropdown.changed(() => this.selectShape());
  }

  // Called when a shape is selected from the dropdown
  selectShape() {
    //const shapeName = this.dropdown.value();
    // Get values from sliders
    this.values = this.sliderGroup.getValues();
    this.sliderGroup.reset();
    this.createShape();
  }

  // sliders - wadj,hadj,level,length,strokeweight, shapeAlpha,sc,rot,rotateShape,a,b,m,n,n1,n2, n3
  // Create a shape based on the selected option
  createShape() {
    // Clear the canvas and reset shapes
    let shapeName = this.dropdown.value();
    let r = this.values[3] * this.values[6]; // gridlength * shapeScale
    // Create a new Shape object with necessary parameters
    this.shape = new Shape(
      0, // x
      0, // y
      r, // this.values[3], // r
      this.values[9], // a
      this.values[10], // b
      this.values[11], // m
      this.values[12], // n
      this.values[13], // n1
      this.values[14], // n2
      this.values[15], // n3
      this.values[8] // rotateShape
    );

    this.shape.points = []; // Clear any existing points
    this.message = null; // Clear out any prior message;
    // Use a switch statement to call the corresponding method
    switch (shapeName) {
      case "Archimedes Spiral":
        this.shape.archimedesSpiral();
        this.addMessage = true;
        this.message = "The archimedes spiral is a f(n).";
        break;
      case "Arc":
        this.shape.arc();
        this.addMessage = true;
        this.message = "Arc is a f(a), a = 2 yields a circle";
        break;
      case "Astroid":
        this.shape.astroid();
        this.addMessage = true;
        this.message = "The astroid is a f(a).";
        break;
      case "Atom":
        this.shape.atom();
        break;
      case "Bicorn":
        this.shape.bicorn();
        break;
      case "Box":
        this.shape.box();
        break;
      case "Cassini Oval":
        this.shape.cassiniOval();
        this.addMessage = true;
        this.message = "The cassini oval curve is a f(a, b).";
        break;
      case "Ceva":
        this.shape.ceva();
        break;
      case "Cornu Spiral":
        this.shape.cornuSpiral();
        this.addMessage = true;
        this.message = "The cornu spiral is f(a), a ~ [0.5, 2]";
        break;
      case "Maltese Cross":
        this.shape.malteseCross();
        this.addMessage = true;
        this.message = "The cross curve is a f(a, b).";
        break;
      case "Deltoid":
        this.shape.deltoid();
        break;
      case "Eight":
        this.shape.eight();
        break;
      case "Gear":
        this.shape.gear();
        this.addMessage = true;
        this.message = "The gear curve is a f(a, b, m).";
        break;
      case "Heart":
        this.shape.heart();
        break;
      case "Kiss Curve":
        this.shape.kissCurve();
        this.addMessage = true;
        this.message = "The kiss curve is a f(a, b).";
        break;
      case "Knot":
        this.shape.knot();
        break;
      case "Line":
        this.shape.showLine();
        break;
      case "Quadrifolium":
        this.shape.quadrifolium();
        break;
      case "Quadrilateral":
        this.shape.quadrilaterial();
        this.addMessage = true;
        this.message = "The quadrilaterial curve is a f(m).";
        break;
      case "Rose":
        this.shape.rose();
        break;
      case "Superellipse":
        this.shape.superellipse();
        this.addMessage = true;
        this.message = "The superellipse curve is a f(a, b, n).";
        break;
      case "Supershape":
        this.shape.supershape();
        this.addMessage = true;
        this.message = "The supershape curve is a f(a, b, m, n, n1, n2, n3).";
        break;
      case "Tear Drop":
        this.shape.tearDrop();
        break;
      default:
        break;
    }
  }

  showShape(strokePalette, fillPalette) {
    //this.adjustFill(strokePalette, fillPalette);
    let shapeName = this.dropdown.value();
    let openShapes = [
      // "half_arc",
      "Arc",
      "Archimedes Spiral",
      "Cornu Spiral",
      // "spiral",
      // "zigzig",
    ];
    push();
    translate(0, 0);
    // Draw the shape on the canvas
    if (openShapes.includes(shapeName)) {
      this.shape.openShow();
    } else {
      this.shape.show();
    }
    pop();
  }

  adjustFill(fillPalette, strokePalette) {
    let fp = random(fillPalette);
    let sp = random(strokePalette);
    let sw = this.values[4];
    let a = this.values[5];
    fp[3] = a;
    sp[3] = a;
    if (
      this.fillShape.checked() === true &&
      this.addStroke.checked() === true
    ) {
      strokeWeight(sw);
      stroke(sp);
      fill(fp);
    } else if (
      this.fillShape.checked() === false &&
      this.addStroke.checked() === true
    ) {
      noFill();
      strokeWeight(sw);
      stroke(sp);
    } else if (
      this.fillShape.checked() === true &&
      this.addStroke.checked() === false
    ) {
      strokeWeight(sw);
      noStroke();
      fill(fp);
    }
  }
}
