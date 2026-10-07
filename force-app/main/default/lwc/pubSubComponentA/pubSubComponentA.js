import { LightningElement } from 'lwc';
import pubsub from 'c/pubSub';

export default class PubSubComponentA extends LightningElement {

    message = '';

    inputHandler(event) {
        this.message = event.target.value;
    }

    publishHandler() {
        pubsub.publish('componentA', this.message);
    }

}