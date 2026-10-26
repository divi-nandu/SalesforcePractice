
import { LightningElement } from 'lwc';

export default class MapDemo extends LightningElement {
    mapMarkers = [
        {
            location: {
                City: 'Hyderabad',
                Country: 'India',
                Street: 'Financial District',
                State: 'Telangana'
            },
            title: 'Our Office',
            description: 'Welcome to our office location!'
        }
    ];
}
