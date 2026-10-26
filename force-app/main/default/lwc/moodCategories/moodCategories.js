
import { LightningElement } from 'lwc';

export default class MoodCategories extends LightningElement {
    selectedMood = '';

    handleMoodClick(event) {
        const mood = event.currentTarget.dataset.mood;

        this.selectedMood = mood;

        this.dispatchEvent(
            new CustomEvent('moodselect', {
                detail: mood,
                bubbles: true,
                composed: true
            })
        );
    }

    handleClearMood() {
        this.selectedMood = '';

        this.dispatchEvent(
            new CustomEvent('moodselect', {
                detail: '',
                bubbles: true,
                composed: true
            })
        );
    }

    get isFeelGoodSelected() {
        return this.selectedMood === 'Feel Good';
    }

    get isEmotionalSelected() {
        return this.selectedMood === 'Emotional';
    }

    get isThrillerSelected() {
        return this.selectedMood === 'Thriller';
    }

    get isActionSelected() {
        return this.selectedMood === 'Action';
    }

    get feelGoodClass() {
        return this.getMoodClass('Feel Good');
    }

    get emotionalClass() {
        return this.getMoodClass('Emotional');
    }

    get thrillerClass() {
        return this.getMoodClass('Thriller');
    }

    get actionClass() {
        return this.getMoodClass('Action');
    }

    getMoodClass(mood) {
        return this.selectedMood === mood
            ? 'mood-card selected'
            : 'mood-card';
    }
}
