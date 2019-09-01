/**
 * NMDE 401 - Capstone I
 * Sprint #1
 */

 const svg = SVG('drawing').size(1000, 600);
 const shapes = [];
 let index = 0;
 let defaultSize = 100;
 let topImgPath = 'img/top_img.png';
 let botImgPath = 'img/bottom_img.png';
 let isMouseDown = false;

SVG.on(document, 'DOMContentLoaded', function() {
    if (SVG.supported) {
        var img2 = svg.image(topImgPath).loaded(function(loader) {
            this.size(loader.width * (1/3), loader.height * 0.32)
          })
        img2.move(0,0)

        var mouseMove = function(event) {
            var e = event.target;
            var dim = e.getBoundingClientRect();
            var x = event.clientX - dim.left;
            var y = event.clientY - dim.top;
            console.log("x: " + x + " y: " + y)

            if (isMouseDown === true) {
                var circ = svg.circle(defaultSize)
                shapes.push(circ.fill(svg.image(botImgPath).loaded(function(loader) {
                  this.size(loader.width * (1/3), loader.height * 0.32)
                })))
                circ.move(x, y)
/*                 console.log(shapes); */
            }
        }

        var mouseDown = function(event) {
          isMouseDown = true;

/*        var e = event.target;
          var dim = e.getBoundingClientRect();
          var x = event.clientX - dim.left;
          var y = event.clientY - dim.top;

          var circ = svg.circle(defaultSize)
                shapes.push(circ.fill(svg.image(botImgPath).loaded(function(loader) {
                  this.size(loader.width * (1/3), loader.height * 0.32)
                })))
                circ.move(x - 50, y - 50) */
        }

        var mouseUp = function() {
          isMouseDown = false;
        }

        svg.on('mousedown', mouseDown)
        svg.on('mousemove', mouseMove)
        svg.on('mouseup', mouseUp)

    } else {
        alert('SVG not supported')
    }
});



 