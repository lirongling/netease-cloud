import api from "../../http/api";
import util from '../../utils/util'
import area from '../../assets/js/area';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {},
        createTime: '',
        differ: 0,
        city: ''
    },
    getCity(province, city) {
        let province_list = area.province_list
        let city_list = area.city_list
        let provinces = ''
        let citys = ''
        for (let i in province_list) {
            if (i == province) {
                provinces = province_list[i]
            }
        }
        for (let i in city_list) {
            if (i == city) {
                citys = city_list[i]
            }
        }
        this.setData({
            city: provinces + ' ' + citys
        })

    },
    getUserDetails(id) {
        wx.showLoading({
            title: '加载中',

        });
        api.getUserDetails(id).then(res => {
            wx.hideLoading();
            console.log(res);
            if (res.code === 200) {
                this.getCity(res.profile.province, res.profile.city)
                let a = util.changeTime(res.createTime)
                let myDate = new Date();
                let tYear = myDate.getFullYear();
                let b = a.slice(0, a.indexOf('年'))
                this.setData({
                    user: res,
                    createTime: a,
                    differ: tYear - b
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
        this.getUserDetails(options.id)
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