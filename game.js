
var iso = new Isomer(document.getElementById("world"));
var Point = Isomer.Point;
var Path = Isomer.Path;
var Shape = Isomer.Shape;
var Color = Isomer.Color;
iso.add(Shape.Prism(new Point(1,1), 1, 1,2), new Color(0, 180, 180));
ctx = world.context;
ctx.save();
ctx.beginPath();
ctx.moveTo(25,25);
ctx.lineTo(300, 300);
ctx.stroke();
ctx.restore();