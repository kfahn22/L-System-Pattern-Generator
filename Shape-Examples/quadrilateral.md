# Quadrilateral Curve

<p align="center"><img src="../assets/shape_images/quadrilateral.jpg" alt="quadrilateral" width="300px"></p>

Code:

```JavaScript
quadrilaterial() {
    for (let theta = 0; theta < TWO_PI; theta += TWO_PI / this.m) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta);
      this.points.push(createVector(x, y));
    }
}
```

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/peano-quadrilateral.jpg" alt="Peano ruleset with quadrilateral curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Peano ruleset with quadrilateral curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/adh231a-quadrilateral.jpg" alt="ADH231a ruleset with quadrilateral curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>ADH231a ruleset with quadrilateral curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/hilbert-quadrilateral.jpg" alt="Hilbert ruleset with quadrilateral curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Hilbert ruleset with quadrilateral curve</b></sub></a></td>
    <td align="center"><a href=""> <img class="img" src="../assets/skierpinski-carpet-quadrilateral.jpg" alt="Hilbert ruleset with quadrilateral curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Skierpinski carpet with quadrilateral curve</b></sub></a></td>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
