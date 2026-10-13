import { LightningElement, api } from 'lwc';

export default class RecordFormDynamic extends LightningElement {
    @api recordId;
    @api objectApiName;
}