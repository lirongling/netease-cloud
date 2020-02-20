import api from "../../http/api";
import create from '../../utils/store/create'
import util from '../../utils/util'
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
        limit1: 10,
        artist: {},
        hotAlbums: [],
        offset: 0,
        offset1: 0,
        artistDetails: {},
        name: '',
        id: null,
        contentHeight: null,
        isFixed: false,
        albumSize: '',
        musicSize: '',
        hotSongs: [],
        mvs: [],

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
        let a = (store.data.windowHeight - store.data.navHeight) * 2
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
                if (res.hotAlbums.length > 0) {
                    res.hotAlbums.map(item => {
                        item.publishTime = util.changeTime(item.publishTime)
                    })
                    this.data.hotAlbums = this.data.hotAlbums.concat(res.hotAlbums)
                    this.setData({
                        hotAlbums: this.data.hotAlbums,
                        offset: this.data.offset,
                        artist: res.artist,
                        albumSize: res.artist.albumSize
                    })
                } else if (res.hotAlbums.length === 0 && this.data.offset !== 5) {
                    wx.showToast({
                        title: '没有更多数据了',
                        icon: 'none',

                    });
                } else {
                    wx.showToast({
                        title: '暂无专辑',
                        icon: 'none',

                    });
                }


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
    getArtistSong(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getArtistSong(id).then(res => {
            wx.hideLoading();

            // this.data.offset += this.data.limit
            if (res.code === 200) {
                this.setData({
                    musicSize: res.artist.musicSize,
                    hotSongs: res.hotSongs

                })


            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    getArtistMv(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getArtistMv(id, this.data.offset1, this.data.limit1).then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                if (res.mvs.length > 0) {
                    this.data.offset1 += this.data.limit1
                    this.data.mvs = this.data.mvs.concat(res.mvs)
                    this.setData({
                        mvs: this.data.mvs,
                        offset1: this.data.offset1,
                    })
                } else if (res.mvs.length === 0 && this.data.offset1 !== 10) {
                    wx.showToast({
                        title: '没有更多数据了',
                        icon: 'none',

                    });
                } else {
                    wx.showToast({
                        title: '暂无专辑',
                        icon: 'none',

                    });
                }
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
    onChange(e) {
        this.setData({
            tabsIdx: e.detail.index
        })
    },

    // tabsScroll(e) {
    //     console.log(e);
    // },
    // onPageScroll(e) {
    //     let a = store.data.navHeights + store.data.navTop
    //     var me = this;
    //     var query = wx.createSelectorQuery().in(me);
    //     let c = null
    //     query.select('#content-tabs').boundingClientRect(function(res) {
    //         if (res.top !== null) {
    //             if (res.top <= a) {
    //                 me.setData({
    //                     isFixed: true,
    //                 })
    //             }
    //         }
    //     }).exec()

    // },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.getHeight()
        this.getArtistAlbum(options.id)
        this.getArtistDetails(options.id)
        this.getArtistSong(options.id)
        this.getArtistMv(options.id)
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
        if (this.data.tabsIdx === 1) {
            this.getArtistAlbum(this.data.id)
        } else if (this.data.tabsIdx === 3) {
            this.getArtistMv(this.data.id)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})