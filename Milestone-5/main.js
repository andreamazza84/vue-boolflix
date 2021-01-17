

let app = new Vue({
    el: '#root',
    data: {
        search: '',
        lastSearch: false,
        movies: [],
        moviesMap: [],
        fallbackPoster: '../img/fallbackimg/no-poster.png', 
        posterURI: 'http://image.tmdb.org/t/p/w342',
        cast: [],
        movieID: null,
        show: false,
        movieGenresMAP: [],
        TVgenresMAP: [],
        genres: [],
        flagCodeMap: flagCodeMap, //importata da '../flagmap.js'
        //configMovie: configMovie,
    },
    methods: {
        //Richiesta API per popolare la lista dei film che corrispondono alla ricerca
        getMovie: function(){
            const self = this;
            const search = this.search;
            if (search === '' || search === null || search === NaN) {
                return
            }
            //Else -> API request
            //Movies
            let config = {
                method: 'get',
                url: '/3/search/movie',
                baseURL: 'https://api.themoviedb.org',
                headers: {},
                params: {
                    api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
                    language: 'it_IT',
                    query: search,
                    page: [1],
                    include_adult: false,
                },
            };

            axios(config)
            .then(function (response) {
                const movies = response.data.results;
                self.movies = movies;
                
            })//then
            .catch(function (error) {
                console.log(error);
            })//catch

            //Series
            config = {
                method: 'get',
                url: '/3/search/tv',
                baseURL: 'https://api.themoviedb.org',
                headers: {},
                params: {
                    api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
                    language: 'it_IT',
                    query: search,
                    page: [1],
                    include_adult: false,
                },
            };

            axios(config)
            .then(function (response) {
                const series = response.data.results;
                self.movies = self.movies.concat(series);
                //console.log(self.movies);
                
                self.mapList(self.movies); 
                
            })//then
            .catch(function (error) {
                console.log(error);
            })//catch

            //Pulizia della barra di ricerca 
            this.search = '';
            this.lastSearch = search;
        },
        movieIDpass: function (movieID) {
            this.movieID = movieID;
            console.log(movieID);
        },
        mouseLeave: function () {
            this.show = false;
            this.cast = [];
        },
        getInfo: function(movieID, genreID){
            const self = this;
            this.genres = [];
            if (movieID === '' || movieID === null || movieID === NaN) {
                return
            }
            if (genreID === '' || movieID === null || movieID === NaN) {
                return
            }
            //Actors
            if(this.show === false){
                this.show = true;

                let config = {
                    method: 'get',
                    url: `/3/movie/${movieID}/credits?`,
                baseURL: 'https://api.themoviedb.org',
                headers: {},
                params: {
                    api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
                    language: 'it_IT',
                    },           
                };
            
            axios(config)
            .then(function (response) {
                let cast = response.data.cast;
                cast = cast.map(element =>{
                    return element = element.name;
                });
                self.cast = cast;
                })//then

            .catch(function (error) {
                console.log(error);
                })//catch            
            
            //Genres
            genreID.forEach(element => {
                element = this.movieGenresMAP.get(element);
                return this.genres.push(element);
            });
            console.log(this.genres);
            console.log(this.genres.slice(0,5));
            }
            else{
                this.show = false;
                self.cast = [];
            }
            
        },
        mapList: function(list){
            const mapList = list.map(element=>{
                let vote = element.vote_average;
                const lang = element.original_language;
                const imgURL =  this.posterURI + element.poster_path;
                //conversione in array
                element.vote_average = [0, 0, 0, 0, 0];
                //Conversione ISO 639-1 > ISO 3166-1-alpha-2 code
                element.original_language = this.flagCodeMap[lang];
                //Indirizzo URL copertina completo
                if (element.poster_path === null || element.poster_path === '' || element.poster_path === NaN) {
                    element.poster_path = this.fallbackPoster;
                }
                else{
                    element.poster_path = imgURL;
                }
                //Normalizzazione del voto
                vote = Math.ceil(vote/2);
                //popolamento array voto
                for (let index = 0; index < vote ; index++) {
                    element.vote_average[index] = 1;
                }
                return element;
            });//map
         
            //console.log(mapList);
            this.moviesMap = mapList;
        },
    },
    
    created(){
        self = this;
        //Generi disponibili per i film
        axios(configMovieGenres)
        .then(function (response) {
            const genres = response.data.genres;
            let map = new Map();
            genres.forEach(element => {
                map.set(element.id, element.name);
            });
            self.movieGenresMAP = map;
        })//then

        .catch(function (error) {
            console.log(error);
        })//catch 

        //Generi disponibili per le serieTV
        axios(configSeriesGenres)
        .then(function (response) {
            const TVgenres = response.data;
            self.TVgenresMAP = TVgenres;
        })//then

        .catch(function (error) {
            console.log(error);
        })//catch          
    },
    
}); 