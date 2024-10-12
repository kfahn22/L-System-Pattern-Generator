# Flower Curve

<p align="center"><img src="./assets/shape_images/flower.jpg" alt="eight" width="300px"></p>

Code:

```JavaScript
flower() {
    for (let theta = 0; theta < TWO_PI; theta += 0.01) {
      let r = this.a + cos(this.m * theta);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
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
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/kolam-astroid-flower.jpg" alt="Kolam ruleset with astroid and flower curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Kolam ruleset with astroid and flower curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/koch-snowflake-flower.jpg" alt="Koch snowflake with flower curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Koch snowflake with flower curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/square_skierpinski-flower.jpg" alt="Square skierpinski ruleset with flower curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Square skierpinski ruleset with flower curve</b></sub></a></td>
    <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/adh231a-flower.jpg" alt="ADH231a ruleset with flower curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>ADH231a ruleset with flower curve</b></sub></a></td>
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
