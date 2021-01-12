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
//(troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, 
//non gestiamo icone mezzepiene (o mezze vuote :P)Trasformiamo poi la stringa statica della
// lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in 
//cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in
// FontAwesome).Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di
// ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, 
//stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel
// JSON di risposta diversi, simili ma non sempre identici). 
// Qui un esempio di chiamata per le serie tv:
//https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
let app = new Vue({
    el: '#root',
    data: {
        search: '',
        movies: [],
        moviesMap: [],
    },
    methods: {
        //Richiesta API per popolare la lista dei film che corrispondono alla ricerca
        send: function(){
            const self = this;
            const search = this.search;
            if (search === '' || search === null || search === NaN) {
                return
            }
            //Else -> API request
            var config = {
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
                const moviesMap = movies.map(element=>{
                    const vote = element.vote_average;
                    element.vote_average = Math.ceil(vote/2);
                    return element;
                }); 
                self.moviesMap = moviesMap;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    },
    created(){},
    mounted(){},
});

