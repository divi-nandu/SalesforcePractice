import { LightningElement } from 'lwc';
import LightningPrompt from 'lightning/prompt';

export default class LightningPromptDemo extends LightningElement {
    resultMessage = '';

    async askName() {
        const name = await LightningPrompt.open({
            label: 'Enter Your Name',
            message: 'Please enter your name:',
            defaultValue: '',
            theme: 'info'
        });

        if (name !== null && name.trim() !== '') {
            this.resultMessage = `Hello, ${name}!`;
        } else if (name === null) {
            this.resultMessage = 'You cancelled the prompt.';
        } else {
            this.resultMessage = 'You did not enter a name.';
        }
    }
}
