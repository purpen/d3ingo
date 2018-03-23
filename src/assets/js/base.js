/* eslint-disable */
/*
 * phenix base js
 */
var phenix = {}

/**
 * 允许多附件上传
 */
phenix.record_asset_id = function (class_id, id) {
  var ids = $('#' + class_id).val();
  if (ids.length == 0) {
    ids = id;
  } else {
    if (ids.indexOf(id) == -1) {
      ids += ',' + id;
    }
  }
  $('#' + class_id).val(ids);
};

//移除附件id
phenix.remove_asset_id = function (class_id, id) {
  var ids = $('#' + class_id).val();
  var ids_arr = ids.split(',');
  var is_index_key = phenix.in_array(ids_arr, id);
  ids_arr.splice(is_index_key, 1);
  ids = ids_arr.join(',');
  $('#' + class_id).val(ids);
};

//查看字符串是否在数组中存在
phenix.in_array = function (arr, val) {
  var i;
  for (i = 0; i < arr.length; i++) {
    if (val === arr[i]) {
      return i;
    }
  }
  return -1;
}; // 返回-1表示没找到，返回其他值表示找到的索引

// 数组排序
// eg arr.sort(arr_sort('id', arr_sort('name')))
phenix.arr_sort = function (name, minor) {
  return function (o, p) {
    var a, b;
    if (o && p && typeof o === 'object' && typeof p === 'object') {
      a = o[name];
      b = p[name];
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      thro("error");
    }
  }
}

export default phenix;