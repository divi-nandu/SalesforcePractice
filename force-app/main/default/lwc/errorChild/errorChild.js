import { LightningElement } from 'lwc';

export default class ErrorChild extends LightningElement {

    constructor() {
        super();
        console.log('Child constructor');
    }

    connectedCallback() {
        console.log('Child connectedCallback');

        throw new Error('Loading of child component failed');
    }

    renderedCallback() {
        console.log('Child renderedCallback');
    }
}