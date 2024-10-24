// https://editor.p5js.org/kfahn/sketches/BK_t2uB-l
// Code created as a tool for https://github.com/kfahn22/L-System-Pattern-Generator
// https://github.com/kfahn22/shape_playground

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
let shapeChoices = ["Flower", "Gear"];
let strokeChoices = ["blue", "purple"];
let fillChoices = ["aqua", "blue"];

// // Shape message re parameters to choosen shape
let shapeMessage = null;

let sliderValues0 = {
  pos: 10,
  colorVariables: {
    strokeWeight: 2,
    strokeAlpha: 255,
    fillAlpha: 150,
  },
  shapeVariables: {
    wadj: 0,
    hadj: 0,
    r: 0.1,
    a: 1,
    b: 1,
    m: 8,
    n1: 1,
    n2: 1,
    n3: 1,
    n: 1,
    d: 5,
    shapeAngle: 0,
  },
};

let sliderValues1 = {
  pos: 950,
  colorVariables: {
    strokeWeight: 2,
    strokeAlpha: 255,
    fillAlpha: 150,
  },
  shapeVariables: {
    wadj: 0,
    hadj: 0,
    r: 0.1,
    a: 1,
    b: 1,
    m: 8,
    n1: 1,
    n2: 1,
    n3: 1,
    n: 1,
    d: 5,
    shapeAngle: 0,
  },
};

let sliderValues = [sliderValues0, sliderValues1];

function setup() {
  canvas = createCanvas(600, 600);
  canvas.position(300, 130);

  addShape = createCheckbox("Add second shape", false);
  addShape.position(600, 10);
  addShape.style("color", "white");

  backgroundDropdown = new PaletteDropdown(
    300,
    30,
    "white",
    "Background Color"
  );

  for (let i = 0; i < 2; i++) {
    sliderValues[i].shapeVariables.r = sliderValues[i].shapeVariables.r * width;
    shapeSystems.push(
      addShapeSystem(
        sliderValues[i],
        shapeChoices[i],
        strokeChoices[i],
        fillChoices[i]
      )
    );
  }

  setShape(shapeSystems);
}

function updateValues(shapeSystem) {
  let dropdowns = shapeSystem.dropdowns;
  let checkBoxes = shapeSystem.checkBoxes;
  let sliderGroup = shapeSystem.sliderGroup;
  let sliderValues = sliderGroup.getValues();

  let values = {
    dropdownValues: {
      shape: dropdowns.shapeDropdown.value(),
      stroke: dropdowns.strokeDropdown.value(),
      fill: dropdowns.fillDropdown.value(),
    },
    checkBoxes: {
      addStroke: checkBoxes.addStroke.checked(),
      fillShape: checkBoxes.fillShape.checked(),
    },
    sliderValues: {
      colorValues: {
        strokeWeight: sliderValues[0],
        strokeAlpha: sliderValues[1],
        fillAlpha: sliderValues[2],
      },
      shapeValues: {
        wadj: sliderValues[3],
        hadj: sliderValues[4],
        r: sliderValues[5],
        a: sliderValues[6],
        b: sliderValues[7],
        m: sliderValues[8],
        n1: sliderValues[9],
        n2: sliderValues[10],
        n3: sliderValues[11],
        n: sliderValues[12],
        d: sliderValues[13],
        shapeAngle: sliderValues[14],
      },
    },
  };
 sliderGroup.updateLabels();
  return values;
}

function handleInput(shapeSystem) {
  backgroundDropdown.dropdown.changed(reset);
  let dropdowns = shapeSystem.dropdowns;
  let checkBoxes = shapeSystem.checkBoxes;
  let sliders = shapeSystem.controls.sliders;
  dropdowns.shapeDropdown.changed(reset);
  dropdowns.strokeDropdown.changed(reset);
  dropdowns.fillDropdown.changed(reset);
  checkBoxes.addStroke.changed(reset);
  checkBoxes.fillShape.changed(reset);
  for (let s of sliders) {
    s.input(reset);
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
  let controls = new AddControls(
    pos,
    sliderValues,
    shapeChoice,
    strokeChoice,
    fillChoice
  );

  let shapeSystem = {
    controls: controls,
    dropdowns: controls.returnDropdowns(),
    checkBoxes: controls.returnCheckboxes(),
    sliderGroup: controls.sliderGroup,
    sliders: controls.sliders,
  };

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
    let controls = shapeSystems[i].controls;
    let dropdowns = shapeSystems[i].dropdowns;
    let checkBoxes = shapeSystems[i].checkBoxes;
    let values = updateValues(shapeSystems[i]);
    //console.log(values);
    let strokeName = values.dropdownValues.stroke;
    let fillName = values.dropdownValues.fill;
    let sw = values.sliderValues.colorValues.strokeWeight;
    let strokeAlpha = values.sliderValues.colorValues.strokeAlpha;
    let fillAlpha = values.sliderValues.colorValues.fillAlpha;

    let [strokeChoice, fillChoice] = controls.getColors(strokeName, fillName);

    colorChoices = {
      stroke: strokeChoice,
      addStroke: checkBoxes.addStroke,
      strokeAlpha: strokeAlpha,
      strokeWeight: sw,
      fill: fillChoice,
      fillAlpha: fillAlpha,
      fillShape: checkBoxes.fillShape,
    };

    shapeData = {
      controls: controls,
      shapeValues: values.sliderValues.shapeValues,
      dropdowns: dropdowns,
      shapeColor: colorChoices,
    };
    // Push the data for each shape to an array
    shapeSystemValues[i] = shapeData;
  }

  let shapes = [];
  let shapeNames = [];
  let shapeColorValues = [];
  let shapeMessages = [];
  // Catch-all array for miscellaneous curves that should not be rendered CLOSED
  let openShapes = [
    "Arc",
    "Cornu Spiral",
    "Lissajous",
    "Ophiuride",
    "Spiral",
    "Zigzag",
  ];

  for (let i = 0; i < n; i++) {
    let shapeSystem = shapeSystemValues[i];
    let controls = shapeSystem.controls;
    //let shapeValues = shapeSystem.shapeValues;
    let dropdowns = shapeSystem.dropdowns;

    shapeColorValues.push(shapeSystem.shapeColor);

    // Set background color
    let bkdropdown = backgroundDropdown.dropdown;
    backgroundDropdown.getColor(bkdropdown.value());
    background(backgroundDropdown.color);

    let shape_ui = controls.shape_ui;
    let shapeName = dropdowns.shapeDropdown.value();
    shapeNames.push(shapeName);

    shape_ui.selectShape(shapeName, shapeSystem.shapeValues);
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
      message = messages[0] + "<br>" + messages[1];
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
    shapeMessage.position(300, 50); // Set position for the message
    shapeMessage.style("font-size", "22px");
  }
}

function addColor(colorChoices, openShapes, shapeName) {
  let strokeChoice = colorChoices.stroke;
  let sw = colorChoices.strokeWeight;
  // Update the stroke alpha value
  strokeChoice[3] = colorChoices.strokeAlpha;
  let addStroke = colorChoices.addStroke;
  let fillChoice = colorChoices.fill;
  // Update the fill alpha value
  fillChoice[3] = colorChoices.fillAlpha;
  let fillShape = colorChoices.fillShape;

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

// Function to save the canvas as an image when 'k' key is pressed
function keyPressed() {
  if (key === "k" || key === "K") {
    save("img.jpg");
  }
}
