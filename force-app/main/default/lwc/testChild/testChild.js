import { LightningElement } from 'lwc';

export default class TestChild extends LightningElement {

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

    disconnectedCallback() {
        alert('Child disconnectedCallback called');
    }
}