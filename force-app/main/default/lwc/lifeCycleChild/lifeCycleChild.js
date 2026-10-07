import { LightningElement } from 'lwc';

export default class LifeCycleChild extends LightningElement {

    constructor() {
        super();
        console.log('Child constructor');
    }

    connectedCallback() {
        console.log('Child connectedCallback');
    }

    renderedCallback() {
        console.log('Child renderedCallback');
    }
}