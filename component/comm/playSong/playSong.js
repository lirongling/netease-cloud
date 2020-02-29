import create from '../../../utils/store/create'
import store from '../../../store/index'
import song from '../../../utils/song'
const backSong = wx.getBackgroundAudioManager();
create.Component(store, {
    /**
     * 组件的属性列表
     */
    use: ['songsList', 'songDetails'],
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        isPaused: !backSong.paused,
        showPop: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goDetails() {
            wx.navigateTo({
                url: '/pages/songDetails/songDetails',
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        },
        stop() {
            backSong.pause()
            this.setData({
                isPaused: false
            })
        },
        play() {
            backSong.play()
            this.setData({
                isPaused: true
            })
        },
        getPlay() {
            backSong.onPause(() => {
                this.setData({
                    isPaused: false,
                })
            })
            backSong.onTimeUpdate(() => {

                if (!backSong.paused) {
                    this.setData({
                        isPaused: true,
                    })
                }

            })
            backSong.onPlay(() => {
                _this.setData({
                    isPaused: true,
                })
            })
        },
        onClose() {
            this.setData({
                showPop: !this.data.showPop
            })
        }
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {
        this.getPlay()
    },
    moved: function() {

    },
})