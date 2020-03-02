import api from "../http/api";
import create from './store/create'
import store from '../store/index'
const backSong = wx.getBackgroundAudioManager();
let details = {}
let title = null
let i = 0
let flage = false
let type = 0
let time = null

const getUrls = (item) => {
    wx.showLoading({
        title: '加载中',
        mask: true,

    });
    api.getPlaySong(store.data.songsList[i].id).then(res => {
        wx.hideLoading();
        if (res.code === 200) {
            i++
            if (res.data[0].url) {
                wx.setStorageSync('songDetails', item);
                backSong.src = res.data[0].url
                backSong.title = title
                backSong.play();
                onEnded()
            } else {

                if (store.data.songsList.length === 1) {
                    wx.showToast({
                        title: '资源未找到',
                        icon: 'none',
                    });

                } else {
                    store.data.songsList.splice(i - 1, 1)
                    wx.showToast({
                        title: '资源未找到,已为你跳过',
                        icon: 'none',
                    });
                    flage = true
                    console.log('object111');
                    action()
                }

            }

        }

    }).catch(err => {
        wx.hideLoading();
        console.log(err);
    })


}
const onEnded = () => {
    // console.log(store.data.songsList);
    setTimeout(() => {

        backSong.onEnded(() => {
            console.log(i);
            playType()
            setTimeout(() => {
                console.log('1object');
                flage = true
                action()
            }, 500)
        })
        backSong.onStop(() => {
            playType()
            setTimeout(() => {
                console.log('2object');
                flage = true
            }, 500)
        })
    }, 1000)


    // backSong.stop(() => {

    //     getSongDetails()
    // })
}
const changeType = (val) => {
    type = val
    console.log(type);
    return
}
const playType = () => {
    console.log(type);
    if (type == 1) {
        i--
    } else if (type == 2) {
        i = parseInt(Math.random(0, store.data.songsList.length - 1))
    }
}
const clear = () => {
    clearInterval(time)
}
const action = (num, index) => {
    let a = i
        // clearInterval(time)
        // backSong.pause()
    if (index != undefined) {
        flage = false
        i = index
    }
    if (num != undefined) {
        i += (num - 1)
    } else {
        i = 0
    }
    if (flage) {
        i = a
    }

    if (i < 0) {
        i = store.data.songsList.length - 1
    } else if (i >= store.data.songsList.length) {
        i = 0
    }
    console.log(i);
    getSongDetails()

    // time = setInterval(() => {
    //     console.log(i);
    //     if (flage) {
    //         if (i < 0) {
    //             i = store.data.songsList.length - 1
    //         } else if (i >= store.data.songsList.length) {
    //             i = 0
    //         }

    //         getSongDetails()

    //         // setTimeout(() => {

    //         //     backSong.onEnded(() => {
    //         //         playType()
    //         //         setTimeout(() => {
    //         //             console.log('3object');
    //         //             flage = true
    //         //         }, 500)
    //         //     })
    //         //     // backSong.onStop(() => {
    //         //     //     playType()
    //         //     //     setTimeout(() => {
    //         //     //         console.log('4object');
    //         //     //         flage = true
    //         //     //     }, 500)

    //         //     // })
    //         // }, 1000)
    //     }
    // }, 3000)


}


const getType = () => {
    return type
}


const getSongDetails = () => {
    console.log(i);
    wx.showLoading({
        title: '加载中',
    });
    api.getSongDetails(store.data.songsList[i].id).then(res => {
        wx.hideLoading();
        if (res.code === 200) {

            if (res.songs[0].name != null) {
                backSong.title = res.songs[0].name
                title = res.songs[0].name
            } else {
                backSong.title = '暂无'
                title = '暂无'
            }

            backSong.coverImgUrl = res.songs[0].al.picUrl
            backSong.singer = res.songs[0].ar[0].name
            getUrls(res.songs)


        }
    }).catch(err => {
        wx.hideLoading();
        console.log(err);
    })
}
module.exports = {
    getUrl: action,
    changeType: changeType,
    getType: getType,
    clear: clear,
}