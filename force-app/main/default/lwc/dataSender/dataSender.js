import { LightningElement } from 'lwc';

import spiderman1 from '@salesforce/resourceUrl/spiderman1';
import spiderman2 from '@salesforce/resourceUrl/spiderman2';
import spiderman3 from '@salesforce/resourceUrl/spiderman3';

export default class DataSender extends LightningElement {

    student = {
    name: 'Divi',
    course: 'LWC',
    experience: 2
};

names = ['Divi', 'Ravi', 'Suresh'];

employeeList = [
    {
        name: 'Divi',
        role: 'Developer'
    },
    {
        name: 'Ravi',
        role: 'Tester'
    },
    {
        name: 'Suresh',
        role: 'Admin'
    }
];

percentage = 10;

handleChange(event) {
    this.percentage = event.target.value;
}

handleReset() {
    const slider = this.template.querySelector('c-p2c-slider');
    slider.resetSlider();
}

    carouselData = [
        {
            image: spiderman1,
            header: 'Spider-Man 1',
            description: 'Spider-Man First Image'
        },
        {
            image: spiderman2,
            header: 'Spider-Man 2',
            description: 'Spider-Man Second Image'
        },
        {
            image: spiderman3,
            header: 'Spider-Man 3',
            description: 'Spider-Man Third Image'
        }
    ];
}