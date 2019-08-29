/**
 * NMDE 401 - Capstone I
 * Sprint #1
 */

 let svg1, svg2;

window.onload = function() {
    let canvas1 = document.getElementById("layer_1");
    let canvas2 = document.getElementById("layer_2");

    let svg1 =  document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg1.setAttributeNS(null,'height','100%');
    svg1.setAttributeNS(null,'width','100%');
    svg1.setAttributeNS(null,'x','10');
    svg1.setAttributeNS(null,'y','10');
    svg1.setAttributeNS(null, 'visibility', 'visible');

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
    canvas2.append(img2);
}
 