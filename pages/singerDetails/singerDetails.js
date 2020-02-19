import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['navHeight', 'navTop', 'navRight', 'windowHeight', 'navHeights'],

    /**
     * 页面的初始数据
     */
    data: {
        arr: [{ name: '主页' },
            { name: '歌曲' },
            { name: '专辑' },
            { name: '视屏' },
        ],
        tabsIdx: 0,
        limit: 5,
        artist: {},
        hotAlbums: [],
        offset: 0,
        artistDetails: {},
        name: '',
        id: null,
        contentHeight: null,
        isFixed: false,

    },
    lower() {

    },
    upper() {
        // console.log('object');
        this.setData({
            isFixed: false,

        })
    },
    getHeight() {
        let a = (store.data.windowHeight - store.data.navHeights - store.data.navTop * 0.5) * 2
        this.setData({
            contentHeight: a
        })
    },
    getArtistAlbum(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getArtistAlbum(id, this.data.offset, this.data.limit).then(res => {
            wx.hideLoading();
            this.data.offset += this.data.limit
            if (res.code === 200) {
                this.data.hotAlbums = this.data.hotAlbums.concat(res.hotAlbums)
                this.setData({
                    hotAlbums: this.data.hotAlbums,
                    offset: this.data.offset,
                    artist: res.artist
                })
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    getArtistDetails(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getArtistDetails(id).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.setData({
                    artistDetails: res
                })
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    send(e) {
        this.setData({
            tabsIdx: e.detail
        })
    },
    onPageScroll(e) {
        let a = store.data.navHeights + store.data.navTop
        var me = this;
        var query = wx.createSelectorQuery().in(me);
        let c = null
        query.select('#content-tabs').boundingClientRect(function(res) {
            if (res.top !== null) {
                if (res.top <= a) {
                    me.setData({
                        isFixed: true,
                    })
                }
            }
        }).exec()

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getHeight()
        this.getArtistAlbum(options.id)
        this.getArtistDetails(options.id)
        this.setData({
            name: options.name,
            id: options.id
        })
        wx.setNavigationBarTitle({
            title: options.name,
        });


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