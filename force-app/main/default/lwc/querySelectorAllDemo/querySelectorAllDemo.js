import { LightningElement } from 'lwc';

export default class QuerySelectorAllDemo extends LightningElement {

    fetchDetails() {

        const elements = Array.from(
            this.template.querySelectorAll('.name')
        );

        elements.forEach((item) => {
            console.log(item.innerText);
        });

    }

}