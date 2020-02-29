//Page Object
import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
import util from '../../utils/util'
const backSong = wx.getBackgroundAudioManager();
create.Page(store, {
    use: ['songDetails', 'searchHistory', 'navHeight', 'navTop', 'navRight', 'windowHeight', 'navHeights', 'userInfo', 'searchWord'],
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
        newSong: [],
        isSussgest: true,
        tabArr: [
            { name: '综合' },
            { name: '单曲' },
            { name: '专辑' },
            { name: '歌手' },
            { name: '歌单' },
            { name: '用户' },
            { name: 'MV' },
            { name: '歌词' },
            { name: '电台' },
            { name: '视屏' },



        ],
        type: 1018,
        offset: 0,
        limit: 30,
        searchAll: {},
        searchSongs: [],
        active: 0,
        searchType: [
            1018, 1, 10, 100, 1000, 1002, 1004, 1006, 1009, 1014
        ],
        searchWord: '',
        contentHeight: null,


    },
    onFocus(e) {
        this.setData({
            isSussgest: !this.data.showPop,
            showPop: !this.data.showPop,

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
                store.data.windowHeight = res.windowHeight

            }
        });
        this.store.data.navHeight = menuButton.height
        this.store.data.navTop = menuButton.top
        this.store.data.navHeights = statusBarHeight + menuButton.height + (menuButton.top - statusBarHeight) * 2
        this.store.data.navTop = menuButton.top
        this.store.data.navRight = windowWidth - menuButton.right

    },
    getUserInfo() {
        if (wx.getStorageSync('userInfo')) {
            this.store.data.userInfo = wx.getStorageSync('userInfo')
            console.log(this.store.data.userInfo);
        }
    },
    search(e) {

        store.data.searchText = e.detail
        this.setData({
            isSussgest: false,
            searchWord: e.detail,
            offset: 0,
        })
        this.getHeight()
        this.setStorage(e.detail)
        this.searchs(e.detail)
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 1000
        });
    },
    scrollToTop() {
        this.setAction({
            scrollTop: 0
        })
    },
    lower() {
        if (this.data.active) {
            this.searchs(this.data.searchWord)
        }

    },


    // 处理数据
    dealTime(res) {
        res.map(item => {
            item.publishTime = util.changeTime(item.publishTime)
        })
    },
    delDuration(res, n, keywords) {
        res.map(item => {
            if (n !== 1) {
                item.durationms = util.changeDuration(item.durationms / n)
                    // item.title = util.keyWord(item.title, keywords)
            } else {
                item.duration = util.changeDuration(item.duration / n)
            }
        })
    },
    // 关键词高亮
    keyword(res, keywords) {
        res.map(item => {
            // for (let i in item) {
            //     item[i]=
            // }
            // item.name = util.keyWord(item.title, keywords)
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

    searchs(keywords) {
        wx.showLoading({
            title: '加载中',
        });
        api.search(keywords, this.data.type, this.data.offset, this.data.limit).then(res => {
            wx.hideLoading();
            if (res.code === 200) {

                res.result = JSON.parse(util.keyWord(JSON.stringify(res.result), keywords))
                if (this.data.type === 1018) {
                    // this.keyword(res.result.video.videos, keywords)
                    this.dealTime(res.result.song.songs)
                    this.dealTime(res.result.album.albums)
                    this.delDuration(res.result.video.videos, 1000, keywords)
                } else if (this.data.type === 1) {
                    if (this.data.offset > 1) {
                        if (res.result.songs) {
                            res.result.songs = this.data.searchAll.songs.concat(res.result.songs)
                        } else {
                            res.result.songs = this.data.searchAll.songs
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',
                            });

                        }
                    }
                    if (!res.result.songCount && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                    }

                } else if (this.data.type === 10) {
                    if (this.data.offset > 1) {
                        if (res.result.albums) {
                            this.dealTime(res.result.albums)
                            res.result.albums = this.data.searchAll.albums.concat(res.result.albums)
                        } else {
                            res.result.albums = this.data.searchAll.albums
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',
                            });
                        }
                    }
                    if (!res.result.albumCount && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                        res.result.albums = this.data.searchAll.albums
                    }
                } else if (this.data.type === 100) {
                    if (this.data.offset > 1) {
                        if (res.result.artists) {
                            res.result.artists = this.data.searchAll.artists.concat(res.result.artists)
                        } else {
                            res.result.artists = this.data.searchAll.artists
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',

                            });

                        }
                    }
                    if (!res.result.artists && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                    }

                } else if (this.data.type === 1000) {
                    if (this.data.offset > 1) {
                        if (res.result.playlists) {
                            res.result.playlists = this.data.searchAll.playlists.concat(res.result.playlists)
                        } else {
                            res.result.playlists = this.data.searchAll.playlists
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',
                            });
                        }
                    }
                    if (!res.result.playlists && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                    }

                } else if (this.data.type === 1002) {

                    if (this.data.offset > 1) {
                        if (res.result.userprofiles) {
                            res.result.userprofiles = this.data.searchAll.userprofiles.concat(res.result.userprofiles)
                        } else {
                            res.result.userprofiles = this.data.searchAll.userprofiles
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',
                            });
                        }
                    }
                    if (!res.result.userprofiles && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                    }

                } else if (this.data.type === 1004) {
                    if (this.data.offset > 1) {
                        if (res.result.mvs) {
                            this.delDuration(res.result.mvs, 1)
                            res.result.mvs = this.data.searchAll.mvs.concat(res.result.mvs)
                        } else {
                            res.result.mvs = this.data.searchAll.mvs
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',

                            });

                        }
                    }
                    if (!res.result.mvs && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                    }

                } else if (this.data.type === 1006) {

                    if (this.data.offset > 1) {
                        if (res.result.songs) {
                            this.dealTime(res.result.songs)
                            res.result.songs = this.data.searchAll.songs.concat(res.result.songs)
                        } else {
                            res.result.songs = this.data.searchAll.songs
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',

                            });
                        }
                    }
                    if (!res.result.songs && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                    }

                } else if (this.data.type === 1009) {
                    // this.dealTime(res.result.songs)
                    if (this.data.offset > 1) {
                        if (res.result.djRadios) {
                            res.result.djRadios = this.data.searchAll.djRadios.concat(res.result.djRadios)
                        } else {
                            res.result.djRadios = this.data.searchAll.djRadios
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',

                            });

                        }
                    }
                    if (!res.result.djRadios && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                    }

                } else if (this.data.type === 1014) {

                    if (this.data.offset > 1) {
                        if (res.result.videos) {
                            this.delDuration(res.result.videos, 1000)
                            res.result.videos = this.data.searchAll.videos.concat(res.result.videos)
                        } else {
                            wx.showToast({
                                title: '没有更多数据了哟',
                                icon: 'none',

                            });

                        }
                    }
                    if (!res.result.videos && this.data.offset === 0) {
                        wx.showToast({
                            title: '暂无此数据',
                            icon: 'none',
                        });
                    }

                }
                this.setData({
                    searchAll: res.result,
                    offset: this.data.offset,
                })
                this.data.offset += this.data.limit
                console.log(res);
            }

        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    setStorage(a) {
        let arr = []
        let b = { keyword: a }
        if (wx.getStorageSync('searchHistory')) {
            let arr = wx.getStorageSync('searchHistory')
            if (!JSON.stringify(arr).includes(a)) {
                arr.unshift(b)
                this.store.data.searchHistory.unshift(b)
                wx.setStorageSync('searchHistory', arr);

            }
        } else {
            arr.unshift(b)
            this.store.data.searchHistory.unshift(b)
            wx.setStorageSync('searchHistory', arr);
        }
    },

    changeTabs(e) {
        let a = null
        if (isNaN(e.detail)) {
            a = e.detail.index
        } else {
            a = e.detail
        }
        this.setData({
            active: a,
            type: this.data.searchType[a],
            offset: 0,
            searchAll: {}

        })
        this.searchs(this.data.searchWord)
    },
    //音频播放结束
    songsEnd() {
        backSong.onPlay(() => {
            let a = wx.getStorageSync('songDetails')
            this.store.data.songDetails = wx.getStorageSync('songDetails')
        })
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
        this.getUserInfo()
        if (wx.getStorageSync('searchHistory')) {
            this.store.data.searchHistory = wx.getStorageSync('searchHistory')
        }




    },
    onReady: function() {

    },
    onShow: function() {
        let time = setInterval(() => {
            this.songsEnd()
        }, 1000);

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
    onPageScroll: function(e) {
        // console.log(e);
    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});