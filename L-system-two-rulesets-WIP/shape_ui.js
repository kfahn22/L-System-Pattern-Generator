class ShapeUI {
  constructor(posx, posy, choice, label) {
    this.choice = choice;
    this.shape = null;
    this.message = null;
    this.addMessage = false;
    this.dropdown = createSelect(); // Create a select element
    this.label = createP(label);
    this.label.position(posx, posy - 40);
    this.dropdown.position(posx, posy); // Position the dropdown
    this.setupDropdown(); // Initialize dropdown with options
  }

  // Populate the dropdown with shape options
  setupDropdown() {
    const shapes = [
      "Arc",
      "Astroid",
      // "Atom",
      "Bicorn",
      "Box",
      "Butterfly",
      "Cannibus",
      "Cassini Oval",
      "Ceva",
      "Cornu Spiral",
      "Craniod",
      "Deltoid",
      "Eight",
      "Gear",
      "Image",
      "Heart",
      "Kiss Curve",
      "Knot",
      "Line",
      "Lissajous",
      "Maltese Cross",
      "Quadrifolium",
      "Quadrilateral",
      "Rose",
      "Spiral",
      "Superellipse",
      "Supershape",
      "Tear Drop",
      "Word",
      "Zigzag",
    ];

    // Add shape options to the dropdown
    shapes.forEach((shape) => this.dropdown.option(shape));
    this.dropdown.selected(this.choice);
  }

  // Create a shape based on the selected option
  selectShape(shapeName, values) {
    let r = values[0] * values[1]; // gridlength * shapeScale
    // Create a new Shape object with necessary parameters
    this.shape = new Shape(
      r,
      values[2], // a
      values[3], // b
      values[4], // m
      values[5], // n1
      values[6], // n2
      values[7], // n3
      values[8], // n
      values[9] // rotateShape
    );

    this.shape.points = []; // Clear any existing points
    this.message = null; // Clear out any prior message;
    // Use a switch statement to call the corresponding method
    switch (shapeName) {
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
      // case "Atom":
      //   this.shape.atom();
      //   break;
      case "Bicorn":
        this.shape.bicorn();
        break;
      case "Box":
        this.shape.box();
        break;
      case "Butterfly":
        this.shape.butterfly();
        break;
      case "Cannibus":
        this.shape.cannibus();
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
      case "Craniod":
        this.shape.craniod();
        this.addMessage = true;
        this.message = "The craniod curve is a f(a, b, m).";
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
      case "Image":
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
      case "Lissajous":
        this.shape.lissajous();
        this.addMessage = true;
        this.message = "The lissajous curve is a f(a, b, m).";
        break;
      case "Maltese Cross":
        this.shape.malteseCross();
        this.addMessage = true;
        this.message = "The cross curve is a f(a, b).";
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
        // I have added a constraint on the value of b to keep the sketch from freezing
        this.shape.rose();
        this.addMessage = true;
        this.message = "The rose curve is a f(a, m)";
        break;
      case "Superellipse":
        this.shape.superellipse();
        this.addMessage = true;
        this.message = "The superellipse curve is a f(a, b, m).";
        break;
      case "Supershape":
        this.shape.supershape();
        this.addMessage = true;
        this.message = "The supershape curve is a f(a, b, m, n1, n2, n3).";
        break;
      case "Spiral":
        this.shape.spiral();
        this.addMessage = true;
        this.message = "The spiral is a f(a, n), n ~ [-1, 1]";
        break;
      case "Tear Drop":
        this.shape.tearDrop();
        break;
      case "Word":
        break;
      case "Zigzag":
        this.shape.zigzag();
        break;
      default:
        break;
    }
  }
}
