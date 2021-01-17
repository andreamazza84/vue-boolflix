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