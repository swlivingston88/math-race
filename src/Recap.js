import { SWLCustomElement } from "./SWLCustomElement.js";

const template = ` 

<div class="row">
    <div class="col" style="text-align: center; margin-top: 50%">
        <h1>{{message}}</h1>
        <br/>
    </div>
</div>
<div class="row">
    <div class="col" style="text-align: center">
        <button class="btn btn btn-outline-primary">Continue</button>
    </div>
</div>

`;

export class Recap extends SWLCustomElement {

    static ELEMENT_NAME = 'swl-recap';
    static EVENTS = {
        DONE: 'swl.recap.done'
    }

    constructor(arg = {
        win: true
    }){
        super({template:template});
        if(arg.win){
            this.message = "You Win!";
        }else{
            this.message = "You Lose :(";
        }
        this.swlRender();
    }

    swlRender(){
        super.swlRender({message: this.message});
        this.swlQuery('.btn').on('click', () => {
            this.swlTrigger(Recap.EVENTS.DONE);
        });
    }
}