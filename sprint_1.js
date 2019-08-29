/**
 * NMDE 401 - Capstone I
 * Sprint #1
 */

 let svg1;
 let shapes = [];

SVG.on(document, 'DOMContentLoaded', function() {
    if (SVG.supported) {
        svg1 = SVG('layers').size(1000, 600)

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
});

 