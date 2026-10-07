import { LightningElement } from 'lwc';

export default class GetterDemo extends LightningElement {

    users = ['John', 'Smith', 'Nick'];

    number1 = 10;
number2 = 20;

    get firstUser() {
    return this.users[0].toUpperCase();
}

    get multiplication() {
    return this.number1 * this.number2;
}

}