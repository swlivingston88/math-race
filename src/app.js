import { Level } from "./Level.js";
import { LEVELS } from "./Levels.js";
import { SWLCustomElement } from "./SWLCustomElement.js";

const template = `

`;

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
        let level = new Level(this.currentLevel);
        this.appendChild(level);
        level.swlOn(Level.EVENTS.WIN, () => {
            this.currentLevel++;
            this.swlRender();
        });
        level.swlOn(Level.EVENTS.LOSE, () => {
            this.swlRender();
        });
    }


}

MathRaceApp.swlRegister();