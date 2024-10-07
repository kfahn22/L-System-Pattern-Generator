// https://github.com/kfahn22/L-System-Pattern-Generator

// Control variables
let controls;
let sliderGroup;
let sliders = []; // Array to store slider references
let dropdowns = []; // Array to store dropdowns
let shape_ui;
// Checkboxes: addStroke, fillShape
let checkBoxes;

// // Shape message re parameters to choosen shape
let shapeMessage = null; 

// TODO fix sliders 

function setup() {
  canvas = createCanvas(800, 800);
  canvas.position(250, 75);

  // Add the dropdowns, sliders, and checkboxes
  controls = new AddControls(10);
  addControls();

  let values = updateValues();
  
  setSystemVariables(values);

  // Add function to handle changes in sliders
  handleInput();
}

function handleInput() {
  for (let d of dropdowns) {
    d.changed(reset);
  }
  for (let s of sliders) {
    s.input(reset);
  }
  for (let c of checkBoxes) {
    c.changed(reset);
  }
}

function reset() {
  clear();
  let values = updateValues();
  setSystemVariables(values);
}

function updateValues() {
  let values = [];
  // Add ruleset, shape, palettes dropdown values
  for (let i = 0; i < dropdowns.length; i++) {
    values.push(dropdowns[i].selected());
  }
  // Add values for addStroke, fillShape
  for (let i = 0; i < 2; i++) {
    values.push(checkBoxes[i].checked());
  }
  let sliderValues = sliderGroup.getValues();
  for (let s of sliderValues) {
    values.push(s);
  }
  sliderGroup.updateLabels();

  return values;
}

function addControls() {
  controls = new AddControls(10, 1250);
  dropdowns = controls.returnDropdowns();
  checkBoxes = controls.returnCheckboxes();
  sliderGroup = controls.sliderGroup;
  sliders = sliderGroup.sliders;

  let values = updateValues();
  setSystemVariables(values);
  // Add function to handle changes in sliders
  handleInput();
  return controls;
}

function setSystemVariables(values) {
  // Get the color choices
  let backgroundChoice = controls.backgroundDropdown.dropdown.value();
  let strokeChoice = controls.strokeDropdown.dropdown.value();
  let fillChoice = controls.fillDropdown.dropdown.value();
  let [currentBackgroundColor, currentStrokeColor, currentFillColor] =
    controls.getColors(backgroundChoice, strokeChoice, fillChoice);
  //console.log(values)
  background(currentBackgroundColor);
  let sw = values[6];
  strokeWeight(sw);
  let addStroke = checkBoxes[0];
  let fillShape = checkBoxes[1];

  let shape_ui = controls.shape_ui;
  let shapeName = controls.shapeDropdown.value();
  let shapeValues = values.slice(-9);

  shape_ui.selectShape(shapeName, shapeValues);
  let shape = shape_ui.shape;
  // Catch-all array for arcs, spirals, lissajous, zigzag
  let openShapes = ["Arc", "Cornu Spiral", "Lissajous", "Spiral", "Zigzag"];

  if (
    (addStroke.checked() && !fillShape.checked()) ||
    // Don't add fill for the arcs, spirals, lissajous, zigzag
    openShapes.includes(shapeName)
  ) {
    stroke(currentStrokeColor);
    noFill();
  } else if (!addStroke.checked() && fillShape.checked()) {
    fill(currentFillColor);
    noStroke();
  } else {
    stroke(currentStrokeColor);
    fill(currentFillColor);
  }

  // Render the shape
  push();
  translate(width / 2, height / 2);
  if (openShapes.includes(shapeName)) {
    shape.openShow();
  } else {
    shape.show();
  }
  pop();

  let message = shape_ui.message;
  addMessages(message)
}

// This function adds a message if the choosen shape is a function of the parameters (a, b, m, n, n1, n2, n3)
function addMessages(message) {
  // If there's an old message, remove it
  if (shapeMessage) {
    shapeMessage.remove();
  }

  if (message) {
    shapeMessage = createP(message); // Create a new paragraph with the message
    shapeMessage.position(250, 0); // Set position for the message
  }
}