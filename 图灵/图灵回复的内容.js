
输入="123"
图灵机器人(输入)

function 图灵机器人(输入) {
    var 链接 = "http://www.tuling123.com/openapi/api";
    //toastLog(info);
    var 获取 = http.post(链接, {
        "key": "f48dd9f7a5284994bddcc546ae66cbd4",
        "info": 输入,
        "userid": "80000"
    });
    var 源码 = 获取.body.string();
    eval("b=" + 源码);
    log("\n图灵收到 ",输入,"\n图灵返回",b.text)
}
