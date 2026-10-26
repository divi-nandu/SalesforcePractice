import { LightningElement } from 'lwc';

export default class TreeGridDemo extends LightningElement {

    columns = [
        {
            label: 'Name',
            fieldName: 'name',
            type: 'text'
        },
        {
            label: 'Role',
            fieldName: 'role',
            type: 'text'
        },
        {
            label: 'Experience',
            fieldName: 'experience',
            type: 'number'
        }
    ];

    gridData = [
        {
            name: 'Sales Department',
            role: 'Department',
            experience: 0,
            _children: [
                {
                    name: 'Nandu',
                    role: 'Salesforce Developer',
                    experience: 2
                },
                {
                    name: 'John',
                    role: 'Sales Executive',
                    experience: 3
                }
            ]
        },
        {
            name: 'IT Department',
            role: 'Department',
            experience: 0,
            _children: [
                {
                    name: 'Priya',
                    role: 'Software Engineer',
                    experience: 4
                },
                {
                    name: 'Smith',
                    role: 'Tester',
                    experience: 2
                }
            ]
        }
    ];
}