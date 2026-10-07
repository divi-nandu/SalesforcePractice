import { LightningElement, track } from 'lwc';

export default class TrackDemo extends LightningElement {

    @track address = {
        city: 'Hyderabad',
        country: 'India'
    };

    changeCity(event) {
        this.address.city = event.target.value;
    }
}