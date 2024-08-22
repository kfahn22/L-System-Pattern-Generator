

// Labels for sliders/input
let wlabel;
let hlabel;
let levellabel;
let lengthlabel;
let swlabel;
let scalelabel;
let rotatelabel;
let alphalabel;
let alabel;
let blabel;
let mlabel;
let nlabel;
let n1label, n2label, n3label;
let rotateShapelabel;

class AddSliders {
  constructor(pos) {
    // Fractal Sliders
    this.wSlider = createSlider(0.05, 1, 0.1, 0.025);
    this.hSlider = createSlider(0.05, 1, 0.1, 0.025);
    this.lengthSlider = createSlider(10, 100, 20, 1);
    this.rotateSlider = createSlider(-180, 180, 0, 5);
    this.levelSlider = createSlider(0, 12, 3, 1);

    // Color and strokeWeight sliders
    this.strokeWeightSlider = createSlider(0.1, 8, 1.5, 0.1);
    this.alphaSlider = createSlider(100, 255, 200, 5);

    // shape sliders
    this.scaleSlider = createSlider(0.15, 1.15, 0.5, 0.05);
    this.rotateShapeSlider = createSlider(-180, 180, 0, 1);
    this.aSlider = createSlider(0, 10, 2, 0.25);
    this.bSlider = createSlider(0, 10, 2.5, 0.25);
    this.mSlider = createSlider(0, 10, 6, 1);
    this.nSlider = createSlider(-1, 5, 1, 0.5);
    this.n1Slider = createSlider(0.25, 2, 1, 0.25);
    this.n2Slider = createSlider(0.25, 2, 1, 0.25);
    this.n3Slider = createSlider(0.25, 2, 1, 0.25);

    // Placement of slider
    this.pos = pos;
  }

  fractalSliders() {
    // wSlider = createSlider(0.05, 1, 0.1, 0.025);
    this.wSlider.position(this.pos, 35);
    //console.log(width + this.pos);
    this.wSlider.addClass("slider");
    wlabel = createP("Translate x:");
    wlabel.position(this.wSlider.x, this.wSlider.y - 35);
    wlabel.style("color", "white");

    // hSlider = createSlider(0.05, 1, 0.1, 0.025);
    this.hSlider.position(this.pos, 90);
    this.hSlider.addClass("slider");
    hlabel = createP("Translate y:");
    hlabel.position(this.hSlider.x, this.hSlider.y - 35);
    hlabel.style("color", "white");

    //lengthSlider = createSlider(10, 100, 20, 1);
    this.lengthSlider.position(this.pos, 215);
    this.lengthSlider.addClass("slider");
    lengthlabel = createP("Step length:");
    lengthlabel.position(this.lengthSlider.x, this.lengthSlider.y - 35);
    lengthlabel.style("color", "white");

    //rotateSlider = createSlider(-180, 180, 0, 5);
    this.rotateSlider.position(this.pos, 415);
    this.rotateSlider.addClass("slider");
    rotatelabel = createP("Rotate fractal:");
    rotatelabel.position(this.rotateSlider.x, this.rotateSlider.y - 35);
    rotatelabel.style("color", "white");

    //this.levelSlider = createSlider(0, 12, 3, 1);
    this.levelSlider.position(this.pos, 155);
    this.levelSlider.addClass("slider");
    levellabel = createP("Fractal level:");
    levellabel.position(this.levelSlider.x, this.levelSlider.y - 35);
    levellabel.style("color", "white");
  }

  colorSliders() {
    //strokeWeightSlider = createSlider(0.1, 8, 1.5, 0.1);
    this.strokeWeightSlider.position(this.pos, 270);
    this.strokeWeightSlider.addClass("slider");
    swlabel = createP("StrokeWeight:");
    swlabel.position(this.strokeWeightSlider.x, this.strokeWeightSlider.y - 35);
    swlabel.style("color", "white");

    //alphaSlider = createSlider(100, 255, 200, 5);
    this.alphaSlider.position(this.pos, 330);
    this.alphaSlider.addClass("slider");
    alphalabel = createP("Alpha:");
    alphalabel.position(this.alphaSlider.x, this.alphaSlider.y - 35);
    alphalabel.style("color", "white");
  }

  shapeSliders() {
    //scaleSlider = createSlider(0.15, 1.15, 0.5, 0.05);
    this.scaleSlider.position(this.pos, 370);
    this.scaleSlider.addClass("slider");
    scalelabel = createP("Scale:");
    scalelabel.position(this.scaleSlider.x, this.scaleSlider.y - 35);
    scalelabel.style("color", "white");

    // Sliders for shape variables
    //rotateShapeSlider = createSlider(-180, 180, 0, 1);
    this.rotateShapeSlider.position(this.pos, 460);
    this.rotateShapeSlider.addClass("slider");
    //rotateShapeSlider.size(150);
    rotateShapelabel = createP("Rotate shape:");
    rotateShapelabel.position(
      this.rotateShapeSlider.x,
      this.rotateShapeSlider.y - 35
    );
    rotateShapelabel.style("color", "white");

    // aSlider = createSlider(0, 10, 2, 0.25);
    this.aSlider.position(this.pos, 500);
    this.aSlider.addClass("slider");
    alabel = createP("a:");
    alabel.position(this.aSlider.x, this.aSlider.y - 35);
    alabel.style("color", "white");

    //bSlider = createSlider(0, 10, 2.5, 0.25);
    this.bSlider.position(this.pos, 540);
    this.bSlider.addClass("slider");
    blabel = createP("b: ");
    blabel.position(this.bSlider.x, this.bSlider.y - 35);
    blabel.style("color", "white");

    //mSlider = createSlider(0, 10, 6, 1);
    this.mSlider.position(this.pos, 580);
    this.mSlider.addClass("slider");
    mlabel = createP("m:");
    mlabel.position(this.mSlider.x, this.mSlider.y - 35);
    mlabel.style("color", "white");

    //nSlider = createSlider(-1, 5, 1, 0.5);
    this.nSlider.position(this.pos, 620);
    this.nSlider.addClass("slider");
    nlabel = createP("n: ");
    nlabel.position(this.nSlider.x, this.nSlider.y - 35);
    nlabel.style("color", "white");

    //n1Slider = createSlider(0.25, 2, 1, 0.25);
    this.n1Slider.position(this.pos, 650);
    this.n1Slider.addClass("slider");
    n1label = createP("n1: ");
    n1label.position(this.n1Slider.x, this.n1Slider.y - 35);
    n1label.style("color", "white");

    //n2Slider = createSlider(0.25, 2, 1, 0.25);
    this.n2Slider.position(this.pos, 690);
    this.n2Slider.addClass("slider");
    n2label = createP("n2: ");
    n2label.position(this.n2Slider.x, this.n2Slider.y - 35);
    n2label.style("color", "white");

    //n3Slider = createSlider(0.25, 2, 1, 0.25);
    this.n3Slider.position(this.pos, 730);
    this.n3Slider.addClass("slider");
    n3label = createP("n3: ");
    n3label.position(this.n3Slider.x, this.n3Slider.y - 35);
    n3label.style("color", "white");
  }

  resetSliders() {
    this.wSlider.input(this.getValues);
    this.hSlider.input(this.getValues);
    this.levelSlider.input(this.getValues);
    this.lengthSlider.input(this.getValues);
    this.strokeWeightSlider.input(this.getValues);
    this.rotateSlider.input(this.getValues);
    this.alphaSlider.input(this.getValues);
    this.scaleSlider.input(this.getValues);
    this.rotateShapeSlider.input(this.getValues);
    this.aSlider.input(this.getValues);
    this.bSlider.input(this.getValues);
    this.mSlider.input(this.getValues);
    this.nSlider.input(this.getValues);
    this.n1Slider.input(this.getValues);
    this.n2Slider.input(this.getValues);
    this.n3Slider.input(this.getValues);
    this.updateLabels();
  }

  updateLabels() {
    wlabel.html("Translate w: " + this.wSlider.value());
    hlabel.html("Translate h: " + this.hSlider.value());
    levellabel.html("Level: " + this.levelSlider.value());
    lengthlabel.html("Length: " + this.lengthSlider.value());
    rotatelabel.html("Rotate fractal: " + this.rotateSlider.value());
    scalelabel.html("Scale: " + this.scaleSlider.value());
    alphalabel.html("Alpha: " + this.alphaSlider.value());
    rotateShapelabel.html("Rotate shape: " + this.rotateShapeSlider.value());
    alabel.html("a: " + this.aSlider.value());
    blabel.html("b: " + this.bSlider.value());
    mlabel.html("m: " + this.mSlider.value());
    nlabel.html("n: " + this.nSlider.value());
    n1label.html("n1: " + this.n1Slider.value());
    n2label.html("n2: " + this.n2Slider.value());
    n3label.html("n3: " + this.n3Slider.value());
    swlabel.html("StrokeWeight: " + this.strokeWeightSlider.value());
  }

  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider

  getValues() {
    let wadj = this.wSlider.value();
    let hadj = this.hSlider.value();
    let level = this.levelSlider.value();
    let length = this.lengthSlider.value();
    let sw = this.strokeWeightSlider.value();
    let fractalAlpha = this.alphaSlider.value();
    let angle = radians(this.rotateSlider.value());
    let shapeScale = this.scaleSlider.value();
    let shapeAngle = radians(this.rotateShapeSlider.value());
    let a = this.aSlider.value();
    let b = this.bSlider.value();
    let m = this.mSlider.value();
    let n = this.nSlider.value();
    let n1 = this.n1Slider.value();
    let n2 = this.n2Slider.value();
    let n3 = this.n3Slider.value();
    return [
      wadj,
      hadj,
      level,
      length,
      sw,
      fractalAlpha,
      angle,
      shapeScale,
      shapeAngle,
      a,
      b,
      m,
      n,
      n1,
      n2,
      n3,
    ];
  }
}
