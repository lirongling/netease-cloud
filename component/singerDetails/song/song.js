import api from "../../../http/api";
import create from '../../../utils/store/create'
import store from '../../../store/index'
import song from '../../../utils/song'
const backSong = wx.getBackgroundAudioManager();

create.Component(store, {
    use: ['songsList', 'songDetails'],
    properties: {
        hotSongs: {
            type: Array,
            value: [],

        },

    },
    data: {

    },
    methods: {
        playMusic(e) {
            let id = e.currentTarget.dataset.id
            let item = e.currentTarget.dataset.item
            let flage = e.currentTarget.dataset.flage
            if (JSON.stringify(item.name).includes('span')) {
                let a = item.name.indexOf('>') + 1
                let b = item.name.lastIndexOf('<')
                item.name = item.name.slice(a, b)
            }
            let isCheck = this.store.data.songsList.some(item => {
                return item.id === id
            })
            if (!isCheck) {
                this.store.data.songsList.unshift(item)
            }
            this.getIsPlay(id, flage)
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
        goSong(e) {
            let id = e.currentTarget.dataset.id
            this.store.data.songsList.unshift(e.currentTarget.dataset.item)
            song.getUrl();
            setTimeout(() => {
                this.store.data.songDetails = wx.getStorageSync('songDetails')
            }, 3000)
            wx.navigateTo({
                url: `/pages/songDetails/songDetails?id=${id}`,
            });
        }
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {

    },
    moved: function() {

    },
    detached: function() {

    },
});