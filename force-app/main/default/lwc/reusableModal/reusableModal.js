
import { LightningElement } from 'lwc';

export default class ReusableModal extends LightningElement {

    handleClose() {
        this.dispatchEvent(
            new CustomEvent('close')
        );
    }
}
