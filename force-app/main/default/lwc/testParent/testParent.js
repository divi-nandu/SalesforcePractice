import { LightningElement } from 'lwc';

export default class TestParent extends LightningElement {

    isChildVisible = false;

    showChild() {
        this.isChildVisible = true;
    }

    removeChild() {
        this.isChildVisible = false;
    }

    renderedCallback() {
        console.log('Parent renderedCallback');
    }
}