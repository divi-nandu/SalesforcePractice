import { LightningElement } from 'lwc';

export default class CToPParent extends LightningElement {

    showModal = false;
    message = '';

    handleOpen() {
        this.showModal = true;
    }

    closeHandler(event) {
        this.showModal = false;
        this.message = event.detail;
    }
    handleParentClick() {
    console.log('Parent event called');
}

}