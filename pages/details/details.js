import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    data: {
        id: null,
        playlist: {},
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
                this.setData({
                    playlist: res.playlist
                })
                console.log(this.data.playlist);

            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        })
    },
    //options(Object)
    onLoad: function(options) {
        this.getPlaylistDetails(options.id)
        this.setData({
            id: options.id
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