import { LightningElement } from 'lwc';

export default class InputIconDemo extends LightningElement {
    username = '';
    password = '';
    passwordType = 'password';
    toggleLabel = 'Show Password';
    toggleIcon = 'utility:preview';

    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    togglePassword() {
        if (this.passwordType === 'password') {
            this.passwordType = 'text';
            this.toggleLabel = 'Hide Password';
            this.toggleIcon = 'utility:hide';
        } else {
            this.passwordType = 'password';
            this.toggleLabel = 'Show Password';
            this.toggleIcon = 'utility:preview';
        }
    }
}
