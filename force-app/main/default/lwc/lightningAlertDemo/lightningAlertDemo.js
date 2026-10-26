import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';

export default class LightningAlertDemo extends LightningElement {
    async showAlert() {
        await LightningAlert.open({
            message: 'Your information has been saved successfully!',
            theme: 'success',
            label: 'Success'
        });
    }
}
