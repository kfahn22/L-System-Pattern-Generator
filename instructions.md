# Instructions - WIP

There are multiple sliders and three sets of dropdowns for each visualization. (While the majority of the rule-sets render fractals, a few just render multiple copies of the shape in interesting ways.)

This code as the sliders for the first L-system, setting the translation, fractal level to 5, the grid length to 20, strokeweight to 2, alpha to 145, of the scale of the shape to 1/2 of the grid size. The L-system rotation are both set to zero. The remaining numbers are the shape parameters.

`[sliders0, sliderLabels0] = addSliders(
    10,
    "first",
    0.0,
    1.0,
    5,
    20,
    2,
    145,
    0.5,
    0,
    0,
    1.5,
    2.5,
    6,
    1,
    1,
    1,
    1
  );`

The next lines add the three dropdowns for the first L-system, setting the Hilbert curve as the fractal, the gear curve as the shape, and the color palette to raspberry.

`ruleDropdown0 = addRuleDropdown(x, 5, "hilbert");`  
 `shapeDropdown0 = addShapesDropdown(x, 50, "gear");`  
 `paletteDropdown0 = addPalettes(x, 95, "raspberry");`

<p align="center"><img src="assets/basic_patterns/hilbert-gear-raspberrry.jpg" alt="Hilbert curve with gear curve" width="500px"></p>

## The Rule-sets

The rulesets can be found in the rules.json file. The majority of the rule-sets were written by Paule Bourke. When known, I have added the author as part of the data in the json file. Another thing to note is that I was having an issue with the sketch freezing with certain fractal patterns, so I imposed some (somewhat arbitrary) contraints on the fractal level. I have added alerts when the level is above the maxLevel I have set for the ruleset, and it is automatically constrained at the maxLevel. Of course, the maxLevel field can be edited as desired.

The fractals start at different points on the canvas, and therefore need different translations. The images below show the L-systems with the starting point indicated by the red circle. If you switch fractals and don't see anything, it is most likely because the fractal needs to be translated in either the x or y direction.

By default, two L-systems are rendered. You can remove the second one by checking the "Delete L-system 2" check-box.

## 🌄 Rule-set Images

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href="Rule-set-examples/ADH231a.md"> <img class="img" src="assets/rule-set-images/ADH231a.jpg" alt="ADH231a Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>ADH231a Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/ADH256a.jpg" alt="ADH256a Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>ADH256a Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/board.md"> <img class="img" src="assets/rule-set-images/board.jpg" alt="Board rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Board rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/box.md"> <img class="img" src="assets/rule-set-images/box.jpg" alt="Box Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Box Rule-set</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href="Rule-set-examples/cross.md"> <img class="img" src="assets/rule-set-images/cross.jpg" alt="Cross Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Cross Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/doily.md"> <img class="img" src="assets/rule-set-images/doily.jpg" alt="Doily Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Doily Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/dragon.md"> <img class="img" src="assets/rule-set-images/dragon.jpg" alt="Dragon rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Dragon rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/fern.jpg" alt="Fern Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Fern Rule-set</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/fern2.jpg" alt="Fern2 Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Fern2 Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/fern3.jpg" alt="Fern3 Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Fern3 Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/hillbert.md"> <img class="img" src="assets/rule-set-images/hilbert.jpg" alt="Dragon rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Hilbert rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/island.md"> <img class="img" src="assets/rule-set-images/island.jpg" alt="Island Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Island Rule-set</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href="Rule-set-examples/koch_curve.md"> <img class="img" src="assets/rule-set-images/koch_curve.jpg" alt="Koch curve Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Koch curve Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/koch_snowflake.md"> <img class="img" src="assets/rule-set-images/koch_snowflake.jpg" alt="Koch snowflake Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Koch snowflake Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/kolam.md"> <img class="img" src="assets/rule-set-images/kolam.jpg" alt="Kolam rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Kolam  rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/leaf.jpg" alt="Leaf Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Leaf Rule-set</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href="Rule-set-examples/levy.md"> <img class="img" src="assets/rule-set-images/levy.jpg" alt="Levy curve Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Levy curve Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/mango-leaf.md"> <img class="img" src="assets/rule-set-images/mango.jpg" alt="Mango leaf Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Mango leaf Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/peano.md"> <img class="img" src="assets/rule-set-images/peano-c.jpg" alt="Peano-c rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Peano-c  rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/peano.jpg" alt="Peano Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Peano Rule-set</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href="Rule-set-examples/pentadentrite.md"> <img class="img" src="assets/rule-set-images/pentadentrite.jpg" alt="Pentadentrite curve Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Pentadentrite curve Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/pentigree.jpg" alt="Pentigree Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Pentigree Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/pentaplexity.md"> <img class="img" src="assets/rule-set-images/pentaplexity.jpg" alt="Pentaplexity rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Pentaplexity Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/quadratic_gosper.md"> <img class="img" src="assets/rule-set-images/quad_gosper.jpg" alt="Quadratic Gosper Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Quadratic Gosper Rule-set</b></sub></a></td>
    </tr>
     <tr>
     <td align="center"><a href="Rule-set-examples/quadratic_koch_island.md"> <img class="img" src="assets/rule-set-images/quad_koch_island.jpg" alt="Quadratic koch island Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Quadratic koch island Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/quad_snowflake2.jpg" alt="Quadratic Snowflake Rule-set Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Quadratic Snowflake Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/recursive_circles.jpg" alt="Recursive circles rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Recursive circles Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/recursive_circles2.jpg" alt="Recursive circles 2 Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Recursive circles 2 Rule-set</b></sub></a></td>
    </tr>
     <tr>
     <td align="center"><a href="Rule-set-examples/rings.md"> <img class="img" src="assets/rule-set-images/rings.jpg" alt="Rings Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Rings Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/rounded-star.md"> <img class="img" src="assets/rule-set-images/rounded_star.jpg" alt="Rounded Star Rule-set Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Rounded Star Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/skierpinski-carpet.md"> <img class="img" src="assets/rule-set-images/skierpinski_carpet.jpg" alt="Skierpinski carpet rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Skierpinski carpet Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/skierpinski.md"> <img class="img" src="assets/rule-set-images/skierpinski.jpg" alt="Skierpinski Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Skierpinski  Rule-set</b></sub></a></td>
    </tr>
     <tr>
     <td align="center"><a href="Rule-set-examples/snake-kolam.md"> <img class="img" src="assets/rule-set-images/snake_kolam.jpg" alt="Snake kolam Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Snake kolam Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/square-skierpinski.md"> <img class="img" src="assets/rule-set-images/square_skierpinski.jpg" alt="Square skeirpinski Rule-set Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Square skeirpinski Rule-set Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/sticks.jpg" alt="Sticks rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Sticks  Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/tiles.jpg" alt="Tiles Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Tiles  Rule-set</b></sub></a></td>
    </tr>
     <tr>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/torn_square.jpg" alt="Torn Square Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Torn Square Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/tree.jpg" alt="Tree Rule-set Rule-set" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Tree Rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/triangles.jpg" alt="Triangles rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Triangles Rule-set</b></sub></a></td>
    </tr>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->

## Shapes

The shape code can be found in the shapes.js file. While most of the shapes are closed, the spirals are by nature "open." There are therefore two different functions in the Shapes class to render the shape -- a show() and an openShow(). I have also added messaging about the shape curves which appears when the shape is selected if it is a function of the shape parameters (a, b, m, n, n1, n2, n3). For example, if the supershape is selected, this message appears:

The supershape curve is a f(a, b, m, n, n1, n2, n3).

## 🌄 Shape Images

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/archimedes.jpg" alt="Archimedes spiral" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Archimedes spiral</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/astroid.jpg" alt="Astroid" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Astroid</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/bicorn.jpg" alt="Bicorn" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Bicorn </b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/cassini.jpg" alt="Cassini oval" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Cassini oval</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/ceva.jpg" alt="Ceva" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Ceva</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/cornu.jpg" alt="Cornu spiral" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Cornu Spiral</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/cross.jpg" alt="Cross" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Maltese Cross</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/deltoid.jpg" alt="Deltoid" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Deltoid</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/eight.jpg" alt="Eight curve" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Eight curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/gear.jpg" alt="Gear curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Gear curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/heart.jpg" alt="Heart curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Heart curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/kiss.jpg" alt="Kiss curve" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Kiss curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/quadrifolium.jpg" alt="Quadrifolium" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Quadrifolium</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/quadrilateral.jpg" alt="Quadrilateral" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Quadrilateral</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/superellipse.jpg" alt="Superellipse" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Superellipse</b></sub></a></td>
       <td align="center"><a href=""> <img class="img" src="assets/shape_images/supershape.jpg" alt="Supershape" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Supershape</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/shape_images/tear.jpg" alt="Tear" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Tear</b></sub></a></td>
     </tr>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->

There are a larger number of shapes in the Update_Lsystem_expanded file.

## Palettes

I have utiliized [https://supercolorpalette.com](supercolorpalette) to add the color palettes. For consistency, I have added two "dummy" palettes with white and black, as well as a gray palette. You can easily add more palettes by using the the supercolorpalette generator. Once you are happy with your colors, copy the url, and add it to the code in the selectPalette function (line 344). Remember to add the name of the color to the addPalettes dropdown or it will not appear in the paletteDropdown.

## Tips

- The Hilbert and Peano curve rule-sets have generated the best backgrounds for me. I have found it generally best to stick to simple color palettes and use a fill with a lower alpha. My favorite backgrounds are created with the gear curve and supershape.

- One downside of creating a generic shape class is that the parameters are not, in general, optimized for specific shapes. If you choose a shape and the scale is completely off, try editing either the shapeScale or the shape parameters. The ones to try first are a and b.

- If you choose the line and have fill checked, nothing will appear.
