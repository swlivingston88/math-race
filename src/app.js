import { Level } from "./Level.js";
import { Recap } from "./Recap.js";
import { SWLCustomElement } from "./SWLCustomElement.js";

const template = `
`;

Recap.swlRegister();
Level.swlRegister();



export class MathRaceApp extends SWLCustomElement {

    static ELEMENT_NAME = 'swl-math-race';

    constructor(){
        super({template:template});
        this.currentLevel = 0;
        this.swlRender();
    }

    swlRender(){
        super.swlRender();
        this.finished = false;
        
        let level = new Level(this.currentLevel);
        this.appendChild(level);
        level.swlOn(Level.EVENTS.WIN, () => {
            if(!this.finished) {
                this.finished = true;
                this.currentLevel++;
                level.destroy();
                this.recap(true);
            }
        });
        level.swlOn(Level.EVENTS.LOSE, () => {
            if(!this.finished) {
                this.finished = true;
                level.destroy();
                this.recap(false);
            }
        });
    }

    recap(win){
        let recap = new Recap({win: win});
        this.appendChild(recap);
        recap.swlOn(Recap.EVENTS.DONE, () => {
            this.swlFindElement(Recap).remove();
            this.swlRender();
        });
    }


}

MathRaceApp.swlRegister();