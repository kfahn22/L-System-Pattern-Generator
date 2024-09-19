// Adding filters with p5.FIP
// https://prontopablo.github.io/p5.FIP/

// Edited Fork of https://editor.p5js.org/prontopablo/sketches/2-UYUk2qP
// https://editor.p5js.org/kfahn/sketches/tQRLUAgD1

let layer,
  layer1,
  layer2,
  currentShaderIndex = 0,
  currentImageIndex = 0,
  images = [],
  customShaders = [],
  sliders = [],
  sliderLabels = [];


let blurRadius,
  cellSize,
  deformationAmount,
  dotSize,
  glitchIntensity,
  mosaicSize,
  pixelSize,
  rippleFrequency,
  rippleAmplitude,
  stippleDensity,
  threshold;

let currentShader;
let filterDropdown;

function preload() {
  // Load the shaders during preload
  customShaders.push(createShader(fip.defaultVert, fip.blend)); // 0
  customShaders.push(createShader(fip.defaultVert, fip.boxBlur)); //1
  customShaders.push(createShader(fip.defaultVert, fip.cannyEdgeDetection)); //2
  customShaders.push(createShader(fip.defaultVert, fip.cartoon)); //3
  customShaders.push(createShader(fip.defaultVert, fip.deform)); //4
  customShaders.push(createShader(fip.defaultVert, fip.differenceOfGaussian)); //5
  customShaders.push(createShader(fip.defaultVert, fip.dithering)); //6
  customShaders.push(createShader(fip.defaultVert, fip.dot)); //7
  customShaders.push(createShader(fip.defaultVert, fip.emboss)); //8
  customShaders.push(createShader(fip.defaultVert, fip.flip)); //9
  customShaders.push(createShader(fip.defaultVert, fip.gaussianBlur)); //10
  customShaders.push(createShader(fip.defaultVert, fip.glitch)); //11
  customShaders.push(createShader(fip.defaultVert, fip.halftone)); //12
  //customShaders.push(createShader(fip.defaultVert, fip.kuwahara)); //14
  customShaders.push(
    createShader(fip.defaultVert, fip.laplacianEdgeEnhancement)
  ); //13
  customShaders.push(createShader(fip.defaultVert, fip.moasic)); //14
  customShaders.push(createShader(fip.defaultVert, fip.pixelate)); //15
  customShaders.push(createShader(fip.defaultVert, fip.ripple)); //16
  customShaders.push(createShader(fip.defaultVert, fip.sketch)); //17
  customShaders.push(createShader(fip.defaultVert, fip.sobelEdgeDetection)); //18
  customShaders.push(createShader(fip.defaultVert, fip.static)); //19
  customShaders.push(createShader(fip.defaultVert, fip.vignette)); //20

  // load the images for filtering
  for (let i = 0; i < 14; i++) {
    const path = "assets";
    images[i] = loadImage(`${path}/${i}.jpg`);
  }
}

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.position(200, 50)
  layer = createFramebuffer();
  layer1 = createFramebuffer();
  layer2 = createFramebuffer();
  noStroke();

  let filterSliders = addSliders(
    10,
    3,
    4.0,
    0.1,
    0.008,
    0.8,
    12.0,
    0.01,
    50.0,
    0.01,
    0.99,
    0.2
  );
  sliders = filterSliders[0];
  sliderLabels = filterSliders[1];

  // filterDropdown = addFilterDropdown(300, 10, "0");
  filterDropdown = addFilterDropdown(300, 10, "Pixelate");
}

function draw() {
  background(0);

  // Draw a scene to a framebuffer
  layer.begin();
  clear();
  lights();
  scale(1, -1);
  image(images[currentImageIndex], -width / 2, -height / 2, width, height);
  layer.end();

  // Create a second framebuffer for blending
  layer1.begin();
  clear();
  lights();
  scale(1, -1);
  image(images[0], -width / 2, -height / 2, width, height);
  layer1.end();

  // Create a third framebuffer for blending
  layer2.begin();
  clear();
  lights();
  scale(1, -1);
  image(images[1], -width / 2, -height / 2, width, height);
  layer2.end();

  currentShader = filterDropdown.value();
 // currentShaderIndex = int(filterDropdown.value());
  switch (currentShader) {
    case "Blend":
      currentShaderIndex = 0;
      customShaders[currentShaderIndex].setUniform("texture1", layer1.color); // Blend
      customShaders[currentShaderIndex].setUniform("texture2", layer2.color);
      customShaders[currentShaderIndex].setUniform("mixFactor", 0.5);
      customShaders[currentShaderIndex].setUniform("blendingMode", 0);
      break;
    case "Box Blur":
      currentShaderIndex = 1;
      customShaders[currentShaderIndex].setUniform("blurRadius", blurRadius); // Box Blur
      break;
    case "Canny Edge Detection":
      customShaders[currentShaderIndex].setUniform("thresholdLow", 0.1); // Canny Edge Detection
      customShaders[currentShaderIndex].setUniform("thresholdHigh", 0.3);
      break;
    case "Cartoon":
      currentShaderIndex = 3;
      customShaders[currentShaderIndex].setUniform("edgeThreshold", 0.1); // Cartoon
      break;
    case "Deform":
      currentShaderIndex = 4; // Deform
      customShaders[currentShaderIndex].setUniform(
        "deformationAmount",
        deformationAmount
      );

      break;
    case "Difference of Gaussian":
      currentShaderIndex = 5;
      customShaders[currentShaderIndex].setUniform("radius1", 1.0); // Difference of Gaussian
      customShaders[currentShaderIndex].setUniform("radius2", 2.0);
      break;
    case "Dithering":
      currentShaderIndex = 6;
      customShaders[currentShaderIndex].setUniform("threshold", threshold); // Dithering
      break;
    case "Dot":
      currentShaderIndex = 7;
      customShaders[currentShaderIndex].setUniform("dotSize", dotSize); // Dot
      break;
    case "Emboss":
      currentShaderIndex = 8;
      customShaders[currentShaderIndex].setUniform("threshold", threshold); // Edge-Preserving
      break;
    case "Flip":
      currentShaderIndex = 9;
      customShaders[currentShaderIndex].setUniform("flipHorizontal", true); // Flip
      customShaders[currentShaderIndex].setUniform("flipVertical", true);
      break;
    case "Gaussian Blur":
      currentShaderIndex = 10;
      customShaders[currentShaderIndex].setUniform("gamma", 2.2);

      break;
    case "Glitch":
      currentShaderIndex = 11;
      customShaders[currentShaderIndex].setUniform(
        "glitchIntensity",
        glitchIntensity
      ); // Glitch

      break;
    case "Halftone":
      currentShaderIndex = 12;
      customShaders[currentShaderIndex].setUniform("cellSize", cellSize); // Halftone
      customShaders[currentShaderIndex].setUniform("threshold", threshold);

      break;
    case "Laplacian Edge Enhancement":
      currentShaderIndex = 13;
      customShaders[currentShaderIndex].setUniform("amount", 5.5); // Laplacian Edge Enhancement
      break;
    case "Mosaic":
      currentShaderIndex = 14;
      customShaders[currentShaderIndex].setUniform("mosaicSize", mosaicSize); // Mosaic
      break;
    case "Pixelate":
      currentShaderIndex = 15;
      customShaders[currentShaderIndex].setUniform("pixelSize", pixelSize); // Pixelate
      break;
    case "Ripple":
      currentShaderIndex = 16;
      customShaders[currentShaderIndex].setUniform(
        "rippleFrequency",
        rippleFrequency
      ); // Ripple
      customShaders[currentShaderIndex].setUniform(
        "rippleAmplitude",
        rippleAmplitude
      );
      break;
    // only difference between sketch and static are values
    case "Sketch":
      currentShaderIndex = 17;
      customShaders[currentShaderIndex].setUniform("threshold", threshold); // Sketch
      customShaders[currentShaderIndex].setUniform(
        "stippleDensity",
        stippleDensity
      );
      break;
    case "Sobel Edge Detection":
      currentShaderIndex = 18;
      customShaders[currentShaderIndex].setUniform("threshold", threshold); // Sobel Edge Detection
      break;
    case "Static":
      currentShaderIndex = 19;
      customShaders[currentShaderIndex].setUniform("threshold", threshold); // Static
      customShaders[currentShaderIndex].setUniform(
        "stippleDensity",
        stippleDensity
      );
      break;
    case "Vignette":
      currentShaderIndex = 20;
      customShaders[currentShaderIndex].setUniform("vignetteStrength", 0.3); // Vignette
      customShaders[currentShaderIndex].setUniform("vignetteFalloff", 1.0);
      customShaders[currentShaderIndex].setUniform("vignetteSign", 1.0);
      customShaders[currentShaderIndex].setUniform("vignetteSize", 1.0);
      break;
  }

  // Uniforms that most shaders need
  customShaders[currentShaderIndex].setUniform("texture", layer.color);
  customShaders[currentShaderIndex].setUniform("resolution", [width, height]);
  customShaders[currentShaderIndex].setUniform("uTextureSize", [width, height]);

  // Apply the shader
  shader(customShaders[currentShaderIndex]);
  rect(0, 0, width, height);
  resetShader();
}

function addSliders(
  pos,
  blurRadius,
  cellSize,
  deformationAmount,
  dotSize,
  glitchIntensity,
  mosaicSize,
  pixelSize,
  rippleFrequency,
  rippleAmplitude,
  stippleDensity,
  threshold
) {
  let mySliders = [];
  let sliderLabels = [];

  // blurRadius
  mySliders[0] = createSlider(1, 3, blurRadius, 1);
  sliderLabels[0] = createP("Blur Radius:");

  // cellSize
  mySliders[1] = createSlider(2.0, 10.0, cellSize, 1.0);
  sliderLabels[1] = createP("Cell Size:");

  // deformationAmount
  mySliders[2] = createSlider(0.01, 0.2, deformationAmount, 0.05);
  sliderLabels[2] = createP("Deformation Amount:");

  // dotSize
  mySliders[3] = createSlider(0.008, 0.01, dotSize, 0.001);
  sliderLabels[3] = createP("Dot Size:");

  // glitchIntensity
  mySliders[4] = createSlider(0.4, 0.8, glitchIntensity, 0.1);
  sliderLabels[4] = createP("Glitch Intensity:");

  // mosaicSize
  mySliders[5] = createSlider(5.0, 20.0, mosaicSize, 1.0);
  sliderLabels[5] = createP("Mosaic Size:");

  // pixelSize
  mySliders[6] = createSlider(0.01, 0.1, pixelSize, 0.01);
  sliderLabels[6] = createP("Pixel Size:");

  // rippleFrequency
  mySliders[7] = createSlider(10.0, 70.0, rippleFrequency, 5.0);
  sliderLabels[7] = createP("Ripple Frequency:");

  // rippleAmplitude
  mySliders[8] = createSlider(0.05, 0.2, rippleAmplitude, 0.05);
  sliderLabels[8] = createP("Ripple Amplitude:");

  // stippleDensity
  mySliders[9] = createSlider(0.9, 0.99, stippleDensity, 0.01);
  sliderLabels[9] = createP("Stipple Density:");

  // threshold
  mySliders[10] = createSlider(0.1, 0.3, threshold, 0.05);
  sliderLabels[10] = createP("Threshold: ");

  for (let i = 0; i < mySliders.length; i++) {
    mySliders[i].addClass("slider");
    //mySliders[i].id(idName);
    mySliders[i].position(pos + 10, 35 + i * 50);
    mySliders[i].input(reset);
    sliderLabels[i].position(mySliders[i].x, mySliders[i].y - 35);
    sliderLabels[i].style("color", "white");
  }
  updateLabels(mySliders, sliderLabels);
  return [mySliders, sliderLabels];
}

function addFilterDropdown(posx, posy, choice) {
  let filterDropdown;
  let filterOptions = [
    "Blend", // 0
    "Box Blur", // 1
    "Canny Edge Detection", //2
    "Cartoon", //3
    "Deform", //4
    "Difference of Gaussian", //5
    "Dithering", //6
    "Dot", //7
    "Emboss", //8
    "Flip", //9
    "Gaussian Blur", //10
    "Glitch", //11
    "Halftone", //12
    // "Kuwahara", //13
    "Laplacian Edge Enhancement", // 13
    "Mosaic", //14
    "Pixelate", //15
    "Ripple", //16
    "Sketch", //17
    "Sobel Edge Detection", //18
    "Static", //19
    "Vignette", //20
  ];

  filterDropdown = createSelect();
  filterDropdown.position(posx, posy);
  filterOptions.forEach((option) => filterDropdown.option(option));
  // for (let i = 0; i < filterDropdown.length; i++) {
  //   filterDropdown.option("i", filterOptions[i]);
  // }
  // Set initial value of the dropdown
  //filterDropdown.selected("Pixelate");
  filterDropdown.selected(choice);
  filterDropdown.addClass("dropdown");
  filterDropdown.changed(pickShader);
  return filterDropdown;
}

function pickShader(currentShader) {
  // Set the uniforms for the shaders
  switch (currentShader) {
    case "Blend":
      customShaders[0].setUniform("texture1", layer1.color); // Blend
      customShaders[0].setUniform("texture2", layer2.color);
      customShaders[0].setUniform("mixFactor", 0.5);
      customShaders[0].setUniform("blendingMode", 0);
      break;
    case "Box Blur":
      customShaders[1].setUniform("blurRadius", blurRadius); // Box Blur
      break;
    case "Canny Edge Detection":
      customShaders[2].setUniform("thresholdLow", 0.1); // Canny Edge Detection
      customShaders[2].setUniform("thresholdHigh", 0.3);
      break;
    case "Cartoon":
      customShaders[3].setUniform("edgeThreshold", 0.1); // Cartoon
      break;
    case "Deform":
      customShaders[4].setUniform("deformationAmount", deformationAmount); // Deform
      break;
    case "Difference of Gaussian":
      customShaders[5].setUniform("radius1", 1.0); // Difference of Gaussian
      customShaders[5].setUniform("radius2", 2.0);
      break;
    case "Dithering":
      customShaders[6].setUniform("threshold", threshold); // Dithering
      break;
    case "Dot":
      customShaders[7].setUniform("dotSize", dotSize); // Dot
      break;
    case "Emboss":
      // TODO fix this
      customShaders[8].setUniform("threshold", threshold); // Edge-Preserving Smooth
      break;
    case "Flip":
      customShaders[9].setUniform("flipHorizontal", true); // Flip
      customShaders[9].setUniform("flipVertical", true);
      break;
    case "Gaussian Blur":
      // Fix this - not sure about this one!!
      customShaders[10].setUniform("gamma", 2.2);
      break;
    case "Glitch":
      customShaders[11].setUniform("glitchIntensity", glitchIntensity); // Glitch
      break;
    case "Halftone":
      // Try changing cell size
      customShaders[12].setUniform("cellSize", cellSize); // Halftone
      customShaders[12].setUniform("threshold", threshold);
      break;
    // case "Kuwahara":
    //   //Fix this
    //   // Try changing cell size
    //   customShaders[13].setUniform("cellSize", 4.0); // Halftone
    //   customShaders[13].setUniform("threshold", 0.2);
    //   break;
    case "Laplacian Edge Enhancement":
      customShaders[13].setUniform("amount", 5.5); // Laplacian Edge Enhancement
      break;
    case "Mosaic":
      customShaders[14].setUniform("mosaicSize", mosaicSize); // Mosaic
      break;
    case "Pixelate":
      customShaders[15].setUniform("pixelSize", pixelSize); // Pixelate
      break;
    case "Ripple":
      customShaders[16].setUniform("rippleFrequency", rippleFrequency); // Ripple
      customShaders[16].setUniform("rippleAmplitude", rippleAmplitude);
      break;
    // only difference between sketch and static are values
    case "Sketch":
      customShaders[17].setUniform("threshold", threshold); // Sketch
      customShaders[17].setUniform("stippleDensity", stippleDensity);
      break;
    case "Sobel Edge Detection":
      customShaders[18].setUniform("threshold", threshold); // Sobel Edge Detection
      break;
    case "Static":
      customShaders[19].setUniform("threshold", threshold); // Static
      customShaders[19].setUniform("stippleDensity", stippleDensity);
      break;
    case "Vignette":
      customShaders[20].setUniform("vignetteStrength", 0.3); // Vignette
      customShaders[20].setUniform("vignetteFalloff", 1.0);
      customShaders[20].setUniform("vignetteSign", 1.0);
      customShaders[20].setUniform("vignetteSize", 1.0);
      break;
  }
}

function reset() {
  blurRadius = sliders[0].value();
  cellSize = sliders[1].value();
  deformationAmount = sliders[2].value();
  dotSize = sliders[3].value();
  glitchIntensity = sliders[4].value();
  mosaicSize = sliders[5].value();
  pixelSize = sliders[6].value();
  rippleFrequency = sliders[7].value();
  rippleAmplitude = sliders[8].value();
  stippleDensity = sliders[9].value();
  threshold = sliders[10].value();
  updateLabels(sliders, sliderLabels);
}

function updateLabels(sliders, sliderLabels) {
  sliderLabels[0].html("Blur Radius: " + sliders[0].value());
  sliderLabels[1].html("Cell Size: " + sliders[1].value());
  sliderLabels[2].html("Deformation amount: " + sliders[2].value());
  sliderLabels[3].html("Dot size: " + sliders[3].value());
  sliderLabels[4].html("Glitch Intensity: " + sliders[4].value());
  sliderLabels[5].html("Mosaic Size: " + sliders[5].value());
  sliderLabels[6].html("Pixel Size: " + sliders[6].value());
  sliderLabels[7].html("Ripple Frequency: " + sliders[7].value());
  sliderLabels[8].html("Ripple Amplitude: " + sliders[8].value());
  sliderLabels[9].html("Stipple Density: " + sliders[9].value());
  sliderLabels[10].html("Threshold: " + sliders[10].value());
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
  } else if (keyCode == LEFT_ARROW) {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    }
  } else if (key === "s" || key === "S") {
    save("img.jpg");
  }
}

// // Function to save the canvas as an image when 's' key is pressed
// function keyPressed() {
//   if (key === "s" || key === "S") {
//     save("img.jpg");
//   }
// }