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
  showMessage: '',
  myView: '',
  showMine: '',
  mineView: ''
}
let mutations = {
  setDisplayObj(state, array) {
    if (!array) {
      return
    }
    // let list = []
    state.stageList.forEach(ele => {
      if (ele.task) {
        ele.task.forEach(e => {
          if (e.over_time) {
            if (typeof (e.over_time) === 'string') {
              let time = e.over_time.replace(/-/g, '/')
              e.over_time_stamp = new Date(time).getTime()
            } else {
              e.over_time_stamp = e.over_time.getTime()
            }
            if (e.over_time_stamp < new Date().getTime()) {
              e.time_detail = (e.over_time_stamp / 1000).date_format().format('yyyy年MM月dd日 hh:mm') + ' 已逾期'
            } else {
              e.time_detail = (e.over_time_stamp / 1000).date_format().format('yyyy年MM月dd日 hh:mm')
            }
          }
          if (e['created_at']) {
            e['created_at_format'] = e['created_at'].date_format().format('MM月dd日')
          }
          // outsideStageList.forEach(item => {
          //   if (item.over_time) {
          //     if (typeof (item.over_time) === 'string') {
          //       let time = item.over_time.replace(/-/g, '/')
          //       item.over_time_stamp = new Date(time).getTime()
          //     } else {
          //       item.over_time_stamp = item.over_time.getTime()
          //     }
          //     if (item.over_time_stamp < new Date().getTime()) {
          //       item.time_detail = (item.over_time_stamp / 1000).date_format().format('yyyy年MM月dd日 hh:mm') + ' 已逾期'
          //     } else {
          //       item.time_detail = (item.over_time_stamp / 1000).date_format().format('yyyy年MM月dd日 hh:mm')
          //     }
          //   }
          //   if (item.id === e.id) {
          //     list.push(e.id)
          //   }
          //   if (item['created_at']) {
          //     item['created_at_format'] = item['created_at'].date_format().format('MM月dd日')
          //   }
          // })
        })
      }
    })
    let outsideStageList = array.filter(item => {
      if (item.over_time) {
        if (typeof (item.over_time) === 'string') {
          let time = item.over_time.replace(/-/g, '/')
          item.over_time_stamp = new Date(time).getTime()
        } else {
          item.over_time_stamp = item.over_time.getTime()
        }
        if (item.over_time_stamp < new Date().getTime()) {
          item.time_detail = (item.over_time_stamp / 1000).date_format().format('yyyy年MM月dd日 hh:mm') + ' 已逾期'
        } else {
          item.time_detail = (item.over_time_stamp / 1000).date_format().format('yyyy年MM月dd日 hh:mm')
        }
        if (item['created_at']) {
          item['created_at_format'] = item['created_at'].date_format().format('MM月dd日')
        }
        // return list.indexOf(item.id) === -1
      }
      return item.stage_id === 0
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
    let child = arr.showChild
    state.taskList = arr['data'].filter(item => {
      if (item['created_at']) {
        item['created_at_format'] = item['created_at'].date_format().format('yyyy年MM月dd日')
      }
      if (child) {
        return true
      } else {
        return item.tier === 0
      }
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
        // Object.assign(item, obj)
        item = obj
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
    if (state.taskMemberList) {
      state.taskMemberList.forEach((item, index, array) => {
        if (item.user) {
          if (item.user.id === id) {
            array.splice(index, 1)
          }
        }
      })
    }
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
  changeShowMsg(state, str) {
    state.showMessage = str
  },
  changeMyView(state, str) {
    state.myView = str
  },
  changeShowMine(state, str) {
    state.showMine = str
  },
  changeMineView(state, str) {
    state.mineView = str
  }
}
export default {
  state,
  mutations
}
