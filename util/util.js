const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function getDateStr(today, addDayCount) {
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) {
    m = '0' + m;
  };
  if (d < 10) {
    d = '0' + d;
  };
  return y + "-" + m + "-" + d;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function TimeStampConvertTime(timeStamp) {
  var timestamp3 = timeStamp;
  var newDate = new Date();
  newDate.setTime(timestamp3 * 1000);
  return formatTime(newDate);
}

function timeConvertTimeStamp(date, time) {
  var stamp1 = new Date(date + ' ' + time + ":00").getTime();
  return stamp1 / 1000;
}

function reqTaskInfo(flag, sort){
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://localhost:8080/' + 'sql',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        flag: flag,
        sort: sort
      },
      success: res => {
        console.log(res.data)
        resolve(res)
      }
    })
  });
  promise.then(function (value) {
    //console.log(parseInt(value)+2);
    return value;
    // success
  }, function (err) {
    // failure
    return err;
  });
  return promise;
}

module.exports = {
  formatTime: formatTime,
  getDateStr: getDateStr,
  TimeStampConvertTime: TimeStampConvertTime,
  timeConvertTimeStamp: timeConvertTimeStamp,
  reqTaskInfo: reqTaskInfo
}
 //