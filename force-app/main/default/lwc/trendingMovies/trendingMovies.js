import { LightningElement } from 'lwc';

import fightclub from '@salesforce/resourceUrl/fightclub';
import joker from '@salesforce/resourceUrl/Joker';
import pursuit from '@salesforce/resourceUrl/pursuit';
import breakingbad from '@salesforce/resourceUrl/breaking';

export default class TrendingMovies extends LightningElement {

    movies = [
        {
            id: 1,
            title: 'Fight Club',
            genre: 'Drama • Thriller',
            rating: '8.8',
            year: '1999',
            image: fightclub
        },
        {
            id: 2,
            title: 'Joker',
            genre: 'Crime • Drama',
            rating: '8.3',
            year: '2019',
            image: joker
        },
        {
            id: 3,
            title: 'The Pursuit of Happyness',
            genre: 'Drama',
            rating: '8.0',
            year: '2006',
            image: pursuit
        },
        {
            id: 4,
            title: 'Breaking Bad',
            genre: 'Crime • Drama',
            rating: '9.5',
            year: '2008',
            image: breakingbad
        }
    ];
}