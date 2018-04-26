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
  stageList: [],
  storeCurrentForm: {},
  projectObject: {},
  projectMemberList: []
}
let mutations = {
  setDisplayObj2(state, array) { // 容易出异步问题
    let outsideStageList = []
    let itemList = state.stageList
    if (!array) {
      return
    }
    array.forEach((item) => {
      if (item['use'] === true) {
        item['use'] = false
      }
      if (item['created_at']) {
        item['created_at_format'] = item['created_at'].date_format().format('yyyy年MM月dd日')
      }
    })
    state.stageList.forEach(ele => {
      ele['itemList'] = []
    })
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
        console.log('else')
        outsideStageList = array
      }
    })
    console.log(outsideStageList)
    Object.assign(state.displayObj, {
      itemList: itemList,
      outsideStageList: outsideStageList
    })
  },
  setDisplayObj(state, array) {
    if (!array) {
      return
    }
    let outsideStageList = array
    let list = []
    state.stageList.forEach(ele => {
      if (ele.task) {
        ele.task.forEach(e => {
          outsideStageList.forEach(item => {
            if (item.id === e.id) {
              list.push(e.id)
            }
          })
        })
      }
    })
    outsideStageList = outsideStageList.filter(item => {
      return list.indexOf(item.id) === -1
    })
    Object.assign(state.displayObj, {
      itemList: state.stageList,
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
  setStageList(state, arr) {
    state.stageList = arr
    this.commit('setDisplayObj', state.stakList)
  },
  createTaskListItem(state, obj) {
    state.stakList.unshift(obj)
    this.commit('setDisplayObj', state.stakList)
  },
  createStageListItem(state, obj) {
    state.stageList.unshift(obj)
    console.log(JSON.stringify(obj))
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
  updateStageListItem(state, obj) {
    state.stageList.forEach(item => {
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
  deleteStageListItem(state, id) {
    state.stageList.forEach((item, index, array) => {
      if (item.id === id) {
        array.splice(index, 1)
      }
    })
    this.commit('setDisplayObj', state.stakList)
  },
  setStoreCurrentForm(state, obj) {
    Object.assign(state.storeCurrentForm, obj)
  },
  setProjectObject(state, obj) {
    Object.assign(state.projectObject, obj)
  },
  setProjectMemberList(state, obj) {
    state.projectMemberList = obj
  }
}
export default {
  state,
  mutations
}
