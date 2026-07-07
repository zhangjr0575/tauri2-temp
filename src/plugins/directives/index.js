import clickOutside from "./clickOutside";

export default {
    install(app) {
        app.directive(clickOutside.name, clickOutside)
    }
}