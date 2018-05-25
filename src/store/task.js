let state = {
  displayObj: {
    itemList: [],
    outsideStageList: []
  },
  taskState: {
    id: 0,
    power: 0,
    event: '', // create | update | delete | complete
    str: '' // 随机数
  },
  currentForm: {
  },
  taskList: [],
  stageList: [],
  projectObject: {},
  taskMemberList: [],
  projectMemberList: [],
  executeUser: {},
  parentTask: {},
  showMessage: false,
  myView: ''
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
      console.log(item)
      if (item['created_at']) {
        item['created_at_format'] = item['created_at'].date_format().format('yyyy年MM月dd日')
        console.log(item['created_at_format'])
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
        outsideStageList = array
      }
    })
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
          if (e['created_at']) {
            e['created_at_format'] = e['created_at'].date_format().format('MM月dd日')
          }
          outsideStageList.forEach(item => {
            if (item.id === e.id) {
              list.push(e.id)
            }
            if (item['created_at']) {
              item['created_at_format'] = item['created_at'].date_format().format('MM月dd日')
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
    state.taskList = arr.filter(item => {
      return item.tier === 0
    })
    // state.taskList = arr
    this.commit('setDisplayObj', state.taskList)
  },
  setStageList(state, arr) {
    state.stageList = arr
    this.commit('setDisplayObj', state.taskList)
  },
  createTaskListItem(state, obj) {
    state.taskList.unshift(obj)
    this.commit('setDisplayObj', state.taskList)
  },
  createStageListItem(state, obj) {
    state.stageList.unshift(obj)
    this.commit('setDisplayObj', state.taskList)
  },
  updateTaskListItem(state, obj) {
    state.taskList.forEach(item => {
      if (item.id === obj.id) {
        Object.assign(item, obj)
      }
    })
    this.commit('setDisplayObj', state.taskList)
  },
  updateStageListItem(state, obj) {
    state.stageList.forEach(item => {
      if (item.id === obj.id) {
        Object.assign(item, obj)
      }
    })
    this.commit('setDisplayObj', state.taskList)
  },
  deleteTaskListItem(state, obj) {
    state.taskList.forEach((item, index, array) => {
      if (item.id === obj.id) {
        array.splice(index, 1)
      }
    })
    state.stageList.forEach(ele => {
      if (ele.task) {
        ele.task.forEach((e, i, arr) => {
          if (e.id === obj.id) {
            arr.splice(i, 1)
          }
        })
      }
    })
    this.commit('setDisplayObj', state.taskList)
  },
  deleteStageListItem(state, id) {
    state.stageList.forEach((item, index, array) => {
      if (item.id === id) {
        array.splice(index, 1)
      }
    })
    this.commit('setDisplayObj', state.taskList)
  },
  setProjectObject(state, obj) {
    Object.assign(state.projectObject, obj)
  },
  setProjectMemberList(state, obj) {
    state.projectMemberList = obj
  },
  addProjectMemberList(state, obj) {
    state.projectMemberList.unshift(obj)
  },
  deleteProjectMemberList(state, id) {
    state.projectMemberList.forEach((item, index, array) => {
      if (item.id === id) {
        array.splice(index, 1)
      }
    })
    this.commit('deleteTaskMemberList', id)
  },
  setTaskMemberList(state, obj) {
    state.taskMemberList = obj
  },
  addTaskMemberList(state, obj) {
    state.taskMemberList.unshift(obj)
  },
  deleteTaskMemberList(state, id) {
    state.taskMemberList.forEach((item, index, array) => {
      if (item.user.id === id) {
        array.splice(index, 1)
      }
    })
  },
  setExecuteUser(state, userId) {
    state.projectMemberList.forEach((item) => {
      if (item.id === userId) {
        state.executeUser = item
      }
    })
  },
  removeExcuteUser(state) {
    state.executeUser = null
  },
  setParentTask(state, obj) {
    state.parentTask = obj
  },
  removeParentTask(state) {
    state.parentTask = {id: -1}
  },
  changeShowMsg(state, bool) {
    state.showMessage = bool
  },
  changeMyView(state, str) {
    state.myView = str
  }
}
export default {
  state,
  mutations
}
