import { LightningElement } from 'lwc';

// Replace 'user_image' with 'Onepiece'
import ONEPIECE_IMG from '@salesforce/resourceUrl/Onepiece';

export default class StaticImages extends LightningElement {
    // Expose it to the HTML template
    onepieceImage = ONEPIECE_IMG;
}