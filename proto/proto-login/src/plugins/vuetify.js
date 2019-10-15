/** 
  * Sets up Vuetify library plugin, sets Vue to use Vuetify,
  * and then exports a new Vuetifyinstance with the empty
  * constant 'opts' json array.
  */
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
