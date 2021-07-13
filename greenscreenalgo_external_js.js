var imgFG = null;
var imgBG = null;
var greenThreshold=240;
function uploadFG()
{
  var fileInput = document.getElementById("fgFile");
  var canvas = document.getElementById("canvas1");
  imgFG = new SimpleImage(fileInput);
  imgFG.drawTo(canvas);
}

function uploadBG()
{
  var fileInput = document.getElementById("bgFile");
  var canvas = document.getElementById("canvas2");
  imgBG = new SimpleImage(fileInput);
  imgBG.drawTo(canvas);
}

function composite()
{
  clearCanvases();
  var canvas1 = document.getElementById("canvas1");
  var outputImage = new SimpleImage(imgFG.width, imgFG.height);//has to be same height and width
  for (var pixel of imgFG.values())
    {
      if (pixel.getGreen() > greenThreshold)
        {
          var x = pixel.getX();
          var y = pixel.getY();//get the same x and y coordinate in the background image
          var newPixel = imgBG.getPixel(x, y);
          outputImage.setPixel(x, y, newPixel);
        }
      else
        {
          outputImage.setPixel(pixel.getX(), pixel.getY(), pixel);//else set pixel to normal fgpixel
        }
    }
  outputImage.drawTo(canvas1);//draw the output image on canvas 1

}

function clearCanvases()
{
  var canvas1 = document.getElementById("canvas1");
  var canvas2 = document.getElementById("canvas2");
  var context = canvas1.getContext("2d");
  context.clearRect(0, 0, canvas1.width, canvas1.height);//access context of the canvas
  context = canvas2.getContext("2d");
  context.clearRect(0, 0, canvas2.width, canvas2.height);
}
