// https://github.com/kfahn22/L-System-Pattern-Generator
// https://editor.p5js.org/kfahn/sketches/KmKxgvx03

// Lsystem data from rules.json
let rulesetData;

// Control variables
let images = [];

// Array to store dropdowns, sliderGroup, sliders, checkBoxes
let lsystem0;
let ruleChoice0 = "ADH231a";
let shapeChoice0 = "Rose";
let sliderValues0 = [
  175,
  0.05, // wadj
  0.5, // hadj
  3, // level
  1, // strokeWeight
  220, // stroke alpha
  150, // fill alpha
  0, // fractal angle
  0.023, // length
  0.4, // shapeScale
  3.8, // a
  1, // b
  8, // m
  1, // n1
  0.8, // n2
  1, // n3
  1, // n
  0, // shape angle
];

let lsystem1;
let ruleChoice1 = "ADH231a";
let shapeChoice1 = "Supershape";
let sliderValues1 = [
  1300,
  0.05, // wadj
  0.5, // hadj
  3, // level
  1, // strokeWeight
  220, // stroke alpha
  150, // fill alpha
  0, // fractal angle
  0.023, // length
  0.4, // shapeScale
  3.8, // a
  1, // b
  8, // m
  1, // n1
  0.8, // n2
  1, // n3
  1, // n
  0, // shape angle
];
let lsystems = [];

// Message variables
let ruleWarning = [null, null]; // Warning if level gets too high
let shapeMessage; // Shape message RE parameters of choosen shape
let removeRuleset;

// Preload the L-system rulesets and example data
function preload() {
  rulesetData = loadJSON("rules.json");
  for (let i = 0; i < 10; i++) {
    const path = "images/flowers";
    images[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup() {
  canvas = createCanvas(800, 800);
  canvas.position(340, 75);
  canvas.id("mycanvas");
  p5grain.setup();

  lsystems.push(addLsystem(10, sliderValues0, ruleChoice0, shapeChoice0));
  lsystems.push(addLsystem(1150, sliderValues1, ruleChoice1, shapeChoice1));
  setSystemVariables(lsystems);
}

function updateValues(lsystem) {
  let controls = lsystem[0];
  let dropdowns = lsystem[1];
  let checkBoxes = lsystem[2];
  let sliderGroup = lsystem[3];
  let sliders = lsystem[4];
  let values = [];
  // Add ruleset, shape, palettes dropdown values
  for (let i = 0; i < dropdowns.length; i++) {
    //values.push(dropdowns[i].selected());
    values.push(dropdowns[i].value());
  }
  // Add values for addStroke, fillShape, and addP5Grain
  for (let i = 0; i < 3; i++) {
    values.push(checkBoxes[i].checked());
  }
  let sliderValues = sliderGroup.getValues();
  for (let s of sliderValues) {
    values.push(s);
  }
  sliderGroup.updateLabels();
  return values;
}

function handleInput(lsystem) {
  let dropdowns = lsystem[1];
  let checkBoxes = lsystem[2];
  let sliders = lsystem[4];

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
  ruleWarning.hide();
  setSystemVariables(lsystems);
}

function addLsystem(pos, sliderValues, ruleChoice, shapeChoice) {
  let lsystem = [];
  let controls = new AddControls(
    pos,
    sliderValues,
    rulesetData,
    ruleChoice,
    shapeChoice
  );
  lsystem[0] = controls;
  lsystem[1] = controls.returnDropdowns();
  lsystem[2] = controls.returnCheckboxes();
  lsystem[3] = controls.sliderGroup;
  lsystem[4] = controls.sliders;
  handleInput(lsystem);

  return lsystem;
}

function setSystemVariables(lsystems) {
  // Add array to hold the data of both Lsystem arrays
  let lsystemValues = [];
  let sliderValues = [];
  removeRuleset = lsystems[1][2][3];
  let n; // number of rulesets to render
  if (removeRuleset.checked()) {
    n = 1;
  } else {
    n = 2;
  }
  for (let i = 0; i < n; i++) {
    // Array to hold the data of each Lsystem
    let lsystemData = [];
    let controls = lsystems[i][0];
    let values = updateValues(lsystems[i]);

    // Set color palettes
    let [currentBackgroundPalette, currentStrokePalette, currentFillPalette] =
      controls.setPalettes(
        values[2], // backgroundPalette
        values[3], // strokePalette
        values[4] // fillPalette
      );

    background(currentBackgroundPalette[0]);

    let ruleset = controls.ruleset;
    let shape_ui = controls.shape_ui;

    // Check to see whether addStroke and/or fillShape are checked
    // Set value of colorMode to 0,1,2 depended on state of variables
    let clrMode = null;
    if (values[5] === true && values[6] === false) {
      clrMode = 0;
    } else if (values[5] === false && values[6] === true) {
      clrMode = 1;
    } else if (values[5] === true && values[6] === true) {
      clrMode = 2;
    }

    lsystemData[0] = values;
    lsystemData[1] = shape_ui;
    lsystemData[2] = ruleset;
    lsystemData[3] = currentStrokePalette;
    lsystemData[4] = currentFillPalette;
    lsystemData[5] = clrMode;
    lsystemValues[i] = lsystemData;
  }

  let turtle = new Turtle(lsystemValues, images);

  let shapeChoices = [];
  let ruleChoices = [];

  // colorMode (addStroke, fillShape)
  for (let i = 0; i < n; i++) {
    let dropdowns = lsystems[i][1];
    let ruleset = lsystemValues[i][2];
    let ruleChoice = dropdowns[0].value();
    shapeChoices.push(lsystems[i][1][1].value());
    ruleChoices.push(ruleChoice);
    //console.log(ruleChoices)
    ruleset.selectRule(ruleChoice);
    let lsystemData = ruleset.currentFractal;

    // Get Shape data
    sliderValues.push(lsystemValues[i][0].slice(-17));

    let clrMode = lsystemValues[i][5];
    let currentStrokePalette = lsystemValues[i][3];
    let currentFillPalette = lsystemValues[i][4];

    if (clrMode == 0 || clrMode == 1) {
      // Pass value of colorMode to turtle to indicate whether stroke or fill should be used to render Lsystem
      turtle.addLsystem(
        lsystemData,
        shapeChoices,
        clrMode,
        currentStrokePalette,
        currentFillPalette,
        sliderValues,
        i,
        ruleChoices
      );
    } else if (clrMode == 2) {
      // If both stroke and fill are checked, render the L-system twice, resetting the sentence between renders. If both are rendered at same time stroke shows through the fill (because looks best with alpha < 255) and the pattern is not as nice
      turtle.addLsystemStrokeFill(
        lsystemData,
        shapeChoices,
        currentStrokePalette,
        currentFillPalette,
        sliderValues,
        i,
        ruleChoices
      );
    }
  }
  // Add messages for shape parameters and rule level
  // Number of messages returned on number of rulesets
  shapeMessage = updateMessage(turtle.shape_messages, n);
  ruleWarning = updateMessage(turtle.ruleWarnings, n);
  addMessages(shapeMessage, ruleWarning, turtle.addWarning);
}

// This function adds a message if the choosen shape is a function of the parameters (a, b, m, n, n1, n2, n3)
// A warning is also added if the choosen level exceeds some limits I imposed to keep the sketch from slowing down significantly or freezing
function addMessages(shapeMessages, warnings) {
  let addMessage = true;
  let addWarning = true;
  let message = null;
  let warning = null;
  if (shapeMessages != null) {
    message = shapeMessages;
  } else addMessage = false;

  shapeMessage = createP(message);
  shapeMessage.position(340, 0);
  shapeMessage.addClass("p");

  if (addMessage) {
    shapeMessage.show();
  } else {
    shapeMessage.hide();
  }

  if (warnings != null) {
    warning = warnings;
  } else addWarning = false;

  ruleWarning = createP(warning);
  ruleWarning.position(340, 30);
  ruleWarning.addClass("p");

  if (addWarning) {
    ruleWarning.show;
  } else {
    ruleWarning.hide();
  }
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

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "k" || key === "K") {
    save("img.jpg");
  }
}
