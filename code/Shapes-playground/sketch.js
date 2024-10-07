// https://github.com/kfahn22/L-System-Pattern-Generator

// Control variables
let controls;
let sliderGroup;
let sliders = []; // Array to store slider references
let dropdowns = []; // Array to store dropdowns
let shape_ui;

// Message variables
let shapeMessage; // Shape message re parameters to choosen shape

// Buttons/checkboxes
// addStroke , fillShape
let checkBoxes;

function setup() {
  canvas = createCanvas(800, 800);
  canvas.position(250, 75);
  canvas.id("mycanvas");
  background(0);
  controls = new AddControls(10);
  addControls();

  let values = updateValues();
  let shapeValues = values.slice(-9);
  let shape_ui = controls.shape_ui;
  //shape_ui.selectShape("Supershape", shapeValues);
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
  shapeMessage.hide();

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

function addLsystem() {
  controls = new AddControls(10, 1250);
  addControls();

  let values = updateValues();
  setSystemVariables(values);
  // Add function to handle changes in sliders
  handleInput();
  return controls;
}

function addControls() {
  // Retrieve control objects
  dropdowns = controls.returnDropdowns();
  checkBoxes = controls.returnCheckboxes();
  sliderGroup = controls.sliderGroup;
  sliders = sliderGroup.sliders;
}

function setSystemVariables(values) {
  let backgroundChoice = controls.backgroundDropdown.dropdown.value();
  let strokeChoice = controls.strokeDropdown.dropdown.value();
  let fillChoice = controls.fillDropdown.dropdown.value();
  
  // The palette choices are aliases for urls
  // We need to create the palette using the url - refer to the palette-dropdown.js file
  // Use the url to set the palette
  let [currentBackgroundPalette, currentStrokePalette, currentFillPalette] =
    controls.setPalettes(backgroundChoice, strokeChoice, fillChoice);

  background(currentBackgroundPalette[0]);
  let sw = values[8];
  
  strokeWeight(sw);
  let addStroke = checkBoxes[0];
  let fillShape = checkBoxes[1];
  //console.log(values)
  if (addStroke.checked() && !fillShape.checked()) {
    stroke(currentStrokePalette[0]);
    noFill();
  } else if (!addStroke.checked() && fillShape.checked()) {
    fill(currentFillPalette[0]);
    noStroke();
  } else {
    stroke(currentStrokePalette[0]);
    fill(currentFillPalette[0]);
  }
  let shape_ui = controls.shape_ui;
  let shapeName = controls.shapeDropdown.value();
  let shapeValues = values.slice(-9);

  shape_ui.selectShape(shapeName, shapeValues);
  let shape = shape_ui.shape;
  let openShapes = ["Arc", "Cornu Spiral", "Lissajous", "Spiral", "Zigzag"];

  // Render the shape
  push();
  translate(width / 2, height / 2);
  if (shapeName == "Word") {
    this.shape.showWord();
  } else if (shapeName == "Image") {
    this.shape.showImage(images);
  } else if (openShapes.includes(shapeName)) {
    shape.openShow();
  } else {
    shape.show();
  }
  pop();

  // Add messages for shape parameters and rule level
  addMessages(shape_ui.message);
}

// This function adds a message if the choosen shape is a function of the parameters (a, b, m, n, n1, n2, n3)
// A warning is also added if the choosen level exceeds some limits I imposed to keep the sketch from slowing down significantly or freezing
function addMessages(newMessage) {
  let addMessage = true;
  let message = null;
  if (newMessage != null) {
    message = newMessage;
  } else addMessage = false;

  shapeMessage = createP(message);
  shapeMessage.position(250, 0);

  if (addMessage) {
    shapeMessage.show();
  } else {
    shapeMessage.hide();
  }
}
