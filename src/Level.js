import { getLevel } from "./Levels.js";
import { MathQuestion } from "./MathQuestion.js";
import { mathService } from "./MathService.js";
import { Racer } from "./Racer.js";
import { SWLCustomElement } from "./SWLCustomElement.js";

const template = ` 
<div class="row">
    <div class="col-xs-12 col-centered">
        <h6>Level: <span class="level">{{level}}</span></h6>
    </div>
</div>

<span class="mathQuestion"></span>

<div class="row">
    <div class="col-xs-12 col-centered">
        <hr>
        <hr>
    </div>
</div>

<div class="row bgColor">
    <div class="col-xs-4 raceTrack">
        <swl-racer data-vehicle="blue-car" data-player="true"></swl-racer>
    </div>
    <div class="col-xs-4 raceTrack">
        <swl-racer data-vehicle="police-car"></swl-racer>
    </div>
    <div class="col-xs-4 raceTrack">
        <swl-racer data-vehicle="taxi-car"></swl-racer>
    </div>
</div>
`;

MathQuestion.swlRegister();
Racer.swlRegister();

export class Level extends SWLCustomElement {

    static ELEMENT_NAME = 'swl-level';
    static EVENTS = {
        WIN: 'swl.level.win',
        LOSE: 'swl.level.lose'
    }

    constructor(levelIdx = 0){
        super({template:template});
        this.levelIdx = levelIdx;
        let levelData = getLevel(this.levelIdx);
        this.moveChance = levelData.moveChance;
        this.winningScore = levelData.winningScore;
        this.time = 0;
        this.mathQuestion = new MathQuestion(levelData.mathObject);
        console.log('Move Chance = ' + this.moveChance);
        this.swlRender();
    }

    swlRender(){
        super.swlRender({level: this.levelIdx + 1});
        this.looper = setInterval(() => { this.loop() }, 1000);
        this.player = this.swlFindElements('swl-racer[data-player="true"]', Racer)[0];
        this.querySelector('.mathQuestion').appendChild(this.mathQuestion);
        this.mathQuestion.swlOn(MathQuestion.EVENTS.correct, () => {
            this.player.move(() => {
                console.log(this.player.score);
                if(this.player.score === this.winningScore) {
                    this.swlTrigger(Level.EVENTS.WIN);
                }
            });
            this.mathQuestion.swlRender();
        });
        this.mathQuestion.swlOn(MathQuestion.EVENTS.wrong, () => {
            this.player.reverse();
            this.mathQuestion.swlRender();
        });
    }

    loop(){
        let vehicles = this.swlFindElements('swl-racer', Racer);
        for(let vehicle of vehicles){
            if(vehicle.dataset.player !== 'true'){
                if(mathService.rand(0,100) <= this.moveChance) {
                    vehicle.move(() => {
                        console.log(vehicle.score);
                        if(vehicle.score === this.winningScore) {
                            this.swlTrigger(Level.EVENTS.LOSE);
                        }
                    });
                    
                }
            }
        }
    }

    destroy(){
        clearInterval(this.looper);
        this.remove();
    }

    
}