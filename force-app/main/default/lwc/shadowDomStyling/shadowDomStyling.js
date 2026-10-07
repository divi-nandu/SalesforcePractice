import { LightningElement } from 'lwc';

export default class ShadowDomStyling extends LightningElement {

    isLoaded = false;

    renderedCallback() {

        if (this.isLoaded) {
            return;
        }

        this.isLoaded = true;

        const style = document.createElement('style');

        style.innerText = `
            lightning-button .button {
                background: red;
                color: white;
            }
        `;

        this.template
            .querySelector('lightning-button')
            .appendChild(style);
    }
}