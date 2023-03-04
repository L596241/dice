class Dice {
    
    roll() {
        return Math.floor(Math.random()*6+1);
    }
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
        },1000);
    }
    
    
    setImgLink(link) {
        document.getElementById(this.root).querySelector("*[result]").children[0].src=link;
    }
    
    imgLink(diceNumber) {
        return `/dice_png/dice_${diceNumber}.png`;
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