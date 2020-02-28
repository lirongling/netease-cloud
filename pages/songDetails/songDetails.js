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
    use: ['backSong', 'songDetails'],
    /**
     * 页面的初始数据
     */
    data: {

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
        maxSlider: 100,
        showPop: false,
        playTypes: song.getType(),
        playType: [{
                ico: '../../assets/images/order.png'
            },
            {
                ico: '../../assets/images/cycle.png'
            },
            {
                ico: '../../assets/images/random.png'
            }
        ]
    },
    onClose() {
        this.setData({
            showPop: !this.data.showPop
        })
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
    // 改变播放状态
    changeType() {
        this.data.playTypes++
            if (this.data.playTypes >= this.data.playType.length) {
                this.data.playTypes = 0
            }
        this.setData({
            playTypes: this.data.playTypes
        })
        song.changeType(this.data.playTypes)
    },

    sliderchange(event) {
        backSong.pause()
        let sliderValue = event.detail.value
        backSong.seek(sliderValue)
        backSong.play()
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
    // 上一首or下一首
    up(e) {
        let a = e.currentTarget.dataset.num
        song.getUrl(a)

    },


    audioStatuss() {

        //音频播放进度更新事件
        backSong.onTimeUpdate(() => {

                // console.log(backSong.coverImgUrl);
                // console.log(backSong.title);
                seekPosition = backSong.currentTime;
                this.setData({
                    audioDuration: backSong.duration,
                    currentProcess: util.changeDuration(backSong.currentTime),
                    endProcess: util.changeDuration(backSong.duration),
                    sliderValue: seekPosition,
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
        backSong.onStop(() => {

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.audioStatuss()

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