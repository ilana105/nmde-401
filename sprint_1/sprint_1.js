/**
 * NMDE 401 - Capstone I
 * Sprint #1
 */

 const svg = SVG('layers').size(1000, 600);
 const shapes = [];
 let index = 0;
 let defaultSize = 100;
 let img1Path = 'img/test1.jpg';
 let img2Path = 'img/test2.jpg';
 let isMouseDown = false;

SVG.on(document, 'DOMContentLoaded', function() {
    if (SVG.supported) {
        var img2 = svg.image(img2Path).loaded(function(loader) {
            this.size(loader.width * 0.4, loader.height * 0.4)
          })
        img2.move(0,0)

        var mouseMove = function(event) {
            var e = event.target;
            var dim = e.getBoundingClientRect();
            var x = event.clientX - dim.left;
            var y = event.clientY - dim.top;
            console.log("x: " + x + " y: " + y)
            console.log("clientX: " + event.clientX + " clientY: " + event.clientY)

            if (isMouseDown === true) {
                var circ = svg.circle(defaultSize)
                shapes.push(circ.fill(svg.image(img1Path).loaded(function(loader) {
                  this.size(loader.width * 0.25, loader.height * 0.25)
                })))
                circ.move(event.clientX - 50, event.clientY - 50)
                console.log(shapes);
            }
        }

        var mouseDown = function(event) {
          isMouseDown = true;

          var e = event.target;
          var dim = e.getBoundingClientRect();
          var x = event.clientX - dim.left;
          var y = event.clientY - dim.top;

          var circ = svg.circle(defaultSize)
                shapes.push(circ.fill(svg.image(img1Path).loaded(function(loader) {
                  this.size(loader.width, loader.height)
                })))
                circ.move(x - 50, y - 50)
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



 