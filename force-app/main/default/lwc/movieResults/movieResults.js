
import { LightningElement, api } from 'lwc';
import getPopularMovies from '@salesforce/apex/CineMatchTMDBService.getPopularMovies';
import pursuit from '@salesforce/resourceUrl/pursuit';

const GENRE_NAMES = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
};

const FALLBACK_MOVIES = [
    {
        id: 999001,
        title: 'Fight Club',
        overview: 'An office worker encounters a mysterious man who changes his life.',
        poster_path: null,
        posterUrl: pursuit,
        release_date: '1999-10-15',
        vote_average: 8.4,
        popularity: 80,
        vote_count: 1000,
        genre_ids: [18, 53]
    }
];

export default class MovieResults extends LightningElement {
    @api selectedMood;

    movies = [];
    savedFavoriteIds = [];

    searchTerm = '';
    selectedGenre = 'All';
    selectedSort = 'popularity.desc';
    showFavoritesOnly = false;

    selectedMovie;
    smartPickMovie;
    smartPickMessage = '';

    isLoading = false;
    errorMessage = '';
    loadMoreError = '';

    currentPage = 0;
    totalPages = 1;

    genreOptions = [
        { label: 'All Genres', value: 'All' },
        { label: 'Action', value: 'Action' },
        { label: 'Adventure', value: 'Adventure' },
        { label: 'Animation', value: 'Animation' },
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Crime', value: 'Crime' },
        { label: 'Drama', value: 'Drama' },
        { label: 'Family', value: 'Family' },
        { label: 'Fantasy', value: 'Fantasy' },
        { label: 'Horror', value: 'Horror' },
        { label: 'Mystery', value: 'Mystery' },
        { label: 'Romance', value: 'Romance' },
        { label: 'Science Fiction', value: 'Science Fiction' },
        { label: 'Thriller', value: 'Thriller' }
    ];

    sortOptions = [
        { label: 'Popularity: High to Low', value: 'popularity.desc' },
        { label: 'Rating: High to Low', value: 'rating.desc' },
        { label: 'Title: A to Z', value: 'title.asc' },
        { label: 'Release Date: Newest First', value: 'date.desc' }
    ];

    connectedCallback() {
        this.loadSavedFavorites();
        this.loadMovies(1);
    }

    // Load favorite movie IDs saved in this browser.
    loadSavedFavorites() {
        try {
            const saved = window.localStorage.getItem(
                'cineMatchFavorites'
            );

            this.savedFavoriteIds = saved
                ? JSON.parse(saved).map(id => Number(id))
                : [];
        } catch (error) {
            this.savedFavoriteIds = [];
        }
    }

    // Get movies from TMDB through the Apex service.
    async loadMovies(pageNumber) {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        this.loadMoreError = '';

        if (pageNumber === 1) {
            this.errorMessage = '';
        }

        try {
            const responseText = await getPopularMovies({
                pageNumber: pageNumber
            });

            const response = JSON.parse(responseText);
            const results = response.results || [];

            const newMovies = results.map(movie => {
                const movieId = Number(movie.id);
                const isFavorite =
                    this.savedFavoriteIds.includes(movieId);

                const genreNames = (movie.genre_ids || [])
                    .map(id => GENRE_NAMES[id])
                    .filter(name => Boolean(name));

                return {
                    id: movieId,
                    title: movie.title || 'Untitled Movie',
                    overview: movie.overview || 'No description available.',
                    posterUrl: movie.poster_path
                        ? 'https://image.tmdb.org/t/p/w500' +
                          movie.poster_path
                        : pursuit,
                    releaseDate: movie.release_date || '',
                    year: movie.release_date
                        ? movie.release_date.substring(0, 4)
                        : 'N/A',
                    rating: Number(movie.vote_average || 0),
                    popularity: Number(movie.popularity || 0),
                    voteCount: Number(movie.vote_count || 0),
                    genreIds: movie.genre_ids || [],
                    genres: genreNames,
                    genre: genreNames.length
                        ? genreNames.join(', ')
                        : 'Other',
                    isFavorite: isFavorite,
                    favoriteLabel: isFavorite
                        ? 'Remove from Favorites'
                        : 'Add to Favorites',
                    tmdbUrl:
                        'https://www.themoviedb.org/movie/' + movieId
                };
            });

            if (pageNumber === 1) {
                this.movies = newMovies;
            } else {
                const existingIds = new Set(
                    this.movies.map(movie => movie.id)
                );

                const uniqueMovies = newMovies.filter(
                    movie => !existingIds.has(movie.id)
                );

                this.movies = [...this.movies, ...uniqueMovies];
            }

            this.currentPage = pageNumber;
            this.totalPages = Math.min(
                Number(response.total_pages || 1),
                500
            );

            if (pageNumber === 1 && this.movies.length === 0) {
                this.errorMessage = 'No movies were returned by TMDB.';
            }
        } catch (error) {
            if (pageNumber === 1) {
                this.errorMessage =
                    'Could not load TMDB movies. Showing a sample movie instead.';

                this.movies = FALLBACK_MOVIES.map(movie => {
                    const isFavorite =
                        this.savedFavoriteIds.includes(Number(movie.id));

                    return {
                        ...movie,
                        id: Number(movie.id),
                        releaseDate: movie.release_date || '',
                        year: movie.release_date
                            ? movie.release_date.substring(0, 4)
                            : 'N/A',
                        rating: Number(movie.vote_average || 0),
                        voteCount: Number(movie.vote_count || 0),
                        genreIds: movie.genre_ids || [],
                        genres: (movie.genre_ids || [])
                            .map(id => GENRE_NAMES[id])
                            .filter(name => Boolean(name)),
                        genre: (movie.genre_ids || [])
                            .map(id => GENRE_NAMES[id])
                            .filter(name => Boolean(name))
                            .join(', ') || 'Other',
                        isFavorite: isFavorite,
                        favoriteLabel: isFavorite
                            ? 'Remove from Favorites'
                            : 'Add to Favorites',
                        tmdbUrl:
                            'https://www.themoviedb.org/movie/' +
                            movie.id
                    };
                });

                this.currentPage = 1;
                this.totalPages = 1;
            } else {
                this.loadMoreError =
                    'Could not load more movies. Please try again.';
            }
        } finally {
            this.isLoading = false;
        }
    }

    // Filter and sort the movies displayed on the page.
    get recommendedMovies() {
        let results = [...this.movies];

        if (this.searchTerm) {
            const search = this.searchTerm.toLowerCase();

            results = results.filter(movie =>
                movie.title.toLowerCase().includes(search)
            );
        }

        if (this.selectedGenre !== 'All') {
            results = results.filter(movie =>
                movie.genres.includes(this.selectedGenre)
            );
        }

        if (this.showFavoritesOnly) {
            results = results.filter(movie => movie.isFavorite);
        }

        if (this.selectedMood) {
            const mood = this.selectedMood.toLowerCase();

            results = results.filter(movie => {
                const genres = movie.genres.map(
                    genre => genre.toLowerCase()
                );

                if (mood.includes('feel good')) {
                    return genres.includes('comedy') ||
                        genres.includes('family') ||
                        genres.includes('romance');
                }

                if (mood.includes('emotional')) {
                    return genres.includes('drama') ||
                        genres.includes('romance');
                }

                if (mood.includes('thriller')) {
                    return genres.includes('thriller') ||
                        genres.includes('mystery') ||
                        genres.includes('crime');
                }

                if (mood.includes('action')) {
                    return genres.includes('action') ||
                        genres.includes('adventure');
                }

                return true;
            });
        }

        if (this.selectedSort === 'rating.desc') {
            results.sort((a, b) => b.rating - a.rating);
        } else if (this.selectedSort === 'title.asc') {
            results.sort((a, b) => a.title.localeCompare(b.title));
        } else if (this.selectedSort === 'date.desc') {
            results.sort((a, b) =>
                (b.releaseDate || '').localeCompare(a.releaseDate || '')
            );
        } else {
            results.sort((a, b) => b.popularity - a.popularity);
        }

        return results;
    }

    get hasMovies() {
        return this.recommendedMovies.length > 0;
    }

    get resultCount() {
        return this.recommendedMovies.length;
    }

    get totalLoadedMovies() {
        return this.movies.length;
    }

    get movieCountMessage() {
        return `Showing ${this.resultCount} matching movies out of ${this.totalLoadedMovies} loaded movies.`;
    }

    get hasMoreMovies() {
        return this.currentPage < this.totalPages;
    }

    get loadMoreLabel() {
        return this.isLoading
            ? 'Loading Movies...'
            : 'Load More Movies';
    }

    get hasSelectedMovie() {
        return Boolean(this.selectedMovie);
    }

    get hasSmartPick() {
        return Boolean(this.smartPickMovie);
    }

    handleSearch(event) {
        this.searchTerm = event.target.value || '';
        this.clearSmartPick();
    }

    handleGenreChange(event) {
        this.selectedGenre = event.detail.value;
        this.clearSmartPick();
    }

    handleSortChange(event) {
        this.selectedSort = event.detail.value;
    }

    handleFavoritesOnlyChange(event) {
        this.showFavoritesOnly = event.target.checked;
        this.clearSmartPick();
    }

    handleClearFilters() {
        this.searchTerm = '';
        this.selectedGenre = 'All';
        this.selectedSort = 'popularity.desc';
        this.showFavoritesOnly = false;
        this.selectedMood = undefined;
        this.clearSmartPick();
    }

    handleLoadMore() {
        if (this.hasMoreMovies && !this.isLoading) {
            this.loadMovies(this.currentPage + 1);
        }
    }

    handleRetryLoadMore() {
        this.loadMoreError = '';
        this.loadMovies(this.currentPage + 1);
    }

    handleRetry() {
        this.movies = [];
        this.currentPage = 0;
        this.totalPages = 1;
        this.errorMessage = '';
        this.loadMovies(1);
    }

    // Update the button label and save favorites in local storage.
    handleToggleFavorite(event) {
        const movieId = Number(event.currentTarget.dataset.id);

        this.movies = this.movies.map(movie => {
            if (movie.id === movieId) {
                const isFavorite = !movie.isFavorite;

                return {
                    ...movie,
                    isFavorite: isFavorite,
                    favoriteLabel: isFavorite
                        ? 'Remove from Favorites'
                        : 'Add to Favorites'
                };
            }

            return movie;
        });

        this.savedFavoriteIds = this.movies
            .filter(movie => movie.isFavorite)
            .map(movie => Number(movie.id));

        try {
            window.localStorage.setItem(
                'cineMatchFavorites',
                JSON.stringify(this.savedFavoriteIds)
            );
        } catch (error) {
            // The favorite state still updates for the current session.
        }

        if (this.selectedMovie && this.selectedMovie.id === movieId) {
            this.selectedMovie = this.movies.find(
                movie => movie.id === movieId
            );
        }

        if (this.smartPickMovie &&
            this.smartPickMovie.id === movieId) {
            this.smartPickMovie = this.movies.find(
                movie => movie.id === movieId
            );
        }
    }

    handleViewDetails(event) {
        const movieId = Number(event.currentTarget.dataset.id);

        this.selectedMovie = this.movies.find(
            movie => movie.id === movieId
        );
    }

    handleCloseDetails() {
        this.selectedMovie = undefined;
    }

    // Choose a suitable movie using rating, popularity, and votes.
    handleSmartPick() {
        const candidates = this.recommendedMovies;

        if (!candidates.length) {
            this.smartPickMovie = undefined;
            this.smartPickMessage =
                'No matching movies found. Try changing your filters.';
            return;
        }

        const rankedMovies = [...candidates].sort((a, b) => {
            const scoreA =
                (a.rating * 10) +
                Math.log10(a.popularity + 1) +
                Math.log10(a.voteCount + 1);

            const scoreB =
                (b.rating * 10) +
                Math.log10(b.popularity + 1) +
                Math.log10(b.voteCount + 1);

            return scoreB - scoreA;
        });

        this.smartPickMovie = rankedMovies[0];
        this.smartPickMessage =
            'Your Smart Pick is based on the movies currently matching your filters.';
    }

    clearSmartPick() {
        this.smartPickMovie = undefined;
        this.smartPickMessage = '';
    }
}
