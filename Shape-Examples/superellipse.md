# Superellipse

To learn mroe about the superellipse, I recommend watching Daniel Shiffman's [Coding Challenge](https://thecodingtrain.com/challenges/19-superellipse).

<p align="center"><img src="../assets/shape_images/superellipse.jpg" alt="superellipse" width="500px"></p>

```JavaScript
sgn(val) {
    if (val == 0) {
      return 0;
    }
    return val / abs(val);
}

superellipse() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let na = 2 / this.n;
      let x = this.r * pow(abs(cos(theta)), na) * this.a * this.sgn(cos(theta));
      let y = this.r * pow(abs(sin(theta)), na) * this.b * this.sgn(sin(theta));
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
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/box-superellipse.jpg" alt="Hilbert curve background with box" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Hilbert curve background with box rule-set</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/rounded-star-superellipse.jpg" alt="Rounded Star with superellipse" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Rounded Star with superellipse</b></sub></a></td>
    </tr>
    <tr>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/snake-kolam-superellipse.jpg" alt="Snake-kolam ruleset with superellipse" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Snake-kolam ruleset with superellipse</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="../assets/Ruleset-shape-examples/recursive-circles2-superellipse.jpg" alt="Recurvsive circles2 rule-set, a=3.6,b=1.15,n=1.5" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Recurvsive circles2 rule-set, a=3.6,b=1.15,n=1.5</b></sub></a></td>
    </tr>
    
  
    
 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->
