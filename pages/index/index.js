//Page Object
import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['navHeight', 'navTop', 'navRight'],
    data: {
        showPop: false,
        personalized: {
            index: 0,
            type: [{ name: "推荐歌单" }],
            right: "歌单广场",
            data: []
        },
        albums: {
            index: 1,
            type: [{ name: "新碟" }, { name: "新歌" }],
            right: "更多新碟",
            data: []
        },
        newMv: {
            index: 2,
            type: [{ name: "推荐MV" }],
            right: "更多MV",
            data: []
        },
        newDjprogram: {
            index: 3,
            type: [{ name: "推荐电台" }],
            right: "更多电台",
            data: []
        },
        newProgram: {
            index: 4,
            type: [{ name: "推荐节目" }],
            right: "更多节目",
            data: []
        },
        newAlbums: [],
        newSong: []
    },
    onFocus(e) {
        this.setData({
                showPop: !this.data.showPop
            })
            // this.setData({

        // })
    },
    // 切换
    select(e) {
        if (e.detail === 0) {
            this.data.albums.data = this.data.newAlbums
            this.data.albums.right = "更多新碟"
            this.setData({
                albums: this.data.albums,
            })
        } else {
            this.data.albums.right = "更多新歌"
            this.data.albums.data = this.data.newSong
            this.setData({
                albums: this.data.albums,
            })
        }
    },
    // 推荐歌单
    getPersonalized() {
        wx.showLoading({
            title: '加载中',
        });
        api.getPersonalized().then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.data.personalized.data = res.result
                this.setData({
                    personalized: this.data.personalized
                })

            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    // 新碟
    getAlbum() {
        wx.showLoading({
            title: '加载中',
        });
        api.getAlbum().then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.data.albums.data = res.albums
                this.setData({
                    albums: this.data.albums,
                    newAlbums: res.albums
                })

            }

        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    // 新歌
    getNewSong() {
        wx.showLoading({
            title: '加载中',
        });
        api.getNewSong().then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.setData({

                    newSong: res.result
                })

            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    // 推荐mv
    getPersonalizedMv() {
        wx.showLoading({
            title: '加载中',
        });
        api.getPersonalizedMv().then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.data.newMv.data = res.result
                this.setData({
                    newMv: this.data.newMv
                })

            }

        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    // 推荐电台
    getDjprogram() {
        wx.showLoading({
            title: '加载中',
        });
        api.getDjprogram().then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.data.newDjprogram.data = res.result
                this.setData({
                    newDjprogram: this.data.newDjprogram
                })

            }

        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    // 推荐节目
    getProgram() {
        wx.showLoading({
            title: '加载中',
        });
        api.getProgram().then(res => {
            wx.hideLoading();
            if (res.code === 200) {
                this.data.newProgram.data = res.programs
                this.setData({
                    newProgram: this.data.newProgram
                })


            }

        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    getNavInfo() {
        let menuButton = wx.getMenuButtonBoundingClientRect()
        let statusBarHeight = null
        let windowWidth = null
        wx.getSystemInfo({
            success: function(res) {
                statusBarHeight = res.statusBarHeight
                windowWidth = res.windowWidth

            }
        });
        this.store.data.navHeight = menuButton.height
        this.store.data.navTop = menuButton.top
        this.store.data.navRight = windowWidth - menuButton.right

    },
    //options(Object)
    onLoad: function(options) {
        this.getPersonalized()
        this.getNewSong()
        this.getAlbum()
        this.getPersonalizedMv()
        this.getProgram()
        this.getDjprogram()
        this.getNavInfo()


    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});