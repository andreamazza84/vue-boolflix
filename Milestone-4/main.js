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


let app = new Vue({
    el: '#root',
    data: {
        search: '',
        movies: [],
        moviesMap: [],
        flagCodeMap: {
            "aa": "dj",
            "af": "za",
            "ak": "gh",
            "sq": "al",
            "am": "et",
            "ar": {
                "proposed_iso_3166": "aa",
                "flag": "https:\/\/en.wikipedia.org\/wiki\/Flag_of_the_Arab_League",
                "name": "Arab League"
            },
            "hy": "am",
            "ay": {
                "proposed_iso_3166": "wh",
                "flag": "https:\/\/en.wikipedia.org\/wiki\/Wiphala",
                "name": "Wiphala"
            },
            "az": "az",
            "bm": "ml",
            "be": "by",
            "bn": "bd",
            "bi": "vu",
            "bs": "ba",
            "bg": "bg",
            "my": "mm",
            "ca": "ad",
            "zh": "cn",
            "hr": "hr",
            "cs": "cz",
            "da": "dk",
            "dv": "mv",
            "nl": "nl",
            "dz": "bt",
            "en": "gb",
            "et": "ee",
            "ee": {
                "proposed_iso_3166": "ew",
                "flag": "https:\/\/en.wikipedia.org\/wiki\/Ewe_people#\/media\/File:Flag_of_the_Ewe_people.svg",
                "name": "Ewe"
            },
            "fj": "fj",
            "fil": "ph",
            "fi": "fi",
            "fr": "fr",
            "ff": {
                "proposed_iso_3166": "ff",
                "flag": "https:\/\/www.nationstates.net\/images\/flags\/uploads\/fulah__403173.png",
                "name": "Fulah"
            },
            "gaa": "gh",
            "ka": "ge",
            "de": "de",
            "el": "gr",
            "gn": {
                "proposed_iso_3166": "gx",
                "flag": "https:\/\/www.crwflags.com\/fotw\/flags\/xg.html",
                "name": "Guarani"
            },
            "gu": "in",
            "ht": "ht",
            "ha": {
                "proposed_iso_3166": "ha",
                "flag": "https:\/\/www.crwflags.com\/fotw\/flags\/ng%7Dhausa.html",
                "name": "Hausa"
            },
            "he": "il",
            "hi": "in",
            "ho": "pg",
            "hu": "hu",
            "is": "is",
            "ig": "ng",
            "id": "id",
            "ga": "ie",
            "it": "it",
            "ja": "jp",
            "kr": "ne",
            "kk": "kz",
            "km": "kh",
            "kmb": "ao",
            "rw": "rw",
            "kg": "cg",
            "ko": "kr",
            "kj": "ao",
            "ku": "iq",
            "ky": "kg",
            "lo": "la",
            "la": "va",
            "lv": "lv",
            "ln": "cg",
            "lt": "lt",
            "lu": "cd",
            "lb": "lu",
            "mk": "mk",
            "mg": "mg",
            "ms": "my",
            "mt": "mt",
            "mi": "nz",
            "mh": "mh",
            "mn": "mn",
            "mos": "bf",
            "ne": "np",
            "nd": "zw",
            "nso": "za",
            "no": "no",
            "nb": "no",
            "nn": "no",
            "ny": "mw",
            "pap": "aw",
            "ps": "af",
            "fa": "ir",
            "pl": "pl",
            "pt": "pt",
            "pa": "in",
            "qu": "wh",
            "ro": "ro",
            "rm": "ch",
            "rn": "bi",
            "ru": "ru",
            "sg": "cf",
            "sr": "rs",
            "srr": "sn",
            "sn": "zw",
            "si": "lk",
            "sk": "sk",
            "sl": "si",
            "so": "so",
            "snk": "sn",
            "nr": "za",
            "st": "ls",
            "es": "es",
            "sw": {
                "proposed_iso_3166": "sw",
                "flag": "https:\/\/commons.wikimedia.org\/wiki\/File:Flag_of_Swahili.gif",
                "name": "Swahili"
            },
            "ss": "sz",
            "sv": "se",
            "tl": "ph",
            "tg": "tj",
            "ta": "lk",
            "te": "in",
            "tet": "tl",
            "th": "th",
            "ti": "er",
            "tpi": "pg",
            "ts": "za",
            "tn": "bw",
            "tr": "tr",
            "tk": "tm",
            "uk": "ua",
            "umb": "ao",
            "ur": "pk",
            "uz": "uz",
            "ve": "za",
            "vi": "vn",
            "cy": "gb",
            "wo": "sn",
            "xh": "za",
            "yo": {
                "proposed_iso_3166": "yo",
                "flag": "https:\/\/www.crwflags.com\/fotw\/flags\/ng%7Dyorub.html",
                "name": "Yoruba"
            },
            "zu": "za"
        },
        //flag
    },
    methods: {
        //Richiesta API per popolare la lista dei film che corrispondono alla ricerca
        get: function(){
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
                    language: 'it',
                    query: search,
                    page: 1,
                    include_adult: false,
                },
            };

            axios(config)
            .then(function (response) {
                const movies = response.data.results;
                //console.log(movies);
                self.movies = movies;
                //self.mapList(movies);
                //console.log(self.mapList(movies));

                //MS-2 - Conversione del voto  
                
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
                    language: 'it',
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
                //MS-2 - Conversione del voto  
                
            })//then
            .catch(function (error) {
                console.log(error);
            })//catch

            //Pulizia della barra di ricerca 
            this.search = '';
        },
        mapList: function(list){
            const mapList = list.map(element=>{
                let vote = element.vote_average;
                let lang = element.original_language;

                //conversione in array
                element.vote_average = [0, 0, 0, 0, 0];
                //Conversione ISO 639-1 > ISO 3166-1-alpha-2 code 
                element.original_language = this.flagCodeMap[lang];
                //Normalizzazione del voto
                vote = Math.ceil(vote/2);
                //popolamento array voto
                for (let index = 0; index < vote ; index++) {
                    element.vote_average[index] = 1;
                }
                return element;
            });//map
            
            console.log(mapList);
            return this.moviesMap = mapList;
        },
    },
    created(){
        // for (let index = 0; index < 5; index++) {
        //     this.vote[index] = 0;
        // }
    },
    mounted(){
        //console.log(this.flagCodeMap.en);
    },
    
});

// FLAGS: https://stefangabos.github.io/world_countries/
//Conversione ISO 639-1 > ISO 3166-1-alpha-2 code : https://github.com/lipis/flag-icon-css/issues/510