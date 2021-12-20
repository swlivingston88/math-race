var mathService = function(){
    var ops = {
        'plus' : {
            'sign' : '+',
            'apply' : function(a, b){
                return a + b;
            },
            'max' : 10, //max sum
            'min' : 0, //min sum
            'getProblem' : function(){
                var num1 = rand(0, this.max);
                var num2 = rand(0, this.max - num1);
                return _getProblemObject(num1, num2, this);
            }
        }, 
        'minus' : {
            'sign' : '-',
            'apply' : function (a, b){
                return a - b;
            },
            'max' : 10, //max difference
            'min' : 0, //min difference
            'getProblem' : function(){
                var num1 = rand(0, this.max);
                var num2 = rand(0, this.max - num1);
        
                if(num1 - num2 < this.min){
                    return _getProblemObject(num2, num1, this);
                }else{
                    return _getProblemObject(num1, num2, this);
                }
            }
        },
        'multiply':{
            'sign' : 'x',
            'apply' : function (a, b){
                return a * b;
            },
            'max' : 3, //operand max
            'min' : 0, //operand min
            'getProblem' : function(){
                var num1 = rand(this.min, this.max);
                var num2 = rand(this.min, this.max);
                return _getProblemObject(num1, num2, this);
            }
        }
    };

    function rand(min, max){
        return Math.floor(Math.random() * (max-min + 1) + min)
    }

    function _getProblemObject(num1, num2, operator){
        return {
            num1 : num1, 
            num2 : num2,
            operator : operator.sign,
            answer : operator.apply(num1, num2)
        }
    }

    return {
        ops : ops,
        rand : rand
    }

}();

export {mathService};