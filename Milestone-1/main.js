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

let app = new Vue({
    el: '#root',
    data: {
        search: '',
        movies: [],
    },
    methods: {
        send: function(){
            const self = this;
            const search = this.search;
            if (search === '' || search === null || search === NaN) {
                return
            }
            //Else           
            //API request
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
                //console.log(response.data.results);
                self.movies = response.data.results;
            })
            .catch(function (error) {
                console.log(error);
            })
            console.log(self.movies);
        }
    },
    created(){},
    mounted(){},
});

