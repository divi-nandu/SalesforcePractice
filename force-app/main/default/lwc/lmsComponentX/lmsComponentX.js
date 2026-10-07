import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class LmsComponentX extends LightningElement {
    receivedMessage = '';
    subscription = null;

    // 1. Get the message context
    @wire(MessageContext)
    context;

    // 2. Automatically listen as soon as the component loads
    connectedCallback() {
        this.subscribeMC();
    }

    // 3. Subscribe to the channel
    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(
            this.context,
            SAMPLEMC,
            (message) => { this.handleMessage(message); },
            { scope: APPLICATION_SCOPE }
        );
    }

    // 4. Handle incoming message
    handleMessage(message) {
        // We check for message.lmsData.value to match our publisher!
        this.receivedMessage = message && message.lmsData ? message.lmsData.value : 'No message published';
    }

    // 5. Unsubscribe button logic
    unsubscribeMC() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}