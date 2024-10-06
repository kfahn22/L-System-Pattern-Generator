# The L-system Rule-sets

The rulesets can be found in the rules.json file. The majority of the rule-sets were written by [Paul Bourke](https://paulbourke.net/fractals/lsys/). I found another very nice resource on rulesets by Dmytro Fedoriaka [here](https://fedimser.github.io/l-systems.html). When known, I have added the author as part of the data in the json file.

If you would like to learn more about L-Systems, I highly recommend Daniel Shiffman's [The Nature of Code](https://natureofcode.com/) book or his Coding Challenge on L-system fractal trees.

[![Coding Challenge #16: L-System Fractal Trees](https://img.youtube.com/vi/E1B4UoSQMFw/0.jpg)](https://www.youtube.com/watch?v=E1B4UoSQMFw)

## Important Notes

I was having an issue with the sketch freezing with certain fractal patterns, so I imposed some (somewhat arbitrary) contraints on the fractal level. I have added alerts when the level is above the maxLevel I have set for the ruleset, and it is automatically constrained at the maxLevel. Of course, the maxLevel field can be edited as desired.

The fractals start at different points on the canvas, and therefore need different translations. The images below show the L-systems with the starting point indicated by the red circle. If you switch fractals and don't see anything, it is most likely because the fractal needs to be translated in either the x or y direction.

By default, two L-systems are rendered. You can remove the second one by checking the "Remove ruleset" check-box.

## 🌄 Rule-set Images

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href="Rule-set-examples/ADH231a.md"> <img class="img" src="./assets/rule-set-images/ADH231a.jpg" alt="ADH231a Rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>ADH231a Rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/ADH256a.md"> <img class="img" src="./assets/rule-set-images/ADH256a.jpg" alt="ADH256a Rule-set" style=" display: block;
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
     <td align="center"><a href=""> <img class="img" src="assets/rule-set-images/peano-c.jpg" alt="Peano-c rule-set" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Peano-c  rule-set</b></sub></a></td>
     <td align="center"><a href="Rule-set-examples/peano.md"> <img class="img" src="assets/rule-set-images/peano.jpg" alt="Peano Rule-set" style=" display: block;
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
     <td align="center"><a href="Rule-set-examples/quadratic_snowflake.md"> <img class="img" src="assets/rule-set-images/quad_snowflake2.jpg" alt="Quadratic Snowflake Rule-set Rule-set" style=" display: block;
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
     <td align="center"><a href="Rule-set-examples/tiles.md"> <img class="img" src="assets/rule-set-images/tiles.jpg" alt="Tiles Rule-set" style=" display: block;
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