function getTime(time) {
  let flag = 0;
  if (typeof (time) == "undefined") {
    return ["undefined", "undefined"];
  }
  let t = time.split('周)[');
  let week = []
  let weekStr = t[0];
  if (weekStr.search('单') != -1) {
    flag = 1;
    if (weekStr != null)
      weekStr = weekStr.replace('单', '');
  }
  if (weekStr.search('双') != -1) {
    flag = 2;
    if (weekStr != null)
      weekStr = weekStr.replace('双', '');
  }
  if (flag == 1) {
    week = weekStr2IntList(weekStr).filter(v => v % 2 != 0);
  } else if (flag == 2) {
    week = weekStr2IntList(weekStr).filter(v => v % 2 == 0);
  } else {
    week = weekStr2IntList(weekStr);
  }
  let jc;
  let start = 0;
  let end = 0;
  try {
    if (t[1] != null) {
      jc = t[1].replace('节]', '').split('-');
      start = parseInt(jc[0]);
      end = parseInt(jc[jc.length - 1]);
    }
  } catch (e) {
    console.log(e);
  }
  let sections = []

  for (let i = start; i <= end; i++) {
    sections.push({ section: i })
  }

  return [week, sections];
}

function weekStr2IntList(week) {
  // 将全角逗号替换为半角逗号
  let reg = new RegExp("，", "g");
  week.replace(reg, ',');
  let weeks = [];

  // 以逗号为界分割字符串，遍历分割的字符串
  week.split(",").forEach(w => {
    if (w.search('-') != -1) {
      let range = w.split("-");
      let start = parseInt(range[0]);
      let end = parseInt(range[1]);
      for (let i = start; i <= end; i++) {
        if (!weeks.includes(i)) {
          weeks.push(i);
        }
      }
    } else if (w.length != 0) {
      let v = parseInt(w);
      if (!weeks.includes(v)) {
        weeks.push(v);
      }
    }
  });
  return weeks;
}

function getCourse(info, col) {
  let course = {}
  course['name'] = info[0];
  if (info.length == 4) {
    course['position'] = info[3]
  } else {
    course['position'] = ''
  }
  course['teacher'] = info[1]
  let [weeks, sections] = getTime(info[2])
  course['weeks'] = weeks
  course['day'] = col + 1
  course['sections'] = sections
  return course;
}

function scheduleHtmlParser(html) {
  var $ = cheerio.load(html, { decodeEntities: false });
  let result = []
  const reg = new RegExp(/(?<=>)[^<>]+(?=<)/g)

  try {
    $('#kbtable').find('tr').each(function (row, _) {
      if (row != 0) {
        $(this).find('td').each(function (col, _) {
          let info = $(this).html().match(reg)
          if (info != null) {
            info = info.slice(2, info.length - 1)
            if (info.length >= 5) {

              info = info.map((str) => str.trim())
              let index = 0
              var i = 0;
              var count = 1;

              for (i = 0; i < info.length; i++) {
                if (info[i] == '----------------------') {
                  count = count + 1;
                } else if (info[i] == "O") {
                  info[i] = ""
                } else if (info[i] == "P") {
                  info[i] = ""
                }
              }

              //去掉info中的空值
              info = info.filter(function (s) {
                return s && s.trim();
              });



              if (count != 1) {
                if (info.length == 9 * count - 2) {
                  for (i = 0; i < count * 4 - 1; i++) {
                    info[i] = ""
                  }
                } else {
                  for (i = 0; i < count; i++) {
                    if (info.length == 7 * count + 2 * i - 2) {
                      var j = 0;
                      for (j = 0; j < 3 * count + i - 1; j++) {
                        info[j] = ""
                      }
                    }
                  }
                }

              } else if (info.length == 5) {
                for (i = 0; i < 2; i++) {
                  info[i] = ""
                }
              } else {
                if(info[3].substr(0, 2) == "体育"){
                  info[3] = info[3]+info[4]
                  info[4] = "" 
                }
                for(i = 0;i<3;i++){
                  info[i] = ""
                }
              }

              //去掉info中的空值
              info = info.filter(function (s) {
                return s && s.trim();
              });



              //如果一个框框只有一门课
              if (count == 1) {
                let course = getCourse(info, col);

                result.push(course)
              } else {
                let j = 0
                let z = 0
                let f = 0
                let temp = {}
                let son = []
                info[info.length] = '---------------------'

                for (j = 0; j <= info.length + 1; j++) {

                  if (info[j] != '---------------------') {
                    son[z] = info[j]
                    z = z + 1
                  } else if (info[j] == '---------------------') {

                    let course = getCourse(son, col)
                    result.push(course)
                    z = 0
                    son = []
                  }

                }
              }
            }
          }

        })
      }
    })
  } catch (e) {
    console.log(e)
  }

  let sectionTimes = [{
    "section": 1,
    "startTime": "08:00",
    "endTime": "08:45"
  }, {
    "section": 2,
    "startTime": "08:50",
    "endTime": "09:35"
  }, {
    "section": 3,
    "startTime": "09:55",
    "endTime": "10:40"
  }, {
    "section": 4,
    "startTime": "10:45",
    "endTime": "11:30"
  }, {
    "section": 5,
    "startTime": "13:10",
    "endTime": "13:55"
  }, {
    "section": 6,
    "startTime": "14:00",
    "endTime": "14:45"
  }, {
    "section": 7,
    "startTime": "15:00",
    "endTime": "15:45"
  }, {
    "section": 8,
    "startTime": "15:50",
    "endTime": "16:35"
  }, {
    "section": 9,
    "startTime": "16:50",
    "endTime": "17:35"
  }, {
    "section": 10,
    "startTime": "17:40",
    "endTime": "18:25"
  }, {
    "section": 11,
    "startTime": "19:10",
    "endTime": "19:55"
  }, {
    "section": 12,
    "startTime": "20:00",
    "endTime": "20:45"
  }]
  return { courseInfos: result, sectionTimes: sectionTimes }
}