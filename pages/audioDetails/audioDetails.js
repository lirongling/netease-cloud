import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
let VideoContext = null
create.Page(store, {
    use: ['mvDetails'],

    data: {
        url: '',
        danmuList: [{
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1
            },
            {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3
            }
        ],
        details: {},
        inputValue: '',
        hotComments: []
    },
    // 下载视屏
    download() {
        let _this = this
        wx.showLoading({
            title: '正在下载视屏',

        });
        wx.downloadFile({
            url: _this.data.url,
            success: (res) => {
                wx.hideLoading();
                if (res.statusCode === 200) {
                    wx.saveVideoToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: (res) => {
                            wx.showToast({
                                title: '下载成功',
                                icon: 'success',
                            });
                            this.setData({
                                inputValue: ''
                            })
                        },
                        fail: (err) => {
                            console.log(err);
                        },
                        complete: () => {}
                    });
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 上传视屏
    bindButtonTap: function() {
        var that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: ['front', 'back'],
            success: function(res) {
                that.setData({
                    src: res.tempFilePath
                })
            }
        })
    },
    bindSendDanmu: function() {
        VideoContext.sendDanmu({
            text: this.data.inputValue,
            color: this.getRandomColor()
        })

    },
    getRandomColor() {
        let rgb = []
        for (let i = 0; i < 3; ++i) {
            let color = Math.floor(Math.random() * 256).toString(16)
            color = color.length == 1 ? '0' + color : color
            rgb.push(color)
        }
        return '#' + rgb.join('')
    },
    getUrl(id) {
        wx.showLoading({
            title: '加载中',
            mask: true,

        });
        api.getMvUrl(id).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.setData({
                    url: res.data.url
                })
                VideoContext = wx.createVideoContext('myVideo')
                VideoContext.play()
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    bindinput(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    // 获取热评
    getCommentMv(id) {
        wx.showLoading({
            title: '加载中',
            mask: true,

        });
        api.getCommentMv(id).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.setData({
                    hotComments: res.hotComments
                })
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getUrl(options.id)
        this.getCommentMv(options.id)
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