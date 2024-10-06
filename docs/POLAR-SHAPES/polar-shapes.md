# Polar Shapes

The shape code can be found in the shapes.js file. The pickShape function adds a new Shape and then a switch statement is used to select the specific shape choosen by the user.

If you would like to learn more about rendering polar coordinates and rendering polaring shapes, I highly recommend reading Daniel Shiffman's [The Nature of Code](https://natureofcode.com/) book or watching some  of Daniel Shiffman's tutorial videos.

[Polar Coordinates - The Nature of Code](https://www.youtube.com/watch?v=O5wjXoFrau4k)

[![Coding Challenge #23: 2D Supershapes](https://img.youtube.com/vi/ksRoh-10lak/0.jpg)](https://www.youtube.com/watch?v=ksRoh-10lak)

[![Coding Challenge #134: Heart Curve](https://img.youtube.com/vi/oUBAi9xQ2X4/0.jpg)](https://www.youtube.com/watch?v=oUBAi9xQ2X4)

## Code

Here is the code to instantiate the Shape class: 

```JavaScript
selectedShape = new Shape(
    0,
    0,
    length * shapeScale,
    a,
    b,
    m,
    n1,
    n2,
    n3,
    n,
    shapeAngle
);
```

While most of the shapes are closed, several shapes are "open" by nature. There are therefore two different functions in the Shapes class to render the shape -- a show() and an openShow(). I have also added messaging about the shape curves which appears when the shape is selected if it is a function of the shape parameters (a, b, m, n1, n2, n3, n). For example, if the supershape is selected, this message appears:

The supershape curve is a f(a, b, m, n, n1, n2, n3).

## 🌄 Shape Images

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href="archimedes.md"> <img class="img" src="../assets/shape-images/archimedes.jpg" alt="Archimedes spiral" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Archimedes spiral</b></sub></a></td>
     <td align="center"><a href="astroid.md"> <img class="img" src="../assets/shape-images/astroid.jpg" alt="Astroid" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Astroid</b></sub></a></td>
     <td align="center"><a href="bicorn.md"> <img class="img" src="../assets/shape-images/bicorn.jpg" alt="Bicorn" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Bicorn </b></sub></a></td>
     <td align="center"><a href="cassini.md"> <img class="img" src="../assets/shape-images/cassini.jpg" alt="Cassini oval" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Cassini oval</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href="ceva.md"> <img class="img" src="../assets/shape-images/ceva.jpg" alt="Ceva" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Ceva</b></sub></a></td>
     <td align="center"><a href="cornu.md"> <img class="img" src="../assets/shape-images/cornu.jpg" alt="Cornu spiral" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Cornu Spiral</b></sub></a></td>
     <td align="center"><a href="cross.md"> <img class="img" src="../assets/shape-images/cross.jpg" alt="Cross" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Maltese Cross</b></sub></a></td>
     <td align="center"><a href="deltoid.md"> <img class="img" src="../assets/shape-images/deltoid.jpg" alt="Deltoid" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Deltoid</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href="eight.md"> <img class="img" src="../assets/shape-images/eight.jpg" alt="Eight curve" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Eight curve</b></sub></a></td>
     <td align="center"><a href="gear.md"> <img class="img" src="../assets/shape-images/gear.jpg" alt="Gear curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Gear curve</b></sub></a></td>
     <td align="center"><a href="heart.md"> <img class="img" src="../assets/shape-images/heart.jpg" alt="Heart curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Heart curve</b></sub></a></td>
     <td align="center"><a href="kiss.md"> <img class="img" src="../assets/shape-images/kiss.jpg" alt="Kiss curve" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Kiss curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href="quadrifolium.md"> <img class="img" src="../assets/shape-images/quadrifolium.jpg" alt="Quadrifolium" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Quadrifolium</b></sub></a></td>
     <td align="center"><a href="quadrilateral.md"> <img class="img" src="../assets/shape-images/quadrilateral.jpg" alt="Quadrilateral" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Quadrilateral</b></sub></a></td>
     <td align="center"><a href="superellipse.md"> <img class="img" src="../assets/shape-images/superellipse.jpg" alt="Superellipse" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Superellipse</b></sub></a></td>
       <td align="center"><a href="supershape.md"> <img class="img" src="../assets/shape-images/supershape.jpg" alt="Supershape" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="300" /><br /><sub><b><br/>Supershape</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href="tear.md"> <img class="img" src="../assets/shape-images/tear.jpg" alt="Tear" style="vertical-align:top;" width="300" /><br /><sub><b><br/>Tear</b></sub></a></td>
     </tr>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->