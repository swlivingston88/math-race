import { mathService } from "./MathService.js";
import { SWLCustomElement } from "./SWLCustomElement.js";

const template = `
<div class="row">
    <div class="col-xs-12 col-centered">
        <h3 class="problem">{{problem}}</h3>
    </div>
</div>

<div class="row">
    {{#each answers}}
    <div class="col-xs-4 option-col">
        <button class="btn btn-primary option" data-val="{{this}}">{{this}}</button>
    </div>
    {{/each}}
</div>
`;

export class MathQuestion extends SWLCustomElement {

    static ELEMENT_NAME = 'swl-math-question';
    static EVENTS = {
        'correct': 'swl.math-question.correct',
        'wrong': 'swl.math-question.wrong'
    }

    constructor(mathObject = mathService.ops.plus){
        super({template:template});
        this.mathObject = mathObject;
        this.swlRender();
    }

    swlRender(){
        this.problemData = this.mathObject.getProblem();
        let p = this.problemData.num1 + this.problemData.operator + this.problemData.num2;
        let answers = [];
        let min = this.mathObject.min;
        let max = this.mathObject.max * 2;
        answers[0] = this.problemData.answer;
        answers[1] = mathService.rand(min, max);
        answers[2] = mathService.rand(min, max);
        this.shuffleArray(answers);

        super.swlRender({problem: p, answers: answers});
        this.swlQuery('.option').on('click', (e) => {
            let selected = e.target.dataset.val;
            if(parseInt(selected) === parseInt(this.problemData.answer)){
                this.swlTrigger(MathQuestion.EVENTS.correct);
            }else{
                this.swlTrigger(MathQuestion.EVENTS.wrong);
            }
        });
    }

    newProblem(){
        this.problem = this.mathObject.getProblem();
        let p = this.problem.num1 + this.problem.operator + this.problem.num2;
        this.swlQuery('.problem').html(p);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}