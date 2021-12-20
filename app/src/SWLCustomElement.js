
/**
 * This class is provides functionality to implement a custom element.
 * The class that extends this should always pass in a template string (which can use handlebars syntax) when invoking super() in the constructor
 *      Example: super({template: myTemplate});
 * When swlRender(data) is invoked, the data passed in will be used populate any properties defined within the template.
 * This custom tag will not result in HTML being added to the DOM until swlRender(...) is invoked.
 * Therefore, it is common to call swlRender(...) in the constructor so that content is displayed as soon as the custom element is added to the DOM.
 */
export class SWLCustomElement extends HTMLElement {

    /**
     * The extending class should always define the name of the custom element by setting the value of ELEMENT_NAME.
     * Example: static ELEMENT_NAME = "swl-custom-element";
     */
    static ELEMENT_NAME = "" //Override this!

    /**
     * This constructor is invoked when an extending class calls super();
     * This constructor should always receive an object with template defined
     *      Example: super({template: myTemplate});
     * @param {*} constructorObject 
     */
    constructor({
        template = '<div />'
    }){
        super();
        // @ts-ignore
        this.template = Handlebars.compile(template);
    }

    /**
     * Passes the given data to the this custom element's template 
     * and displays the resulting HTML within this custom element.
     * It is common to call this method in the constructor so that HTML is displayed 
     * as soon as this custom element is added to the DOM.
     * Event handlers should be added within this method so that they are re-applied each time this element is rendered.
     * @param {*} data - data to be passed into the template. This field is optional.
     */
    swlRender(data = {}){
        this.innerHTML = this.template(data)

        //Add event handlers here when overriding method.
    }

    /**
     * @template T
     * @param {new() => T} clazz
     * @returns {T}
     */
    swlFindElement(clazz){
        // @ts-ignore
        return this.querySelector(clazz.ELEMENT_NAME);
    }

    /**
     * @template T
     * @param {any} selector
     * @param {new () => T} clazz
     * @returns {[T]}
     */
    swlFindElements(selector, clazz){
        // @ts-ignore
        return this.querySelectorAll(selector);
    }

    /**
     * Returns a jQuery object containing the element(s) within this custom element that match the given selector.
     * If a custom element was selected with this method, you will NOT be able to call the methods extended by the custom element.
     * Use swlFind(...) when selecting custom elements if you need to invoke extended methods.
     * @example this.swlQuery('.submitButton');
     * @param {string} selector - selector used to find element(s) within this custom element.
     * @returns jQuery object containing the element(s) within this custom element that match the given selector
     */
    swlQuery(selector){
        return jQuery(this).find(selector);
    }

    /**
     * Triggers an event to notify listeners that something happened.
     * Data about the event can be sent and will be available to the listener.
     * See swlOn(...) for information about listening to a custom event.
     * @example this.swlTrigger('net.swl.account-selected', accountKey);
     * @param {string} eventName - name of the event
     * @param data - data to be sent to the listener of this event.
     */
    swlTrigger(eventName, data){
        this.dispatchEvent(new CustomEvent(eventName, {detail: data})); //Additional event data must be in the detail property on CustomEvent
    }

    /**
     * Executes the given handler function when this element triggers an event with the given name.
     * @example accountSelectElement.swlOn('net.swl.account-selected', (accountKey) => {console.log(`The account with key ${accountKey} was selected!`)})
     * @param {any} eventName - name of the event that, when triggered, will invoke the given handler function
     * @param {(data: any) => any} handler - function to be executed when the given event is triggered.
     */
    swlOn(eventName, handler){
        this.addEventListener(eventName, (e) => handler(e.detail)); //Detail is the property where additional data is stored on CustomEvent
    }

    swlHide(){
        jQuery(this).hide();
    }

    swlShow(){
        jQuery(this).show();
    }

    /**
     * Notifies the browser that this custom element exists.
     * This method must be called on a custom element before it can be used.
     * If this custom element is used within a template, this method should be called immediately after.
     * @example
     * const template = `<swl-super-element></swl-super-element>`
     * SWLuperElement.swlRegister();
     */
    static swlRegister(){
        if(this.ELEMENT_NAME === ""){
            throw 'ELEMENT_NAME is not defined on class ' + this.name;
        }
        let existingRegisteryDefinition = window.customElements.get(this.ELEMENT_NAME);
        if(!existingRegisteryDefinition){ //Only register if it hasn't already been registered
            window.customElements.define(this.ELEMENT_NAME, this);
        }
    }

}

