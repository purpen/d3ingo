let state = {
  displayObj: {
    itemList: [],
    outsideStageList: []
  },
  taskState: {
    id: 0,
    power: 0,
    event: '' // create | update | delete | complete
  },
  currentForm: {
  },
  taskList: [],
  storeCurrentForm: {}
}
let mutations = {
  setDisplayObj(state, array) {
    array.forEach((item) => {
      if (item['use'] === true) {
        item['use'] = false
      }
      if (item['created_at']) {
        item['created_at_format'] = item['created_at'].date_format().format('yyyy年MM月dd日')
      }
    })
    let outsideStageList = []
    let itemList = []
    array.forEach((item) => {
      if (itemList.length) {
        itemList.forEach(ele => {
          ele.showItem = false
          if (item.stage_id === ele.id) {
            ele['itemList'].push(item)
          } else {
            if (!item['use']) {
              outsideStageList.push(item)
              item['use'] = true
            }
          }
        })
      } else {
        outsideStageList = array
      }
    })
    Object.assign(state.displayObj, {
      itemList: itemList,
      outsideStageList: outsideStageList
    })
  },
  changeTaskStatePower(state, val) {
    this._vm.$set(state.taskState, 'power', val)
  },
  changeTaskStateEvent(state, val) {
    this._vm.$set(state.taskState, 'event', val)
  },
  changeTaskStateId(state, val) {
    this._vm.$set(state.taskState, 'id', val)
  },
  setTaskList(state, arr) {
    state.stakList = arr
    this.commit('setDisplayObj', state.stakList)
  },
  createTaskListItem(state, obj) {
    state.stakList.unshift(obj)
    this.commit('setDisplayObj', state.stakList)
  },
  updateTaskListItem(state, obj) {
    state.stakList.forEach(item => {
      if (item.id === obj.id) {
        Object.assign(item, obj)
      }
    })
    this.commit('setDisplayObj', state.stakList)
  },
  deleteTaskListItem(state, obj) {
    state.stakList.forEach((item, index, array) => {
      if (item.id === obj.id) {
        array.splice(index, 1)
      }
    })
    this.commit('setDisplayObj', state.stakList)
  },
  setStoreCurrentForm(state, obj) {
    Object.assign(state.storeCurrentForm, obj)
  }
}
export default {
  state,
  mutations
}
