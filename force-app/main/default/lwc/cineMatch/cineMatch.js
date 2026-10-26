
import { LightningElement } from 'lwc';
import fightclub from '@salesforce/resourceUrl/fightclub';

export default class CineMatch extends LightningElement {
    heroImage = fightclub;
    selectedMood = '';

    get heroStyle() {
        return `background-image:
            linear-gradient(
                90deg,
                rgba(10, 10, 12, 0.96) 0%,
                rgba(10, 10, 12, 0.78) 48%,
                rgba(10, 10, 12, 0.28) 100%
            ),
            url("${this.heroImage}");`;
    }

    handleExplore() {
        const moodSection =
            this.template.querySelector('.mood-section');

        if (moodSection) {
            moodSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleTrending() {
        const trendingSection =
            this.template.querySelector('.trending-section');

        if (trendingSection) {
            trendingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleMoodSelect(event) {
        const mood = event.detail;

        this.selectedMood =
            typeof mood === 'string'
                ? mood
                : mood?.mood || mood?.selectedMood || '';
    }
}
