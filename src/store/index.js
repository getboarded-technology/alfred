import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import user from './user/moduleUser'
import resumeParser from "./resume-parser/moduleResumeParser";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    user,
    resumeParser
  },
  strict: process.env.DEV,
})
