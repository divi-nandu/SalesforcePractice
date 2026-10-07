import { LightningElement } from 'lwc';

export default class QuerySelectorDemo extends LightningElement {

    fetchDetail() {

        const element = this.template.querySelector('h1');

        console.log(element.innerText);

    }

}