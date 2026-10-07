import { LightningElement } from 'lwc';

import renderTemplate from './renderMethod.html';
import signInTemplate from './signInTemplate.html';
import signUpTemplate from './signUpTemplate.html';

export default class RenderMethod extends LightningElement {

    selectedButton = '';

    handleClick(event) {
        this.selectedButton = event.target.label;
    }

    handleBack() {
        this.selectedButton = '';
    }

    render() {
        if (this.selectedButton === 'Sign Up') {
            return signUpTemplate;
        }

        if (this.selectedButton === 'Sign In') {
            return signInTemplate;
        }

        return renderTemplate;
    }
}