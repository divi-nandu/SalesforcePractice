import { LightningElement, api } from 'lwc';

export default class P2cSlider extends LightningElement {

    value = 20;

    @api
    resetSlider() {
        this.value = 50;
    }

}