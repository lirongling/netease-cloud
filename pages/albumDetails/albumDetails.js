import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        playlist: {},
        contentHeight: null,
        selectArr: [{
                ico: '../../assets/images/message.png',
                name: ''
            },
            {
                ico: '../../assets/images/share.png',
                name: ''
            },
            {
                ico: '../../assets/images/download.png',
                name: '下载'
            },
            {
                ico: '../../assets/images/select.png',
                name: '多选'
            },

        ]
    },
    scrollToTop() {
        this.setAction({
            scrollTop: 0
        })
    },
    // 获取新碟详情
    getAlbumDetails(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getAlbumDetails(id).then(res => {
            wx.hideLoading();

            if (res.code === 200) {

                if (!res.album.blurPicUrl) {
                    res.album.blurPicUrl = api.background()
                }
                this.data.selectArr[0].name = res.album.info.commentCount
                this.data.selectArr[1].name = res.album.info.shareCount
                this.setData({
                    playlist: res,
                    selectArr: this.data.selectArr
                })
                console.log(this.data.playlist);

                setTimeout(() => {
                    this.getHeight()
                }, 1000)
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    lower() {

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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.getAlbumDetails(options.id)

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