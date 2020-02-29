import create from '../../../utils/store/create'
import store from '../../../store/index'
import song from '../../../utils/song'
import api from "../../../http/api";
const backSong = wx.getBackgroundAudioManager();
create.Component(store, {
    use: ['songsList', 'songDetails'],
    properties: {
        songs: {
            type: Array,
            value: [],
        },

    },
    data: {

    },
    methods: {
        play(e) {
            let id = e.currentTarget.dataset.id
            let item = e.currentTarget.dataset.item
            let flage = false
            item = {
                id: item.id,
                name: item.name,
                ar: item.artists
            }
            store.data.songsList.map((items, index) => {
                if (items.id === id) {
                    this.store.data.songsList.splice(index, 1)
                }
            })
            this.store.data.songsList.unshift(item)
            this.getIsPlay(id, flage, item)
        },
        getIsPlay(id, flage, item) {
            wx.showLoading({
                title: '加载中',
            });
            api.getIsPlay(id).then(res => {
                wx.hideLoading();
                if (res.success) {
                    song.getUrl();
                    wx.showToast({
                        title: res.message,
                        icon: 'none',
                    });

                    if (flage) {
                        wx.navigateTo({
                            url: `/pages/songDetails/songDetails?id=${id}`,
                        });
                    }
                    setTimeout(() => {
                        console.log(item);
                        if (store.data.songDetails.name == null) {
                            this.store.data.songDetails = item
                            backSong.coverImgUrl = item.ar[0].img1v1Url
                            backSong.title = item.name
                        }
                    }, 5000)

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