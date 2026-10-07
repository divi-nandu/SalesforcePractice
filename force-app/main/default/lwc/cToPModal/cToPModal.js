import { LightningElement } from 'lwc';

export default class CToPModal extends LightningElement {

    handleClose() {

        const event = new CustomEvent('close', {
            detail: 'Model closed successfully'
        });

        this.dispatchEvent(event);

    }

}