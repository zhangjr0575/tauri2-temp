import Dialog from './dialog/index.vue'
import Select from './select/index.vue'

export default {
    install(app) {
        app.component(Dialog.name, Dialog)
        app.component(Select.name, Select)
    }
}