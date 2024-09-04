# Quadrifolium Curve

<p align="center"><img src="../assets/shape_images/quadrifolium.jpg" alt="quadrifolium curve" width="300px"></p>

Code:

```JavaScript
quadrifolium() {
    let a = 1;
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * (2 * a * pow(sin(theta), 2) * cos(theta));
      let y = this.r * (2 * a * pow(cos(theta), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
  }
```

[Source](https://mathcurve.com/courbes2d.gb/bouche/bouche.shtml)

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/ADH231a-quadrifolium.jpg" alt="ADH231a ruleset with quadrifolium curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>ADH231a ruleset with quadrifolium curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/kolam-quadrifolium.jpg" alt="Kolam rulesset with quadrifolium curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Kolam rulesset with quadrifolium curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/mango-leaf-quadrifolium.jpg" alt="Mango leaf ruleset with quadrifolium curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Mango leaf ruleset with quadrifolium curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/hilbert-quadrifolium.jpg" alt="Hilbert rule-set with quadrifolium curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Box  rule-set with kiss curve</b></sub></a></td>
    </tr>
    
  
    
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
