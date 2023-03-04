class Dice {
    
    roll() {
        return Math.floor(Math.random()*6+1);
    }
}
// The dice png files are red, but the animation is black..
// So i made this function to convert red to black
// instead of changing the photos. Just for fun:)
function convertRedToBlack(image) {
    // Create a canvas element
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
  
    // Get the 2D context of the canvas
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
  
    // Get the image data and iterate through the pixels
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      // Check if the pixel is red
      if (pixels[i] > 200 && pixels[i + 1] < 100 && pixels[i + 2] < 100) {
        // If the pixel is red, set the color to black
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
      }
    }
  
    // Put the modified image data back onto the canvas
    context.putImageData(imageData, 0, 0);
  
    // Create a new image element with the modified image data
    let modifiedImage = new Image();
    modifiedImage.src = canvas.toDataURL();
    return modifiedImage;
  }
  

class DiceController {
    
    constructor (root) {
        this.root = root;
        this.dice = new Dice();
    }
    
    run() {
        document.getElementById(this.root).querySelector("*[button]").addEventListener("click", this.rollDice.bind(this), true);
        let img = document.createElement("img");
        document.getElementById(this.root).querySelector("*[result]").appendChild(img);
    }
    
    rollDice() {
        clearTimeout(this.timeout);
        this.setImgLink("https://raw.githubusercontent.com/L596241/dice/main/dice_png/roll.gif");
        this.timeout = setTimeout(() => 
        {
            let link = this.imgLink(this.dice.roll());
            this.setImgLink(link);
            img.src = convertRedToBlack(img).src;
        },1000);
    }
    
    
    setImgLink(link) {
        document.getElementById(this.root).querySelector("*[result]").children[0].src=link;
    }
    
    imgLink(diceNumber) {
        return `https://raw.githubusercontent.com/L596241/dice/main/dice_png/dice_${diceNumber}.png`;
    } 
}
//lagt til lyd paa terningskastene :)
const controller = new DiceController("root");
document.addEventListener("DOMContentLoaded", controller.run.bind(controller), true);
const audio = new Audio(`sound/rolling-dice.mp3`);
const buttons = document.querySelectorAll("button");
//paa klick paa knapp, saa spilles lyd av
buttons.forEach(button => {
  button.addEventListener("click", () => {
    audio.play();
  });
});