import { LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';

export default class LightningConfirmDemo extends LightningElement {
    resultMessage = '';

    async confirmAction() {
        const confirmed = await LightningConfirm.open({
            message: 'Are you sure you want to continue?',
            label: 'Confirm Action',
            theme: 'warning'
        });

        if (confirmed) {
            this.resultMessage = 'You clicked OK. Action confirmed!';
        } else {
            this.resultMessage = 'You clicked Cancel. Action cancelled.';
        }
    }
}
