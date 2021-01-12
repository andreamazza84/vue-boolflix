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
    },
    methods: {},
    created(){},
    mounted(){
        axios
        .get('https://api.themoviedb.org/3/search/movie?api_key=63706bbf890cd5e59eddbb3a5912ff6b&language=it&query=star&page=1&include_adult=false')
        .then(response => {
            console.log(response);
            console.log(response.data.results);

        })
    },
});