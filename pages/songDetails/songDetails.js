import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {

    /**
     * 页面的初始数据
     */
    data: {
        songDetails: {},
        songUrl: {}
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getPlaySong(options.id)
        this.getSongDetails(options.id)
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