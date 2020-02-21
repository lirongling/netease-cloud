import create from '../../utils/store/create'
import store from '../../store/index'
import Notify from '../../lib/vant/notify/notify';
import api from "../../http/api";
create.Page(store, {
    use: ['navHeight', 'navTop', 'navRight', 'windowHeight', 'navHeights','userInfo'],
    /**
     * 页面的初始数据
     */
    data: {
        userphone: '',
        password: '',
        passType: 'password',
        flagePhone: false,
        flagePass: false,
    },
    onClickIcon() {
        wx.showToast({
            title: '邮箱为网易云邮箱',
            icon: 'none',

        });
    },
    showPass() {
        if (this.data.passType === 'password') {
            this.setData({
                passType: 'text'
            })
        } else {
            this.setData({
                passType: 'password'
            })
        }
    },
    // 用户名验证
    phoneBlur(e) {
        this.data.flagePhone = false;
        let a = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;;
        let b = e.detail.value
        if (b.trim() === "") {
            // 警告通知
            Notify({ type: "warning", message: "邮箱不能为空" });
            this.setData({
                flagePhone: false,

            })
        } else if (!a.test(b)) {
            Notify({ type: "warning", message: "邮箱不合法" });
            this.setData({
                flagePhone: false,
            })
        } else {
            this.setData({
                flagePhone: true,
                userphone: b
            })
        }
    },
    // 密码验证
    passBlur(e) {
        this.data.flagePass = false;
        let b = e.detail.value
        if (b.trim() === "") {
            // 警告通知
            Notify({ type: "warning", message: "密码不能为空" });
            this.setData({
                flagePass: false,
            })
        } else if (b.length < 6) {
            Notify({ type: "warning", message: "密码不能小于6位" });
            this.setData({
                flagePass: false,
            })
        } else {
            this.setData({
                flagePass: true,
                password: b
            })
        }
    },
    login() {
        if (this.data.flagePass && this.data.flagePhone) {
            wx.showLoading({
                title: '加载中',
            });
            let a = this.data.userphone
            let b = this.data.password
            api.loginbyEmail(a, b).then(res => {
                  
                    wx.hideLoading();
                    if (res.code === 200) {
                        wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                        });
                        this.store.data.userInfo=res.account
                        wx.setStorageSync('userInfo', res.account);
                        wx.switchTab({
                            url: '/pages/my/my',
                        });
                    } else {
                        wx.showToast({
                            title: res.message,
                            icon: 'none',

                        });
                    }
                }).catch(err => {
                    wx.hideLoading();
                    wx.showToast({
                        title: err.response.data.message,
                        icon: 'none',

                    });
                })
                // loginbyTel
        } else {
            Notify({ type: "warning", message: "请输入完整" });
        }
    },
    register() {
        wx.navigateTo({
            url: '/pages/register/register',

        });
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