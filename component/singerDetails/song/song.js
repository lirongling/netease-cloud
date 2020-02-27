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
            this.store.data.songsList.unshift(item)

            this.getIsPlay(id)
        },
        getIsPlay(id) {
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
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: 'none',
                    });
                }
            }).catch(err => {
                wx.hideLoading();
                console.log(err);
            })
        },
        goSong(e) {
            let id = e.currentTarget.dataset.id
            this.store.data.songsList.unshift(e.currentTarget.dataset.item)
            song.getUrl();
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