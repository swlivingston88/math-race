import { SWLCustomElement } from "./SWLCustomElement.js";

const template = `
<span class="racer racer1">
    <img class="img-fluid" src="assets/{{vehicle}}-trimmed.png">
</span>
`;

/**
 * <swl-racer data-vehicle=""></swl-racer>
 */
export class Racer extends SWLCustomElement {

    static ELEMENT_NAME = 'swl-racer';

    constructor(){
        super({template:template});
        this.vehicle = this.dataset.vehicle;
        this.score = 0;
        this.swlRender();
    }

    swlRender(){
        super.swlRender({vehicle: this.vehicle});
    }

    /**
     * @param {{ (): void; (this: HTMLElement): void; }} [callback]
     */
    move(callback){
        this.swlQuery('.racer').animate({
            top: "-=5%"
        }, 1000, "", () => {
            this.score++;
            callback();
        });
    }

    reverse(){
        this.score--;
        this.swlQuery('.racer').animate({
            top: "+=5%"
        }, 1000);
    }
}