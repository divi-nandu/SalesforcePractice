import { LightningElement } from 'lwc';

export default class MoodCategories extends LightningElement {

    moods = [
        { id: 1, name: 'Feel Good', emoji: '😊' },
        { id: 2, name: 'Emotional', emoji: '😢' },
        { id: 3, name: 'Thriller', emoji: '😱' },
        { id: 4, name: 'Action', emoji: '🦸' }
    ];

    handleMood(event) {

        const buttons = this.template.querySelectorAll('.mood-button');

        buttons.forEach(button => {
            button.classList.remove('selected');
        });

        event.currentTarget.classList.add('selected');

        const selectedMood = event.currentTarget.dataset.mood;

        this.dispatchEvent(
            new CustomEvent('moodselect', {
                detail: selectedMood
            })
        );
    }

    handleClear() {

        const buttons = this.template.querySelectorAll('.mood-button');

        buttons.forEach(button => {
            button.classList.remove('selected');
        });

        this.dispatchEvent(
            new CustomEvent('moodselect', {
                detail: ''
            })
        );
    }
}