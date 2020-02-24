const formatTime = date => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }
    //时间戳转换成日期时间
const changeTime = value => {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    return y + '年' + m + '月' + d + '日';

}
const changeDuration = value => {
    let a = value
    var other = a % 3600;
    var minute = Math.floor(other / 60);
    var second = (other % 60).toFixed(0);
    if (minute < 10) {
        minute = `0${minute}`
    }
    if (second < 10) {
        second = `0${second}`
    }
    value = `${minute}: ${second}`
    return value
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    formatTime: formatTime,
    changeTime: changeTime,
    changeDuration: changeDuration,
}