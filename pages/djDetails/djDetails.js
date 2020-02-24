import api from "../../http/api";
import util from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        program: {},
        comments: [],
        songs: [],
        contentHeight: null,
    },
    scrollToTop() {
        this.setAction({
            scrollTop: 0
        })
    },
    // 计算scroll高度
    getHeight() {
        var me = this;
        const query = wx.createSelectorQuery().in(me);
        query.select('#contentsongs').boundingClientRect(function(res) {

            me.setData({
                contentHeight: wx.getSystemInfoSync().windowHeight - res.top
            })

        }).exec()

    },
    // 获取新碟详情
    getDjDetails(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getDjDetails(id).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                if (res.program.songs.length === 0) {
                    this.data.songs.push(res.program.mainSong)
                } else {
                    this.data.songs = res.program.songs
                }
                this.data.songs.map(item => {
                    let a = item.duration
                    var other = a % 3600;
                    var minute = Math.floor(other / 60);
                    var second = (other % 60).toFixed(0);
                    if (minute < 10) {
                        minute = `0${minute}`
                    }
                    if (second < 10) {
                        second = `0${second}`
                    }
                    item.duration = `${minute}: ${second}`
                        // item.playedNum = util.changeTime(item.playedNum)
                })
                this.setData({
                    program: res.program,
                    songs: this.data.songs
                })
                setTimeout(() => {
                    this.getHeight()
                }, 1000)
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    // 获取节目评论
    getDjComment(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getDjComment(id).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                res.comments.map(item => {
                    item.time = util.changeTime(item.time)
                })
                this.setData({
                    comments: res.comments,
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

        this.getDjDetails(options.id)
        this.getDjComment(options.id)
        this.setData({
            id: options.id,
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