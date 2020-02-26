import api from "../../../http/api";
import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['songsList'],
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
            console.log(e.currentTarget.dataset.item);
            this.store.data.songsList.unshift(e.currentTarget.dataset.item)
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