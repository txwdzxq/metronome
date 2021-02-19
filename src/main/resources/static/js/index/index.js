let timeout;
window.onload = function () {
    timeout = setTimeout(function () {
        console.log("onload");
    }, 3000);
    let clock = document.getElementById("clock");
    clock.innerText = new Date().toISOString();
}

window.addEventListener("keydown", function (event) {
    //右
    if (event.key === 'ArrowRight') {
        if (timeout) {
            clearTimeout(timeout);
        } else {
            console.log("onload");
        }
    }
})

//滚动条在Y轴上的滚动距离
function getScrollTop() {
    if (document.body && document.documentElement) {
        return document.body.scrollTop > document.documentElement.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
    }
    return 0;
}

//文档的总高度
function getScrollHeight() {
    if (document.body && document.documentElement) {
        return document.body.scrollHeight > document.documentElement.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
    }
    return 0;
}

//浏览器视口的高度
function getWindowHeight() {
    if (document.compatMode === "CSS1Compat") {
        return document.documentElement.clientHeight;
    }
    return document.body.clientHeight;
}

window.addEventListener("wheel", function (wheelEvent) {
    console.log(wheelEvent);
    console.log(wheelEvent.deltaX)
    console.log(wheelEvent.deltaY)
    // console.log(wheelEvent.wheelDelta)
})
