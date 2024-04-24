import CommonAPI from "../apis/CommonAPI";

export const GET_MACHINES = "getMachines";
export const POST_MACHINE = "postMachines";
export const PUT_MACHINE = "putMachines";
export const DELETE_MACHINE = "deleteMachines";

// mutation types
export const SET_MACHINES = "setMachines";

const state = {
    machines: []
};

const getters = {
    getMachines(state) {
        return state.machines
    },
    getMachinesOpts(state) {
        if (state.machines) {
            const mapMachines = state.machines.map(machine => {
                return {
                    id: machine.uuid,
                    text: machine.machine_nm
                }
            })
            mapMachines.push({
                id: "-1",
                text: 'All'
            })
            return mapMachines
        }
    },
    getMachinesOptsWithoutAll(state) {
        if (state.machines) {
            const mapMachines = state.machines.map(machine => {
                return {
                    id: machine.machine_id,
                    text: machine.machine_nm
                }
            })
            return mapMachines
        }
    }
};

const actions = {
    [GET_MACHINES]({ commit }, query) {
        return new Promise(async(resolve, reject) => {
            await CommonAPI.post('/tpm/machines/search', query)
                .then((result) => {
                    if (result.data) {
                        console.log(result.data);
                        commit(SET_MACHINES, result.data.data)
                        resolve(result.data.data)
                    }
                    reject('Data tidak ada')
                })
                .catch((err) => {
                    reject(err)
                })

        });
    },
    [POST_MACHINE]({ commit }, data = null) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post('master/machines', data)
                .then((result) => {
                    const machinesData = result.data
                    resolve(machinesData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });
        });
    },
    [PUT_MACHINE]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            console.log(data);
            ApiService.put(`master/machines/edit/${ID}`, data)
                .then((result) => {
                    const jobData = result.data
                    resolve(jobData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_MACHINE]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`master/machines/delete/${id}`)
                .then((result) => {
                    const jobData = result.data
                    resolve(jobData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    }
};

const mutations = {
    [SET_MACHINES](state, machines) {
        state.machines = machines;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};