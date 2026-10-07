import { LightningElement } from 'lwc';
import fightclub from '@salesforce/resourceUrl/fightclub';

export default class CineMatch extends LightningElement {

    heroImage = fightclub;
    selectedMood;

    get heroStyle() {
        return `background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.95),
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.2)
        ), url(${this.heroImage});`;
    }

   handleExplore() {
    const moodSection = this.template.querySelector('c-mood-categories');

    if (moodSection) {
        moodSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

    handleMoodSelect(event) {
        this.selectedMood = event.detail;
        console.log('Selected Mood:', this.selectedMood);
    }
}