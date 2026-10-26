
import { LightningElement } from 'lwc';

export default class ModalDemo extends LightningElement {
    isModalOpen = false;
    message = 'Click Open Modal to begin.';

    handleOpen() {
        this.isModalOpen = true;
    }

    handleClose() {
        this.isModalOpen = false;
    }

    handleConfirm() {
        this.message = 'You clicked Confirm!';
        this.isModalOpen = false;
    }
}
