import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
import util from '../../utils/util'
import song from '../../utils/song'

let audioUrl = "",
    seekPosition = 0;
const audioContext = wx.createInnerAudioContext();
const backSong = wx.getBackgroundAudioManager();
create.Page(store, {
    use: ['backSong'],
    /**
     * 页面的初始数据
     */
    data: {
        songDetails: {},
        songUrl: {},
        icoArr: [
            { ico: '../../assets/images/like.png' },
            { ico: '../../assets/images/download.png' },
            { ico: '../../assets/images/message.png' },
            { ico: '../../assets/images/share.png' },
            { ico: '../../assets/images/more1.png' },
        ],
        pause: true,
        playing: true,
        loading: false,
        productDetail: {},
        audioDuration: 0,
        currentProcess: '00:00',
        endProcess: '00:00',
        sliderStep: 1,
        sliderValue: 0,
        id: null,
        currentTime: 0,
        maxSlider: 100
    },
    getPlaySong(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getPlaySong(id).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.setData({
                    songUrl: res
                })
            }
            console.log(res);
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    getSongDetails(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getSongDetails(id).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.setData({
                    songDetails: res
                })
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    sliderchange(event) {
        let sliderValue = event.detail.value
        backSong.seek(sliderValue)
        this.setData({
            currentProcess: util.changeDuration(seekPosition),
            currentTime: sliderValue

        })
    },
    //播放暂停
    audioPause: function() {
        const _this = this;
        if (_this.data.playing) {
            backSong.pause()
            _this.setData({
                pause: true,
                playing: false,
                loading: false
            })
        } else {

            backSong.play()
            audioContext.play();
            _this.setData({
                pause: false,
                playing: true,
                loading: false
            })
        }
    },

    audioStatuss() {
        const _this = this;
        //音频播放进度更新事件
        backSong.onTimeUpdate(() => {
                seekPosition = backSong.currentTime;
                _this.setData({
                    audioDuration: backSong.duration,
                    currentProcess: util.changeDuration(backSong.currentTime),
                    endProcess: util.changeDuration(backSong.duration),
                    sliderValue: (seekPosition / backSong.duration) * 100,
                    maxSlider: backSong.duration,
                })
            })
            //音频播放结束
        backSong.onEnded(() => {

            seekPosition = 0;
            _this.setData({
                sliderValue: 0,
                currentProcess: '00:00',
                playing: false,
                pause: true
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.audioStatuss()
        let a = wx.getStorageSync('songDetails')
        this.setData({
            id: options.id,
            songDetails: a
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})