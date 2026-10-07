import { LightningElement } from 'lwc';

export default class LifeCycleParent extends LightningElement {

    name = '';

    constructor() {
        super();
        console.log('Parent constructor');
    }

    connectedCallback() {
        console.log('Parent connectedCallback');
    }

    renderedCallback() {
        console.log('Parent renderedCallback');
    }

    changeHandler(event) {
        this.name = event.target.value;
    }
}