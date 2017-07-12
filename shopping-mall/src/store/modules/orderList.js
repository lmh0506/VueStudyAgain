import Vue from 'vue'
const state = {
    tableData: [],
    params: {}
}

const actions = {
    fetchTableData({ commit, state }) {
        Vue.http.post('/api/getOrderList', state.params)
            .then(res => {
                commit('updateTableData', res.data.list)
            })
    }
}

const mutations = {
    updateTableData(state, data) {
        state.tableData = data;

    },
    updateParams(state, { key, val }) {
        state.params[key] = val;
    }
}

export default {
    state,
    actions,
    mutations
}