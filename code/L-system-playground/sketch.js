// https://github.com/kfahn22/L-System-Pattern-Generator
// https://editor.p5js.org/kfahn/sketches/KmKxgvx03

// Lsystem data from rules.json
let rulesetData;

// Control variables
let images = [];

let backgroundDropdown;
let syncVariables; // checkbox for whether the same translation and length variables are used for both Lsystems

//let sliderPos = 0;
let dropdownPos = 250;
let canvasPos = dropdownPos + 200;

let sliderValues0 = {
  sliderPos: 10,
  colorValues: {
    strokeWeight: 1,
    strokeAlpha: 220,
    fillAlpha: 240,
  },
  systemValues: {
    wadj: 0.05,
    hadj: 0.5,
    level: 3,
    length: 0.023,
    fractalAngle: 0,
  },
  shapeValues: {
    shapeScale: 0.4,
    a: 3.8,
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
  sliderPos: 1500,
  colorValues: {
    strokeWeight: 1,
    strokeAlpha: 220,
    fillAlpha: 150,
  },
  systemValues: {
    wadj: 0.05,
    hadj: 0.5,
    level: 3,
    fractalAngle: 0,
    length: 0.023,
  },
  shapeValues: {
    shapeScale: 0.4,
    a: 4.1,
    b: 3.8,
    m: 8,
    n1: 1,
    n2: 0.8,
    n3: 1,
    n: 1,
    d: 5,
    shapeAngle: 0,
  },
};

// arrays to store dropdowns, sliderGroup, sliders, checkBoxes
let lsystems = [];
let sliderArrays = [sliderValues0, sliderValues1];
let ruleChoices = ["ADH231a", "ADH231a"];
let shapeChoices = ["Flower", "Supershape"];
let strokeChoices = ["orange", "orange"];
let fillChoices = ["purplePalette", "bluePalette"];

// Message variables
let ruleWarning = [null, null]; // Warning if level gets too high
let shapeMessage; // Shape message RE parameters of choosen shape
let removeRuleset;
let addp5Grain = []; // checkbox re whether to add p5grain, default false

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
  canvas.position(canvasPos, 95);
  canvas.id("mycanvas");
  p5grain.setup();

  //console.log(sliderValues0["systemValues"]["length"]);
  backgroundDropdown = new PaletteDropdown(
    dropdownPos,
    260,
    "black",
    "Background Color"
  );

  syncVariables = createCheckbox(
    "Use the same translation and length variables",
    true
  );
  syncVariables.position(canvasPos, 10);
  syncVariables.style("color", "white");

  for (let i = 0; i < 2; i++) {
    sliderArrays[i]["systemValues"]["length"] =
      sliderArrays[i]["systemValues"]["length"] * width;
    lsystems.push(
      addLsystem(
        i,
        dropdownPos + i * 1050,
        sliderArrays[i],
        ruleChoices[i],
        shapeChoices[i],
        strokeChoices[i],
        fillChoices[i]
      )
    );
  }

  setSystemVariables(lsystems);
}

function updateValues(lsystem) {
  backgroundDropdown.setPalette(backgroundDropdown.dropdown.value());
  let c = backgroundDropdown.palette;
  background(c[0]);
  let dropdowns = lsystem[1];
  let checkBoxes = lsystem[2];
  let sliderGroup = lsystem[3];
  let sliderValues = sliderGroup.getValues();
  let lsystemValues = {
    dropdowns: {
      rule: dropdowns[0].value(),
      shape: dropdowns[1].value(),
      stroke: dropdowns[2].value(),
      fill: dropdowns[3].value(),
    },
    checkBoxes: {
      addStroke: checkBoxes[0].checked(),
      fillShape: checkBoxes[1].checked(),
      addp5Grain: checkBoxes[2].checked(),
      removeRuleset: checkBoxes[3].checked(),
    },
    sliderValues: {
      colorValues: {
        strokeWeight: sliderValues[0],
        strokeAlpha: sliderValues[1],
        fillAlpha: sliderValues[2],
      },
      systemValues: {
        wadj: sliderValues[3],
        hadj: sliderValues[4],
        level: sliderValues[5],
        fractalAngle: sliderValues[6],
        length: sliderValues[7],
      },
      shapeValues: {
        length: sliderValues[7],
        shapeScale: sliderValues[8],
        a: sliderValues[9],
        b: sliderValues[10],
        m: sliderValues[11],
        n1: sliderValues[12],
        n2: sliderValues[13],
        n3: sliderValues[14],
        n: sliderValues[15],
        d: sliderValues[16],
        shapeAngle: sliderValues[17],
      },
    },
  };

  sliderGroup.updateLabels();
  return lsystemValues;
}

function handleInput(lsystem) {
  let dropdowns = lsystem[1];
  let checkBoxes = lsystem[2];
  let sliders = lsystem[4];
  backgroundDropdown.dropdown.changed(reset);
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

function addLsystem(
  index,
  pos,
  sliderValues,
  ruleChoice,
  shapeChoice,
  strokeChoice,
  fillChoice
) {
  let lsystem = [];
  let controls = new AddControls(
    index,
    pos,
    sliderValues,
    rulesetData,
    ruleChoice,
    shapeChoice,
    strokeChoice,
    fillChoice
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

    addp5Grain.push(values["checkBoxes"]["addp5Grain"]); // add addp5Grain checkBoxes to array

    // Set color palettes
    let [currentStrokePalette, currentFillPalette] = controls.setPalettes(
      values["dropdowns"]["stroke"], // strokePalette
      values["dropdowns"]["fill"] // fillPalette
    );

    // Check to see whether addStroke and/or fillShape are checked
    // Set value of colorMode to 0,1,2 depended on state of variables
    let clrMode = null;

    if (
      values["checkBoxes"]["addStroke"] === true &&
      values["checkBoxes"]["fillShape"] === false
    ) {
      clrMode = 0;
    } else if (
      values["checkBoxes"]["addStroke"] === false &&
      values["checkBoxes"]["fillShape"] === true
    ) {
      clrMode = 1;
    } else if (
      values["checkBoxes"]["addStroke"] === true &&
      values["checkBoxes"]["fillShape"] === true
    ) {
      clrMode = 2;
    }

    lsystemData = {
      LsystemValues: values,
      Shape_UI: controls.shape_ui,
      ruleset: controls.ruleset,
      palettes: {
        strokePalette: currentStrokePalette,
        fillPalette: currentFillPalette,
      },
      ColorMode: clrMode,
    };

    lsystemValues[i] = lsystemData;
  }

  let turtle = new Turtle(lsystemValues, images);

  let shapeChoices = [];
  let ruleChoices = [];

  // colorMode (addStroke, fillShape)
  for (let i = 0; i < n; i++) {
    let ruleset = lsystemValues[i]["ruleset"];
    let ruleChoice = lsystemValues[i]["LsystemValues"]["dropdowns"]["rule"];
    shapeChoices.push(lsystemValues[i]["LsystemValues"]["dropdowns"]["shape"]);
    ruleChoices.push(ruleChoice);
    ruleset.selectRule(ruleChoice);
    let lsystemData = ruleset.currentFractal;

    // Whether same translation and grid length should be used for all L-systems
    if (syncVariables.checked() && n == 2) {
      lsystemValues[1]["LsystemValues"]["sliderValues"]["systemValues"][
        "wadj"
      ] =
        lsystemValues[0]["LsystemValues"]["sliderValues"]["systemValues"][
          "wadj"
        ];
      lsystemValues[1]["LsystemValues"]["sliderValues"]["systemValues"][
        "hadj"
      ] =
        lsystemValues[0]["LsystemValues"]["sliderValues"]["systemValues"][
          "hadj"
        ];
      lsystemValues[1]["LsystemValues"]["sliderValues"]["systemValues"][
        "length"
      ] =
        lsystemValues[0]["LsystemValues"]["sliderValues"]["systemValues"][
          "length"
        ];
    }

    sliderValues.push(lsystemValues[i]["LsystemValues"]["sliderValues"]);
    let clrMode = lsystemValues[i]["ColorMode"];
    let currentStrokePalette = lsystemValues[i]["palettes"]["strokePalette"];
    let currentFillPalette = lsystemValues[i]["palettes"]["fillPalette"];

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

    //console.log(addp5Grain[i])
    if (addp5Grain[i]) {
      applyChromaticGrain(42);
    }
  }
  // Add messages for shape parameters and rule level
  // Number of messages returned on number of rulesets
  shapeMessage = updateMessage(turtle.shape_messages, n);
  ruleWarning = updateMessage(turtle.ruleWarnings, n);
  addMessages(shapeMessage, ruleWarning, turtle.addWarning);
}

// This function adds a message if the choosen shape is a function of the parameters (a, b, m, n, n1, n2, n3, d)
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
  shapeMessage.position(canvasPos, 30);
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
  ruleWarning.position(canvasPos, 60);
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
