import { LightningElement } from 'lwc';

export default class CarouselDemo extends LightningElement {
    courseSlides = [
        {
            title: 'Salesforce LWC',
            description:
                'Learn to build reusable Lightning Web Components and interactive user interfaces.',
            icon: 'utility:apps'
        },
        {
            title: 'AWS Cloud',
            description:
                'Explore cloud computing, storage, networking, and core AWS services.',
            icon: 'utility:cloud'
        },
        {
            title: 'Data Analytics',
            description:
                'Learn to analyze data, identify patterns, and create useful reports.',
            icon: 'utility:chart'
        },
        {
            title: 'SQL Fundamentals',
            description:
                'Practice retrieving, filtering, and organizing information using SQL.',
            icon: 'utility:database'
        }
    ];
}
