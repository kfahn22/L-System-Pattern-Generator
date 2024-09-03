# Bicorn Curve

<p align="center"><img src="assets/shape_images/astroid.jpg" alt="kiss curve" width="300px"></p>

Code:

```JavaScript
bicorn() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * sin(theta);
      let y = (this.r * pow(cos(theta), 2)) / (2 + cos(theta));
      this.points.push(createVector(x, y));
    }
}
```

[Source](https://mathcurve.com/courbes2d.gb/bicorne/bicorne.shtml)

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
   <tr>
     <td align="center"><a href=""> <img class="img" src="assets/adh23a-bicornx2.jpg" alt="Two ADH23a rule-sets with bicorn curve" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Two ADH23a rule-sets with bicorn curve</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/recursive-circles-bicorn.jpg" alt="Recursive circles with bicorn curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Recursive circles with bicorn curve</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="assets/hillbert-ADH23a.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b><br/>ADH23a with bicorn</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/mango-bicorn.jpg" alt="Mango leaf with bicorn curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Mango leaf with bicorn curve</b></sub></a></td>
    </tr>
    
  
    
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
