
Conv = {
        rounding: function(n) {
            var t = 1;
            if (n > 0) {
                if (n < 100)
                    t = 10;
                if (n < 10)
                    t = 100;
                if (n < 1)
                    t = 1000;
                if (n < 0.1)
                    t = 10000;
                if (n < 0.01)
                    t = 100000;
                if (n < 0.001)
                    t = 1000000;
                if (n < 0.0001)
                    t = 10000000;
                if (n < 0.00001)
                    t = 100000000;
                if (n < 0.000001)
                    t = 1000000000;
                if (n < 0.0000001)
                    t = 10000000000;
                if (n < 0.00000001)
                    t = 100000000000;
                if (n < 0.000000001)
                    t = 1000000000000;
                if (n < 0.0000000001)
                    t = 10000000000000;
                if (n < 0.00000000001)
                    t = 100000000000000;
                if (n < 0.000000000001)
                    t = 1000000000000000;
                return Math.round(n * t) / t;
            } else if (n < 0) {
                if (n < -0.00001)
                    t = 10000000;
                if (n < -0.0001)
                    t = 1000000;
                if (n < -0.001)
                    t = 100000;
                if (n < -0.01)
                    t = 10000;
                if (n < -0.1)
                    t = 1000;
                if (n < -1)
                    t = 100;
                if (n < -10)
                    t = 10;
                if (n < -100)
                    t = 1;
                return Math.round(n * t) / t;
            } else {
                return n;
            }
        }
    };

function Rectangle(x, y, w, h){
	this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;  
}

function calculateRectangle(){
  var rw = parseFloat($j("#rw").val());
  var rh = parseFloat($j("#rh").val());
  var sw = parseFloat($j("#sw").val());
  var sh = parseFloat($j("#sh").val());
  var cs = parseFloat($j("#cs").val());
  if (rw > 0 && rh > 0 && sh > 0 && sw > 0){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var scale = canvas.width / rw; 
    if (canvas.height / rh < scale) scale = canvas.height / rh;
    var rectangleOuter = new Rectangle(0, 0, rw, rh);
    drawRectangle(rectangleOuter, "yellow", 2, "black");
    
    var maxPosX = 0;
    var maxDone = false;
    var maxPosY = 0;
    var recArray = [];
    if ((sw + cs)< rw && (sh + cs) < rh) {
      var posX = 0;// + cs; 
      var posY = 0;// + cs;
      do  {
        
        if (posY + 2 * sh + cs > rh) {
          if (posY + sw <= rh){
          	var swt = sw;
            sw = sh;
            sh = swt;
          }
        }
        
        do {
          var rec = new Rectangle(posX, posY, sw, sh);
          recArray.push(rec);
          posX = Math.round((posX + sw + cs) *1000)/1000;
          maxPosY = posY;
        } while (posX + sw <= rw);
        if (!maxDone){
        	maxPosX = posX;
          	maxDone = true;
        }
        posX = 0;// + cs; 
        posY = Math.round((posY + sh + cs)*1000)/1000;        
      } while (posY + sh <= rh);
      if (maxPosX + sw <= rw){
        posY = 0;
        posX = maxPosX;
        if (sw > sh) {
         var sht = sw; 
         sw = sh;
         sh = sht; 
        }
        do {
		  var rec = new Rectangle(posX, posY, sw, sh);
          recArray.push(rec);
          posY = Math.round((posY + sh + cs) *1000)/1000;
        } while (posY + sw <= maxPosY);        
      }      
      //$j("#results").html("Maximum number of smaller rectangles inside larger rectangle: <b><u>" + recArray.length + "</u></b>");
      var msg = "<p style=\"padding-left: 30px;\">Maximum number of smaller rectangles inside larger rectangle: <b><u>" + recArray.length + "</u></b></p>";
      var areaLargeRectangle = rw * rh;
      var areaSmallRectangle = sw * sh;
      var areaAllRectangles = areaSmallRectangle * recArray.length;
      msg += "<p style=\"padding-left: 30px;\">Area Rectangle (in<sup>2</sup>, mm<sup>2</sup>, m<sup>2</sup>): <b>" + Conv.rounding(areaLargeRectangle) + "</b></p>";
      msg += "<p style=\"padding-left: 30px;\">Area Small Rectangle (in<sup>2</sup>, mm<sup>2</sup>, m<sup>2</sup>): <b>"+ Conv.rounding(areaSmallRectangle) + "</b></p>"; 
      msg += "<p style=\"padding-left: 30px;\">Area all Rectangles (in<sup>2</sup>, mm<sup>2</sup>, m<sup>2</sup>): <b>"+ Conv.rounding(areaAllRectangles) + "</b></p>"; 
      msg += "<p style=\"padding-left: 30px;\">Small Rectangles to Large Rectangle Area Ratio (%): <b>" + Conv.rounding(100* areaAllRectangles / areaLargeRectangle) + "</b></p>";
      $j("#results").html(msg);

    }  
    for (var i = 0; i < recArray.length; i++) {
      drawRectangle(recArray[i], "white", 1, "black")
    }
  } else {
  	alert("Check values! Dimensions can not be 0.");
  }
  function drawRectangle(rectangle, color, width, colorStroke){
     context.beginPath();
     context.rect(rectangle.x * scale, rectangle.y * scale, rectangle.w * scale, rectangle.h * scale);
     context.fillStyle = color;
     context.fill();
     context.lineWidth = width;
     context.strokeStyle = colorStroke;
     context.stroke();   
  }    

}

$j("#image1").hide();

function switchSides(){
   var rw2 = $j("#rw").val() * 1;
   var rh2 = $j("#rh").val() * 1;
   $j("#rw").val(rh2);
   $j("#rh").val(rw2);
   calculateRectangle();
}

$j(document).ready(function(){
  	calculateRectangle();
});
