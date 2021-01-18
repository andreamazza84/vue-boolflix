let app = new Vue({
    el: '#root',
    data: {
        search: '',
        lastSearch: false,
        items: {},
        mapMovies: [],
        mapSeries: [],
        fallbackPoster: '../img/fallbackimg/no-poster.png', 
        posterURI: 'http://image.tmdb.org/t/p/w342',
        show: false,
        movieID: null,
        cast: [],
        moviesGenresMAP: [],
        seriesGenresMAP: [],
        genres: [],
        flagCodeMap: flagCodeMap, //importata da '../flagmap.js'
        genresMAP: {
            "action" : 28,
            "commedy": [4,5],
            "adventure" : [23],
            "drama": [12],
            "thiller": [11]
        },
        moviesGenresRevMap: {},
        seriesGenresRevMap: {},
        moviesGenres: [],
        seriesGenres: [],
        allGenres: {},
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
            // *** Movies ***
            let config = configMovies;
            config.params.query = search;
            config.params.page = 1;

            axios(config)
            .then(function (response) {
                const movies = response.data.results;
                self.mapList(movies);
                Vue.set(self.items, 'movies', movies);
                
            })//then
            .catch(function (error) {
                console.log(error);
            })//catch

            // *** Series ***
            config = configSeries;
            config.params.query = search;
            config.params.page = 1;
            
            axios(config)
            .then(function (response) {
                const series = response.data.results;
                self.mapList(series);
                Vue.set(self.items, 'series', series);

            })//then
            .catch(function (error) {
                console.log(error);
            })//catch

            //Pulizia della barra di ricerca 
            this.search = '';
            this.lastSearch = search;
            console.log(self.items);

        },
        movieIDpass: function (movieID) {
            this.movieID = movieID;
        },
        mouseLeave: function () {
            this.show = false;
            this.cast = [];
            this.genres = [];
        },
        getInfo: function(movieID, genreID, type){
            if (movieID === '' || movieID === null || movieID === NaN) {
                return
            }
            if (genreID === '' || genreID === null || genreID === NaN) {
                return
            }
            const self = this;
            this.genres = [];
            this.cast = [];

            //Actors
            if(this.show === false){
                this.show = true;
                //*** Movies ***
                let config;
                if (type === "movies") {
                    config =  configMoviesInfo;
                    config.url = `/3/movie/${movieID}/credits?`;
                    
                    //Genres
                    genreID.forEach(element => {
                        element = this.moviesGenresMAP.get(element);
                        return this.genres.push(element);
                        });
                }            
                // *** Series ***
                else if (type === "series") {
                    config = configSeriesInfo
                    config.url = `/3/tv/${movieID}/credits?`;
                    
                    //Genres
                    genreID.forEach(element => {
                        element = this.seriesGenresMAP.get(element);
                        return this.genres.push(element);
                        });
                }
                else{
                    return console.log('wrong type');
                }
                //cast
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
            }
            else{
                this.show = false;
                self.cast = [];
            }
            
        },
        mapList: function(list){
            const map = list.map(element => {
                let vote = element.vote_average;
                const lang = element.original_language;
                const imgURL =  this.posterURI + element.poster_path;
                //conversione voto in array
                element.vote_average = [0, 0, 0, 0, 0];
                //Conversione ISO 639-1 > ISO 3166-1-alpha-2 code
                element.original_language = this.flagCodeMap[lang];
                //Indirizzo URL copertina completo
                if (element.poster_path === null || element.poster_path === '' || element.poster_path === NaN || element.poster_path === false) {
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
        },
        genreFilter: function (genre) {
            let id = this.moviesGenresRevMap.get(genre)
            let filter = this.items.movies.filter(element => {
                // genre.forEach(id => {
                    
                    console.log(id);
                    return element.genre_ids.includes(id); 
                //});
             });
            //this.filterItems = filter;
            console.log(filter); 
        }
    
    },
    
    created(){
        self = this;
        let allGenres = {movies:[], series:[]};
        //Generi disponibili per i film
        axios(configMovieGenres)
        .then(function (response) {
            const genres = response.data.genres;
            let map = new Map();
            let revmap = new Map();
            //let moviesGenres;
            genres.forEach(element => {
                map.set(element.id, element.name);
                revmap.set(element.name, element.id);
                allGenres.movies.push(element.name);
            });
            self.moviesGenresMAP = map;
            self.moviesGenresRevMap = revmap;
            //self.moviesGenres = moviesGenres;
            //console.log(map.get("Action"));
        })//then

        .catch(function (error) {
            console.log(error);
        })//catch 

        //Generi disponibili per le serieTV
        axios(configSeriesGenres)
        .then(function (response) {
            const genres = response.data.genres;
            let map = new Map();
            let revmap = new Map();
            //let seriesGenres;
            genres.forEach(element => {
                map.set(element.id, element.name);
                revmap.set(element.name, element.id);
                //seriesGenres.push(element.name);
                allGenres.series.push(element.name);
            });
            self.seriesGenresMAP = map;
            self.seriesGenresRevMap = revmap;
            //self.seriesGenres = seriesGenres;

            //console.log(revmap.get("Animation"));

        })//then

        .catch(function (error) {
            console.log(error);
        })//catch    
        console.log(allGenres);
        self.allGenres = allGenres;
    },
    
}); 