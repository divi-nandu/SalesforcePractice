import { LightningElement } from 'lwc';

export default class ErrorParent extends LightningElement {

    showChild = false;

    loadChild() {
        this.showChild = true;
    }

    errorCallback(error, stack) {
        console.log('Error:', error);
        console.log('Stack:', stack);
    }
}