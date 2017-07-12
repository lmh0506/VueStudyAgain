import Vue from 'vue'
import Vuex from 'vuex'
import analysis from './modules/analysis'
import bankChooser from './modules/bankChooser'
import orderList from './modules/orderList'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: '',
        isShowAboutDialog: false,
        isShowLogDialog: false,
        isShowRegDialog: false,
        isShowBuy: false,
        isShowFailDialog: false,
        isShowSuccessDialog: false,
        isShowCheckDialog: false,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setDialogTrue(state, dialog) {
            state[dialog] = true;
        },
        setDialogFalse(state) {
            state.isShowAboutDialog = false;
            state.isShowLogDialog = false;
            state.isShowRegDialog = false;
            state.isShowBuy = false;
            state.isShowFailDialog = false;
            state.isShowSuccessDialog = false;
            state.isShowCheckDialog = false;
        }
    },
    modules: {
        analysis,
        bankChooser,
        orderList
    }
})