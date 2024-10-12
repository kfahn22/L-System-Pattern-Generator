# Kiss Curve

<p align="center"><img src="./assets/shape_images/kiss.jpg" alt="kiss curve" width="300px"></p>

Code:

```JavaScript
kissCurve() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.a * this.r * cos(theta);
      let y = this.b * this.r * pow(sin(theta), 3);
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
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/ADH231a-kiss.jpg" alt="ADH231a ruleset with kiss curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>ADH231a ruleset with kiss curve, a = 3.85, n = 2.5</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/hilbert-kiss.jpg" alt="Hilbert ruleset with kiss curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Hilbert ruleset with kiss curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/rounded-cross-kiss.jpg" alt="Rounded cross ruleset with kiss curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Rounded cross ruleset with kiss curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/box-kiss.jpg" alt="Box rule-set with kiss curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Box rule-set with kiss curve</b></sub></a></td>
    </tr>
    
  
    
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
