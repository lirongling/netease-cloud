import create from '../../utils/store/create'
import store from '../../store/index'
import api from "../../http/api";
create.Page(store, {
    use: ['userInfo'],
    /**
     * 页面的初始数据
     */
    data: {
        arr: [{
                ico: '../../assets/images/dt.png',
                name: '我的电台'
            },
            {
                ico: '../../assets/images/gd.png',
                name: '我的歌单'
            },
            {
                ico: '../../assets/images/tc.png',
                name: '退出登录'
            }, {
                ico: '../../assets/images/sz.png',
                name: '修改信息'
            },
        ]
    },
    login() {
        wx.navigateTo({
            url: '/pages/login/login'
        });
    },
    getSubcount() {
        api.subcount().then(res => {
            console.log(object);
        }).catch(err => {
            console.log(err);
        })
    },
    clickItem(e) {
        let a = e.currentTarget.dataset.index
        if (a === 2) {
            wx.showModal({
                title: '是否确认退出？',
                content: '',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        wx.removeStorageSync('userInfo');
                        this.store.data.userInfo = {}
                    }
                },
                fail: () => {},
                complete: () => {}
            });

        } else if (a === 3) {
            wx.navigateTo({
                url: '/pages/edit/edit',
            });
        }
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
        console.log(store.data.userInfo);
        this.getSubcount()
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