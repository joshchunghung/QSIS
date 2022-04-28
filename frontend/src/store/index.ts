import {
    createStore
} from 'vuex'
import axios from '../../node_modules/axios'

export default createStore({
    strict: true,
    state: {
        event: null,
        site: null,
        buildingState: null,
        singleSite: null,
        floorMapViewState: null,
        floor: null
    },
    getters: {
        event: (state) => state.event,
        site: (state) => state.site,
        buildingState: (state) => state.buildingState,
        singleSiteName: (state) => state.singleSite,
        singleSite: (state) => state.site[state.singleSite],
        floorMapViewState: (state) => state.floorMapViewState,
        floor: (state) => state.floor
    },
    mutations: {
        getEvent (state, event) {
            state.event = event
        },
        getSite (state, site) {
            state.site = site
        },
        getSingleSite (state, name) {
            // state.singleSite = state.site[name]
            state.singleSite = name
        },
        changeBuildingState (state, isOpen) {
            state.buildingState = isOpen
        },
        changeFloorMapViewState (state, isOpen) {
            state.floorMapViewState = isOpen
        },
        getFloor (state, floor) {
            state.floor = floor
        }

    },
    actions: {
        getDBEvent ({ commit }) {
            axios.post('http://140.109.82.44:8012/graphql/', {
                query: `query {
                    event (isOpen : true){
                        id
                        latitude
                        longitude
                        date
                        time
                        depth
                        ML
                    }
                }`
            }).then((response) => {
                commit('getEvent', response.data.data.event)
            }).catch((err) => { console.log(err) })
        },
        getDBStation ({ dispatch }, eventid) {
            axios.post('http://140.109.82.44:8012/graphql/', {
                query: `query {
                    pga(event:${eventid}){
                        station{
                            code
                            floor
                            rx
                            ry
                            building{
                            abbreviation
                            latitude
                            longitude
                            basement
                            floor
                            }
                        }
                        pga3comp
                        }
                    }
                    `
            }).then((response) => {
                dispatch('filterPGA', response.data.data.pga)
            }).catch((err) => { console.log(err) })
        },
        filterPGA ({ commit }, pga) {
            const buidings = {
            }
            pga.forEach(({ station, pga3comp }) => {
                const MAXpga = -1
                const { code, floor, rx, ry, building } = station
                const { abbreviation, latitude, longitude, basement, floor: height } = building
                if (!buidings[abbreviation]) {
                    buidings[abbreviation] = {
                        latitude,
                        longitude,
                        MAXpga,
                        height,
                        basement,
                        stations: []
                    }
                }
                buidings[abbreviation].stations.push({
                    code,
                    floor,
                    rx,
                    ry,
                    pga3comp
                })
                if (pga3comp > buidings[abbreviation].MAXpga) { buidings[abbreviation].MAXpga = pga3comp }
            })
            commit('getSite', buidings)
        }

    },

    modules: {
    }
})
