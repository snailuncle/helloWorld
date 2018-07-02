auto();

messageSend("QQ群470614178，进群当最强王者")

function messageSend(str1) {
    let s = str1 + " " + randomContent()
    className("EditText").findOne().setText(s);
    text("发送").findOne().click();
    log("发送的随机字符串是", s)
}


function randomContent() {
    var tmp = randomText();
    var timestamp = CurentTime()
    return tmp + timestamp;
}


function randomText() {
    var _len = 10;
    var i = 0;
    var _str = "";
    var _base = 20000;
    var _range = 1000;
    while (i < _len) {
        i++;
        var _lower = parseInt(Math.random() * _range);
        _str += String.fromCharCode(_base + _lower);
    }
    return _str;
}


function CurentTime() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
}
