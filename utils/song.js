import api from "../http/api";
import create from './store/create'
import store from '../store/index'
const backSong = wx.getBackgroundAudioManager();
let details = {}
let title = null

const getUrl = () => {
    api.getPlaySong(store.data.songsList[0].id).then(res => {
        wx.hideLoading();
        if (res.code === 200) {
            backSong.src = res.data[0].url
            backSong.title = title
            backSong.play();
            onEnded()


        }
    }).catch(err => {
        wx.hideLoading();
        console.log(err);
    })


}
const onEnded = () => {
    console.log('object');
    backSong.onEnded(() => {
        getSongDetails()
    })
    backSong.onStop(() => {
            getSongDetails()
        })
        // backSong.stop(() => {

    //     getSongDetails()
    // })
}

const getSongDetails = () => {
    onEnded()
    wx.showLoading({
        title: '加载中',
    });
    api.getSongDetails(store.data.songsList[0].id).then(res => {
        wx.hideLoading();
        if (res.code === 200) {
            backSong.title = res.songs[0].name
            title = res.songs[0].name
            backSong.coverImgUrl = res.songs[0].al.picUrl
            wx.setStorageSync('songDetails', res.songs);
            getUrl()
        }
    }).catch(err => {
        wx.hideLoading();
        console.log(err);
    })



}
module.exports = {
    getUrl: getSongDetails,
}