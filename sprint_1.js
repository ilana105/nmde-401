/**
 * NMDE 401 - Capstone I
 * Sprint #1
 */

 let svg1, svg2;
 let shapes = [];

SVG.on(document, 'DOMContentLoaded', function() {
    if (SVG.supported) {
        svg1 = SVG('layers').size(1000, 600)
        /* svg2.move(0,0) */
        /* var rect = svg1.rect(100, 100).attr({ fill: '#f06' }) */
/*         var img1 = svg1.image('img/test1.jpg').loaded(function(loader) {
            this.size(loader.width * 0.25, loader.height * 0.25)
          }) */
 
        var img2 = svg1.image('img/test2.jpg').loaded(function(loader) {
            this.size(loader.width * 0.4, loader.height * 0.4)
          })
        img2.move(0,0)

        var mouseMove = function(event) {
            var e = event.target;
            var dim = e.getBoundingClientRect();
            var x = event.clientX - dim.left;
            var y = event.clientY - dim.top;
            console.log("x: " + x + " y: " + y)
            var circ = svg1.circle(100)
            circ.fill(svg1.image('img/test1.jpg', 1000, 1000))
            circ.move(x,y)
        }

          svg1.on('mousemove', mouseMove)
      } else {
        alert('SVG not supported')
      }
  })

window.onload = function() {
/*     let canvas1 = document.getElementById("layer_1");
    let canvas2 = document.getElementById("layer_2");

    var img1 = document.createElementNS('http://www.w3.org/2000/svg','image');
    img1.setAttributeNS(null,'height','100%');
    img1.setAttributeNS(null,'width','100%');
    img1.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/test1.jpg');
    img1.setAttributeNS(null,'x','10');
    img1.setAttributeNS(null,'y','10');
    img1.setAttributeNS(null, 'visibility', 'visible');

    var img2 = document.createElementNS('http://www.w3.org/2000/svg','image');
    img2.setAttributeNS(null,'height','100%');
    img2.setAttributeNS(null,'width','100%');
    img2.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/test2.jpg');
    img2.setAttributeNS(null,'x','10');
    img2.setAttributeNS(null,'y','10');
    img2.setAttributeNS(null, 'visibility', 'visible');

    canvas1.append(img1);
    canvas2.append(img2); */
}
 