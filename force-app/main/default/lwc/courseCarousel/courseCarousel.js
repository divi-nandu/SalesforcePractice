import { LightningElement, api } from 'lwc';

export default class CourseCarousel extends LightningElement {
    @api slides = [];

    currentIndex = 0;

    get currentSlide() {
        return this.slides[this.currentIndex] || {
            title: 'No Courses Available',
            description: 'Please add course information.',
            icon: 'utility:education'
        };
    }

    get currentIcon() {
        return this.currentSlide.icon || 'utility:education';
    }

    get totalSlides() {
        return this.slides.length;
    }

    get currentIndexDisplay() {
        return this.totalSlides > 0 ? this.currentIndex + 1 : 0;
    }

    get isFirstSlide() {
        return this.currentIndex === 0;
    }

    get isLastSlide() {
        return this.currentIndex >= this.slides.length - 1;
    }

    handleNext() {
        if (!this.isLastSlide) {
            this.currentIndex += 1;
        }
    }

    handlePrevious() {
        if (!this.isFirstSlide) {
            this.currentIndex -= 1;
        }
    }
}
