import { LightningElement, track, wire } from 'lwc';
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class LwcMessenger extends LightningElement {
    @track messageValue = '';
    @track messageReceived = '';

    /* mandatory for LMS */
    @wire(MessageContext) messageContext;
    subscription;

    connectedCallback() {
        // subscribe once
        this.subscription = subscribe(
            this.messageContext,
            SAMPLE_CHANNEL,
            (payload) => this.handleMessage(payload)
        );
    }

    /* update local input */
    handleInput(event) {
        this.messageValue = event.target.value;
    }

    /* publish to channel */
    publishMessage() {
        if (!this.messageValue) { return; }

        const payload = { lmsData : { value : this.messageValue } };
        publish(this.messageContext, SAMPLE_CHANNEL, payload);
    }

    /* handle incoming payload */
    handleMessage(payload) {
        if (payload?.lmsData?.value) {
            this.messageReceived = payload.lmsData.value;
        }
    }
}