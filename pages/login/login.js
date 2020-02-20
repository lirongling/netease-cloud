// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: false,
        isTr: false,
    },
    phoneLogin(e) {
        console.log(e);
        if (!this.data.checked) {
            this.setData({
                isTr: true
            })

            setTimeout(() => {
                wx.showToast({
                    title: '请勾选用户同意《用户协议》《隐私协议》《儿童隐私协议》',
                    icon: 'none',
                    duration: 2000,

                });
                setTimeout(() => {
                    this.setData({
                        isTr: false
                    }, 2000)
                })
            }, 1000)
        } else {
            if (!e.currentTarget.dataset.index) {
                wx.navigateTo({
                    url: '/pages/phoneLogin/phoneLogin',
                });
            } else {
                wx.navigateTo({
                    url: '/pages/emailLogin/emailLogin',
                });
            }
        }
    },
    change() {
        this.setData({
            checked: !this.data.checked
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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