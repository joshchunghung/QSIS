import {
    createApp, provide, h
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { BootstrapVue } from 'bootstrap-vue'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// vue - apollo graphql
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    from,
    createHttpLink,
    HttpLink
} from '@apollo/client/core'
import {
    DefaultApolloClient
} from '@vue/apollo-composable'

// HTTP connection to the API
// const httpLink = createHttpLink({
//     // You should use an absolute URL here
//     uri: 'http://140.109.82.44:8000/graphql/'
// })

// // Cache implementation
// const cache = new InMemoryCache()

// // Create the apollo client
// const apolloClient = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache(),
//     headers: {
//         authorization: localStorage.getItem('token')
//     }
// })

// const app = createApp({
//     setup () {
//         provide(DefaultApolloClient, apolloClient)
//     },

//     render: () => h(App)
// })

// 參考https://www.newline.co/@kchan/building-a-graphql-application-with-vue-3-and-apollo--4679b402
const app = createApp({render: () => h(App)})
app.use(store).use(router).mount('#app')
