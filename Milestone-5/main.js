//La grafica 
//boolfix.text
//passiamo una quesry string all'endpoint per ricercare il film. Da qui si ottiene il risultato da analizzare con postman.
//E' importante focalizzarsi sulla prima milestone.
//stelle con v-if v-else e v-for :hint:
//non pensare all'interfaccia grafica fino alla 4^a milestone.

// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

//Milestone 2:
// Trasformiamo
// il voto da 1 a 10 decimale in un numero intero da 1 a 5, così dapermetterci di stampare
// a schermo un numero di stelle piene che vanno da 1 a 5,lasciando le restanti vuote 
// (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezzepiene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera 
// della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
// nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di
// ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, 
// stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel
// JSON di risposta diversi, simili ma non sempre identici). 
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

//Milestone 3:
// Milestone 3:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
// al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
// perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
// Dovremo prendere quindi l’URL base delle immagini di TMDB:
// https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
// (troviamo tutte le dimensioni possibili a questo link:
// https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la
// parte finale dell’URL passata dall’API.
// Esempio di URL:
// https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

// Milestone 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
// creando un layout completo simil-Netflix:
// ● Un header che contiene logo e search bar
// ● Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
// di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio
// la poster_path con w342)
// ● Andando con il mouse sopra una card (on hover), appaiono le informazioni
// aggiuntive già prese nei punti precedenti più la overview

// Milestone 5:
// Partendo da un film o da una serie, richiedere all'API quali sono gli attori
// che fanno parte del cast aggiungendo alla nostra scheda Film / Serie 
// SOLO i primi 5 restituiti dall’API con Nome e Cognome, e i generi associati 
// al film con questo schema: “Genere 1, Genere 2, …”.


let app = new Vue({
    el: '#root',
    data: {
        search: '',
        lastSearch: false,
        movies: [],
        moviesMap: [],
        flagCodeMap: flagCodeMap, //importata da '../flagmap.js' 
        fallbackPoster: '../img/fallbackimg/no-poster.png', 
        posterURI: 'http://image.tmdb.org/t/p/w342',
        cast: [],
        movieID: null,
        show: false,
        movieGenresMAP: null,
        TVgenresMAP: null,
        //flag
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
                    page: 1,
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
                    page: 1,
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
        },
        mouseLeave: function () {
            this.show = false;
            this.cast = null;
        },
        getCast: function(movieID){
            const self = this;
            if (movieID === '' || movieID === null || movieID === NaN) {
                return
            }
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
                //I primi 5 attori
                cast = [cast[0].name, cast[1].name, cast[2].name, cast[3].name, cast[4].name]; 
                self.cast = cast;
                })//then

            .catch(function (error) {
                console.log(error);
                })//catch            
            
            }
            else{
                this.show = false;
                self.cast = null;
            }
            
        },
        mapList: function(list){
            const mapList = list.map(element=>{
                let vote = element.vote_average;
                const lang = element.original_language;
                const imgURL =  this.posterURI + element.poster_path; 
                const genre = element.genre_ids;
                //conversione in array
                element.vote_average = [0, 0, 0, 0, 0];
                //Conversione ISO 639-1 > ISO 3166-1-alpha-2 code
                element.original_language = this.flagCodeMap[lang];
                //Conversione generi
                console.log(genre);
                element.genre_ids = this.movieGenresMAP.genre[genre[0]];
                console.log(this.movieGenresMAP.genres); 
                console.log(element.genre_ids);
                //Indirizzo URL copertina completo
                if (element.poster_path === null) {
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
                //console.log(img);
                return element;
            });//map
            
            console.log(mapList);
            this.moviesMap = mapList;
        },
        getGenre: function (genreID) {
            console.log(genreID);

            
        },
    },
    
    created(){
        self = this;
        let config = {
            method: 'get',
            url: `/3/genre/movie/list?`,
            baseURL: 'https://api.themoviedb.org',
            headers: {},
            params: {
                api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
                language: 'it_IT',
                },           
            };
    
        axios(config)
        .then(function (response) {
            const movieGenres = response.data;
            self.movieGenresMAP = movieGenres;
            console.log(self.movieGenresMAP);
        })//then

        .catch(function (error) {
            console.log(error);
        })//catch 
        
        config = {
            method: 'get',
            url: `/3/genre/tv/list?`,
            baseURL: 'https://api.themoviedb.org',
            headers: {},
            params: {
                api_key: '63706bbf890cd5e59eddbb3a5912ff6b',
                language: 'it_IT',
                },           
            };
    
        axios(config)
        .then(function (response) {
            const TVgenres = response.data;
            //console.log(TVgenres);
            self.TVgenresMAP = TVgenres;
        })//then

        .catch(function (error) {
            console.log(error);
        })//catch          
    },
    
}); 

// FLAGS: https://stefangabos.github.io/world_countries/
//Conversione ISO 639-1 > ISO 3166-1-alpha-2 code : https://github.com/lipis/flag-icon-css/issues/510