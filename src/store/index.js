import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import user from './user/moduleUser'
import resumeParser from "./resume-parser/moduleResumeParser";
import moduleFeed from "./feed/moduleFeed.js";
import modals from './modals/moduleModals';
import library from './library/moduleLibrary';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    user,
    modals,
    resumeParser,
    feed: moduleFeed,
    library
  },
  strict: process.env.DEV,
})
