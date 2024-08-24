// https://thecodingtrain.com/challenges/185-dragon-curve
// Buffer code from https://editor.p5js.org/giorgosdim/sketches/zvZLteLag

// The shape is set to astroid, but this can be changed. Look in the shape.js file for other options.

let buffer;
let rotationCenter;
let startPoint;
const DURATION = 3500;
let timeSinceGen = 0;
let shape;
let palette;

// Shape parameters
let shapeAngle; // angle of rotation for shape (not used. in this sketch)
let shapeScale; // variable to adjust size of shapes
let a;
let b;
let m;
let n;
let n1, n2, n3;

let scaleFactor;

// You can find other palettes at https://supercolorpalette.com

// purples
let url =
  "https://supercolorpalette.com/?scp=G0-hsl-D21FFF-9A1FFF-621FFF-2A1FFF-1F4BFF";

// blue-aqua
//let  url =
// "https://supercolorpalette.com/?scp=G0-hsl-1F75FF-1F87FF-1F9AFF-1FADFF-1FBFFF-1FD2FF-1FE5FF-1FF8FF";

// multi-color
// let url =
//   "https://supercolorpalette.com/?scp=G0-hsl-FF1FE1-FF1FF4-FFA91F-FF961F-1FFF39-1FFF26-1F75FF-1F87FF";

// debug mode shows rotation points and buffer's border
const DEBUG = false;

function setup() {
  createCanvas(600, 600);
  buffer = createGraphics(width, height);

  palette = createPaletteFromURL(url);
  // draw initial shape/image, can be anything but has to be centered
  buffer.strokeWeight(12);
  let [x, y, w, h] = [
    buffer.width / 2,
    buffer.height / 2,
    buffer.width / 4,
    buffer.height / 4,
  ];

  //buffer.noFill();
  length = buffer.width / 4;
  shapeAngle = radians(0);
  shape = new DragonShape(buffer, x - w / 2, y - h / 2, length, shapeAngle);

  // Need closed shape
  shape.astroid(1,1);
  //shape.deltoid(0.33);
  //shape.malteseCross(0.5, 2, 2.5);
  //shape.cassiniOval(0.1, 2, 2.25);
  //shape.heart(0.3);
  //shape.eight(0.7);
  //shape.gear(0.18, 3, 1, 6);
  //shape.kissCurve(0.5, 2,1);
  //shape.knot(0.33);
  //shape.quadrifolium(0.63); // 1 to overlap
  //shape.quadrilaterial(0.6, 6);
  //shape.rose(0.4, 2, 3, 8); //0.2 if don't want overlapping
  //shape.superellipse(0.5, 2, 1, 2);
  //shape.supershape(0.36, 1, 1, 6, 1, 1, 1, 1);
  //shape.tearDrop(0.9);
  shape.show(palette);

  // Need open shape
  //shape.cornuSpiral(0.66);
  //shape.archimedesSpiral(0.6);
  //shape.spiral(1, 1)
  //shape.openShow(palette);

  rotationCenter = createVector(w / 2, -h / 2);
  startPoint = createVector(w / 2, h / 2);
}

// helper function, image() + debug border if needed
function image2(buffer, x, y, col) {
  image(buffer, x, y);
  if (DEBUG) {
    noFill();
    strokeWeight(2);
    stroke(col);
    rect(x, y, buffer.width, buffer.height);
  }
}

function draw() {
  timeSinceGen += deltaTime;
  if (timeSinceGen >= DURATION) {
    timeSinceGen = 0;
    nextGeneration();
  }
  let progress01 = timeSinceGen / DURATION;

  background(0);
  translate(width / 2, height / 2);
  scale(1 / Math.pow(2, progress01 / 2));
  // draw non-moving shapes from buffer
  image2(buffer, -width / 2, -height / 2, "rgb(0,172,0)");

  // draw new rotated buffer
  translate(rotationCenter.x, rotationCenter.y);
  let angle = (progress01 * -PI) / 2;
  rotate(angle);
  translate(-rotationCenter.x, -rotationCenter.y);
  image2(buffer, -width / 2, -height / 2, "rgb(194,0,0)");

  // draw debug points
  if (DEBUG) {
    strokeWeight(8);
    stroke("#DF5811");
    point(rotationCenter.x, rotationCenter.y);
    stroke("#0f9dd7");
    point(startPoint.x, startPoint.y);
  }
}

function nextGeneration() {
  // Create a new buffer for the next generation
  let newBuffer = createGraphics(width, height);

  // Scale around the buffer center
  newBuffer.translate(width / 2, height / 2);
  newBuffer.scale(1 / sqrt(2));
  newBuffer.translate(-width / 2, -height / 2);

  // Draw the old buffer onto the new buffer
  newBuffer.image(buffer, 0, 0);

  // Add shape with new color
  shape.show(palette);

  // Rotate and draw the new buffer
  newBuffer.translate(
    width / 2 + rotationCenter.x,
    height / 2 + rotationCenter.y
  );
  newBuffer.rotate(-PI / 2);
  newBuffer.translate(
    -width / 2 - rotationCenter.x,
    -height / 2 - rotationCenter.y
  );
  newBuffer.image(buffer, 0, 0);

  // Replace the old buffer with the new one
  buffer = newBuffer;

  // Calculate the new rotation center
  let tmp = p5.Vector.sub(startPoint, rotationCenter);
  tmp.rotate(-PI / 2);
  rotationCenter.add(tmp);
  rotationCenter.div(sqrt(2));
  startPoint.div(sqrt(2));
}

// Helper functions to convert the url string to the palette array from chatGPT
function createPaletteFromURL(url) {
  // Extract the color codes from the URL using a regular expression
  let regex = /[0-9A-F]{6}/gi;
  let matches = url.match(regex);

  // Convert HEX codes to RGB and create the palette array
  let palette = matches.map((hex) => hexToRgb(hex));

  return palette;
}

// Helper function to convert HEX to RGB
function hexToRgb(hex) {
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  let a = 255;
  return [r, g, b, a];
}
