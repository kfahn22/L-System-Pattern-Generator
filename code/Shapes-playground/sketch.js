// https://editor.p5js.org/kfahn/sketches/BK_t2uB-l
// Code created as a tool for https://github.com/kfahn22/L-System-Pattern-Generator

// Control variables
let controls;
let sliderGroup;
let sliders = []; // Array to store slider references
let dropdowns = []; // Array to store dropdowns
let shape_ui;
// Checkboxes: addStroke, fillShape
let checkBoxes;
let addShape;
let backgroundDropdown;

let shapeSystems = [];
let shapeSystem0;
let shapeChoice0 = "Flower";
let shapeChoice1 = "Gear";

// Can I lerp colors instead?
let strokeChoice0 = "blue";
let strokeChoice1 = "purple";
let fillChoice0 = "aqua";
let fillChoice1 = "blue";

// // Shape message re parameters to choosen shape
let shapeMessage = null;

let sliderValues0 = [
  2, // strokeWeight
  255, // stroke alpha
  150, // fill alpha
  0.0, // translate shape x
  0.0, // translate shape y
  0.1, // r
  1, // a
  1, // b
  8, // m
  1, // n1
  1, // n2
  1, // n3
  1, // n
  0, // shape angle
];

let sliderValues1 = [
  2, // strokeWeight
  255, // stroke alpha
  150, // fill alpha
  0.0, // translate shape x
  0.0, // translate shape y
  0.1, // r
  1, // a
  1, // b
  6, // m
  1, // n1
  1, // n2
  1, // n3
  1, // n
  0, // shape angle
];

function setup() {
  canvas = createCanvas(600, 600);
  canvas.position(240, 90);

  addShape = createCheckbox("Add second shape", false);
  addShape.position(400, 10);
  addShape.style("color", "white");

  backgroundDropdown = new PaletteDropdown(
    240,
    30,
    "white",
    "Background Color"
  );

  // Add the dropdowns, sliders, and checkboxes
  shapeSystems.push(
    addShapeSystem(10, sliderValues0, shapeChoice0, strokeChoice0, fillChoice0)
  );
  shapeSystems.push(
    addShapeSystem(870, sliderValues1, shapeChoice1, strokeChoice1, fillChoice1)
  );

  setShape(shapeSystems);
}

function updateValues(shapeSystem) {
  // let controls = shapeSystem[0];
  let dropdowns = shapeSystem[1];
  let checkBoxes = shapeSystem[2];
  let sliderGroup = shapeSystem[3];
  let values = [];
  // Add ruleset, shape, palettes dropdown values
  for (let i = 0; i < dropdowns.length; i++) {
    values.push(dropdowns[i].selected());
  }
  // Add values for addStroke, fillShape, addShape
  for (let i = 0; i < 2; i++) {
    values.push(checkBoxes[i].checked());
  }

  // Add slider values
  let sliderValues = sliderGroup.getValues();
  for (let s of sliderValues) {
    values.push(s);
  }
  sliderGroup.updateLabels();

  return values;
}

function handleInput(shapeSystem) {
  backgroundDropdown.dropdown.changed(reset);
  let dropdowns = shapeSystem[1];
  let checkBoxes = shapeSystem[2];
  let sliders = shapeSystem[4];
  for (let d of dropdowns) {
    d.changed(reset);
  }
  for (let s of sliders) {
    s.input(reset);
  }
  for (let c of checkBoxes) {
    c.changed(reset);
  }
  addShape.changed(reset);
}

function reset() {
  clear();
  setShape(shapeSystems);
}

function addShapeSystem(
  pos,
  sliderValues,
  shapeChoice,
  strokeChoice,
  fillChoice
) {
  let shapeSystem = [];
  let controls = new AddControls(
    pos,
    sliderValues,
    shapeChoice,
    strokeChoice,
    fillChoice
  );
  shapeSystem[0] = controls;
  shapeSystem[1] = controls.returnDropdowns();
  shapeSystem[2] = controls.returnCheckboxes();
  shapeSystem[3] = controls.sliderGroup;
  shapeSystem[4] = controls.sliders;

  // Add function to handle changes in sliders
  handleInput(shapeSystem);
  return shapeSystem;
}

function setShape(shapeSystems) {
  let shapeSystemValues = [];

  let n; // # of shapes
  if (addShape.checked()) {
    n = 2;
  } else {
    n = 1;
  }

  // Get the color choices
  for (let i = 0; i < n; i++) {
    // Array to hold the data for each shape
    let shapeData = [];
    let controls = shapeSystems[i][0];
    let dropdowns = shapeSystems[i][1];
    let checkBoxes = shapeSystems[i][2];
    let values = updateValues(shapeSystems[i]);

    // Add all of the color choices to an array
    let colorChoices = [];
    let strokeName = values[1];
    let fillName = values[2];
    let sw = values[5];
    let [strokeChoice, fillChoice] = controls.getColors(strokeName, fillName);
    strokeChoice[3] = values[6];
    fillChoice[3] = values[7];
    let addStroke = checkBoxes[0];
    let fillShape = checkBoxes[1];

    colorChoices.push(strokeChoice);
    colorChoices.push(sw);
    colorChoices.push(addStroke);
    colorChoices.push(fillChoice);
    colorChoices.push(fillShape);

    shapeData[0] = controls;
    shapeData[1] = values;
    shapeData[2] = dropdowns;
    shapeData[3] = colorChoices;
    shapeSystemValues[i] = shapeData;
  }

  let shapes = [];
  let shapeNames = [];
  let shapeColorValues = [];
  let shapeMessages = [];
  // Catch-all array for arcs, spirals, lissajous, zigzag
  let openShapes = ["Arc", "Cornu Spiral", "Lissajous", "Spiral", "Zigzag"];

  for (let i = 0; i < n; i++) {
    let shapeSystem = shapeSystemValues[i];
    let controls = shapeSystem[0];
    let values = shapeSystem[1];
    let dropdowns = shapeSystem[2];

    shapeColorValues.push(shapeSystem[3]);

    let bkdropdown = backgroundDropdown.dropdown;
    background(bkdropdown.value());

    let shapeValues = values.slice(-11);
    let shape_ui = controls.shape_ui;
    let shapeName = dropdowns[0].value();
    shapeNames.push(shapeName);

    shape_ui.selectShape(shapeName, shapeValues);
    let shape = shape_ui.shape;
    shapes.push(shape);

    // Add shape messages
    let message = shape_ui.message;
    shapeMessages.push(message);
  }
  // Render the shape
  push();
  addColor(shapeColorValues[0], openShapes, shapeNames[0]);
  translate(width / 2, height / 2);
  if (openShapes.includes(shapeNames[0])) {
    shapes[0].openShow();
  } else {
    shapes[0].show();
  }
  pop();
  if (addShape.checked()) {
    push();
    addColor(shapeColorValues[1], openShapes, shapeNames[1]);
    translate(width / 2, height / 2);
    if (openShapes.includes(shapeNames[1])) {
      shapes[1].openShow();
    } else {
      shapes[1].show();
    }
    pop();
  }

  // let message = shape_ui.message;
  let messages = updateMessage(shapeMessages, n);
  addMessages(messages);
}

// Adds a message if the choosen shape is a function of one of the shape parameters
function updateMessage(messages, n) {
  let message;
  if (n > 1) {
    if (
      (messages[0] == messages[1] && messages[0] != null) ||
      (messages[0] != null && messages[1] === null)
    ) {
      message = messages[0];
    } else if (
      messages[0] != null &&
      messages[1] != null &&
      messages[0] != messages[1]
    ) {
      message = messages[0] + " " + messages[1];
    } else if (messages[0] == null && messages[1] != null) {
      message = messages[1];
    } else if (messages[0] == null && messages[0] == null) {
      message = null;
    }
  } else {
    message = messages;
  }
  return message;
}

// This function adds a message if the choosen shape is a function of the parameters (a, b, m, n, n1, n2, n3)
function addMessages(message) {
  // If there's an old message, remove it
  if (shapeMessage) {
    shapeMessage.remove();
  }

  if (message) {
    shapeMessage = createP(message); // Create a new paragraph with the message
    shapeMessage.position(240, 25); // Set position for the message
    shapeMessage.style("font-size", "25px");
  }
}

function addColor(colorChoices, openShapes, shapeName) {
  let strokeChoice = colorChoices[0];
  let sw = colorChoices[1];
  let addStroke = colorChoices[2];
  let fillChoice = colorChoices[3];
  let fillShape = colorChoices[4];

  if (
    (addStroke.checked() && !fillShape.checked()) ||
    // Don't add fill for the arcs, spirals, lissajous, zigzag
    openShapes.includes(shapeName)
  ) {
    strokeWeight(sw);
    stroke(strokeChoice);
    noFill();
  } else if (!addStroke.checked() && fillShape.checked()) {
    fill(fillChoice);
    noStroke();
  } else {
    strokeWeight(sw);
    stroke(strokeChoice);
    fill(fillChoice);
  }
}
