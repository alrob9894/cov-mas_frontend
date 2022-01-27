import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        agents_susceptible: [],
        agents_infected: [],
        agents_removed: [],
        last_pop_size: 0,
    },
    getters: {
        get_agents_susceptible: state => {
            return state.agents_susceptible
        },
        get_agents_infected: state => {
            return state.agents_infected
        },
        get_agents_removed: state => {
            return state.agents_removed
        },
        get_last_pop_size: state => {
            return state.last_pop_size
        }

    },
    mutations: {
        set_agents_susceptible (state, susceptible) {
            // console.log(state.agents_susceptible)
            state.agents_susceptible.push(susceptible);
        },
        set_agents_infected (state, infected) {
            state.agents_infected.push(infected);
        },
        set_agents_removed (state, removed) {
            state.agents_removed.push(removed);
        },
        reset_stats (state) {
            state.agents_susceptible = [];
            state.agents_infected = [];
            state.agents_removed = [];
        },
        push_round_result(state, round_result) {
            state.agents_susceptible.push(round_result['round_stats']['agents_susceptible']);
            state.agents_infected.push(round_result['round_stats']['agents_infected']);
            state.agents_removed.push(round_result['round_stats']['agents_removed']);
        }
    },
    actions: {}
})
