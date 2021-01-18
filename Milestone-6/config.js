//Richiesta lista di tutti i generi movies
const configMovieGenres = {
    method: 'get',
    url: `/3/genre/movie/list?`,
    baseURL: 'https://api.themoviedb.org',
    headers: {},
    params: {
    api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
    language: 'it_IT',
    },           
};

//Richiesta lista di tutti i generi series
const configSeriesGenres = {
    method: 'get',
    url: `/3/genre/tv/list?`,
    baseURL: 'https://api.themoviedb.org',
    headers: {},
    params: {
        api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
        language: 'it_IT',
        },           
    };

//Richiesta lista di tutti gli attori per movies
const configMoviesInfo = {
    method: 'get',
    url: '',
    baseURL: 'https://api.themoviedb.org',
    headers: {},
    params: {
        api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
        language: 'it_IT',
        },           
};

//Richiesta lista di tutti gli attori per movies
const configSeriesInfo = {
    method: 'get',
    url: '',
    baseURL: 'https://api.themoviedb.org',
    headers: {},
    params: {
        api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
        language: 'it_IT',
        },           
};

//Richiesta elemenco movies
const configMovies = {
    method: 'get',
    url: '/3/search/movie',
    baseURL: 'https://api.themoviedb.org',
    headers: {},
    params: {
        api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
        language: 'it_IT',
        query: '',
        page: 1,
        include_adult: false,
    },
};

//Richiesta elemenco series
const configSeries = {
    method: 'get',
    url: '/3/search/tv',
    baseURL: 'https://api.themoviedb.org',
    headers: {},
    params: {
        api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
        language: 'it_IT',
        query: '',
        page: 1,
        include_adult: false,
    },
};