import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
import song from '../../utils/song'
create.Page(store, {
    use: ['songsList'],
    data: {
        id: null,
        number: 0,
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
    // 获取歌单详情
    getPlaylistDetails(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getPlaylistDetails(id).then(res => {
            wx.hideLoading();

            if (res.code === 200) {

                if (!res.playlist.backgroundCoverUrl) {
                    res.playlist.backgroundCoverUrl = api.background()
                }
                this.data.selectArr[0].name = res.playlist.commentCount
                this.data.selectArr[1].name = res.playlist.shareCount
                this.setData({
                    playlist: res.playlist,
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
    // 获取新碟详情
    getAlbumDetails(id) {
        wx.showLoading({
            title: '加载中',
        });
        api.getAlbumDetails(id).then(res => {
            wx.hideLoading();
            console.log(res);
            // if (res.code === 200) {

            //     if (!res.playlist.backgroundCoverUrl) {
            //         res.playlist.backgroundCoverUrl = api.background()
            //     }
            //     this.data.selectArr[0].name = res.playlist.commentCount
            //     this.data.selectArr[1].name = res.playlist.shareCount
            //     this.setData({
            //         playlist: res.playlist,
            //         selectArr: this.data.selectArr
            //     })
            //     console.log(this.data.playlist);
            //     setTimeout(() => {
            //         this.getHeight()
            //     }, 1000)
            // }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    lower() {

    },
    play() {
        // new Set(arr)
        let a = this.data.playlist.tracks
        let arr = a.concat(store.data.songsList)
        this.store.data.songsList = arr.filter(function(item, index, arr) {
            return arr.indexOf(item) === index
        })
        console.log(store.data.songsList[0].id);
        this.getIsPlay(this.store.data.songsList[0].id, false)
    },
    getIsPlay(id, flage) {
        wx.showLoading({
            title: '加载中',
        });
        api.getIsPlay(id).then(res => {
            wx.hideLoading();
            if (res.success) {
                wx.showToast({
                    title: res.message,
                    icon: 'none',
                });
                song.getUrl();
                if (flage) {
                    wx.navigateTo({
                        url: `/pages/songDetails/songDetails?id=${id}`,
                    });
                }
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
    //options(Object)
    onLoad: function(options) {
        let number = options.number
        if (number == 1) {
            this.getPlaylistDetails(options.id)
        } else if (number == 2) {
            this.getAlbumDetails(options.id)
        }
        this.setData({
            id: options.id,
            number: options.number
        })



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