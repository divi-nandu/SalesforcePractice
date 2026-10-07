import { LightningElement } from 'lwc';

export default class CustomerCard extends LightningElement {
    customerName = 'Nandu';

    greetCustomer() {
        console.log('Hello Nandu');
    }

    changeHandler(event) {
        this.customerName = event.target.value;
    }
}