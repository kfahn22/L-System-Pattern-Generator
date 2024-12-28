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
      "Bicorn",
      "Box",
      "Butterfly",
      "Cannibus",
      "Cassini Oval",
      "Ceva",
      "Clover",
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
      "Pinwheel",
      "Polygon",
      "Quadrifolium",
      "Rose",
      "Flower",
      "Spiral",
      "Superellipse",
      "Supershape",
      "Tear Drop",
      "Windmill",
      "Word",
      "Zigzag",
    ];

    // Add shape options to the dropdown
    shapes.forEach((shape) => this.dropdown.option(shape));
    this.dropdown.selected(this.choice);
  }

  // Create a shape based on the selected option
  selectShape(shapeName, shapeValues) {
    if (shapeName == "Line") {
      shapeValues.shapeScale = 0.5;
    }
    // Create a new Shape object with necessary parameters
    this.shape = new Shape(
      shapeValues.length * shapeValues.shapeScale,
      shapeValues.a,
      shapeValues.b,
      shapeValues.m,
      shapeValues.n1,
      shapeValues.n2,
      shapeValues.n3,
      shapeValues.n,
      shapeValues.d,
      radians(shapeValues.shapeAngle)
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
      // This works but is very energy intensive
      // It would be better to add as images
      // case "Chrysanthemum":
      //   this.shape.chrysanthemum();
      //   break;
      case "Clover":
        this.shape.clover();
        this.addMessage = true;
        this.message = "The clover curve is a f(m)";
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
      case "Flower":
        // I have added a constraint on the value of b to keep the sketch from freezing
        this.shape.flower();
        this.addMessage = true;
        this.message = "The flower curve is a f(a, m)";
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
      case "Pinwheel":
        this.shape.pinwheel();
        this.addMessage = true;
        this.message = "The pinwheel curve is a f(m, n). Start: m=2, n= 1";
        break;
      case "Polygon":
        this.shape.polygon();
        this.addMessage = true;
        this.message = "The polygon curve is a f(m).";
        break;
      case "Quadrifolium":
        this.shape.quadrifolium();
        break;
      case "Rose":
        this.shape.rose();
        this.addMessage = true;
        this.message = "The rose curve is a f(d, m). Start: d=5, m=8";
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
        this.addMessage = true;
        this.message = "The zigzag curve is a f(a, n).";
      default:
        break;
    }
  }
}
