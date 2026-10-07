import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLE_MC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class LwcLmsComponentA extends LightningElement {
    inputValue = '';

    @wire(MessageContext)
    messageContext;

    inputHandler(event) {
        this.inputValue = event.target.value;
    }

    publishMessage() {
        const payload = {
            lmsData: {
                value: this.inputValue
            }
        };
        publish(this.messageContext, SAMPLE_MC, payload);
    }
}