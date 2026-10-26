import { LightningElement, api } from "lwc";

export default class LwcBuilderDemo extends LightningElement {
    @api title;
    @api showMessage;
    @api recordId;
    @api objectApiName;
}