import { LightningElement, api } from 'lwc';

import pursuit from '@salesforce/resourceUrl/pursuit';
import goodwillhunting from '@salesforce/resourceUrl/goodwillhunting';
import fightclub from '@salesforce/resourceUrl/fightclub';
import spiderman1 from '@salesforce/resourceUrl/spiderman1';

export default class MovieResults extends LightningElement {

    _selectedMood;
    selectedMovie;

    @api
    get selectedMood() {
        return this._selectedMood;
    }

    set selectedMood(value) {
        this._selectedMood = value;

        // Clear previous movie details
        this.selectedMovie = null;
    }

    movies = [
        {
            id: 1,
            title: 'The Pursuit of Happyness',
            genre: 'Feel Good',
            rating: '8.0',
            year: '2006',
            ott: 'Sony Pictures Amazon Channel',
            image: pursuit,
            description: 'A struggling salesman tries to build a better life for himself and his son.'
        },
        {
            id: 2,
            title: 'Good Will Hunting',
            genre: 'Emotional',
            rating: '8.3',
            year: '1997',
            ott: 'JioHotstar',
            image: goodwillhunting,
            description: 'A young mathematical genius discovers his potential with help from a mentor.'
        },
        {
            id: 3,
            title: 'Fight Club',
            genre: 'Thriller',
            rating: '8.8',
            year: '1999',
            ott: 'Not currently streaming',
            image: fightclub,
            description: 'An ordinary man enters a mysterious underground world that changes his life.'
        },
        {
            id: 4,
            title: 'Spider-Man',
            genre: 'Action',
            rating: '7.4',
            year: '2002',
            ott: 'Prime Video • JioHotstar • SonyLIV',
            image: spiderman1,
            description: 'A teenager gains extraordinary powers and learns what it means to be a hero.'
        }
    ];

    get recommendedMovies() {
        if (!this.selectedMood) {
            return [];
        }

        return this.movies.filter(
            movie => movie.genre === this.selectedMood
        );
    }

    get hasRecommendations() {
        return this.recommendedMovies.length > 0;
    }

    handleViewDetails(event) {

        const movieId = event.currentTarget.dataset.id;

        this.selectedMovie = this.movies.find(
            movie => movie.id == movieId
        );
    }
}