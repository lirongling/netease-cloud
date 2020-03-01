import create from '../../../utils/store/create'
import store from '../../../store/index'
import song from '../../../utils/song'
import api from "../../../http/api";
import util from '../../../utils/util'
create.Component(store, {
    use: ['songsList', 'songDetails', 'mvDetails'],
    properties: {
        singData: {
            type: Object,
            value: {},
        },
        number: {
            type: Number,
            value: 1
        }

    },
    data: {
        select: 0
    },
    methods: {
        selectIdx(e) {
            let a = e.currentTarget.dataset.index
            if (this.data.select !== a) {
                this.triggerEvent('selects', a)
                this.setData({
                    select: a
                })
            }
        },
        goDetails(e) {
            let a = e.currentTarget.dataset.id
            let b = this.properties.number + this.data.select
            let item = e.currentTarget.dataset.item
                // albumDetails
            if (b == 1) {
                wx.navigateTo({
                    url: `/pages/details/details?id=${a}&number=${b}`,
                });
            } else if (b == 2) {
                wx.navigateTo({
                    url: `/pages/albumDetails/albumDetails?id=${a}&number=${b}`,
                });
            } else if (b == 3) {
                let id = a
                let flage = true
                if (JSON.stringify(item.name).includes('span')) {
                    let a1 = item.name.indexOf('>') + 1
                    let b1 = item.name.lastIndexOf('<')
                    item.name = item.name.slice(a1, b1)
                }
                store.data.songsList.map((items, index) => {
                    if (items.id === id) {
                        this.store.data.songsList.splice(index, 1)
                    }
                })
                this.store.data.songsList.unshift(item)
                this.getIsPlay(id, flage)
            } else if (b == 4) {
                item.duration = util.changeDuration(item.duration)
                this.store.data.mvDetails = item
                wx.navigateTo({
                    url: `/pages/audioDetails/audioDetails?id=${a}&type=0`,
                });
            } else if (b == 5 || b == 6) {
                wx.navigateTo({
                    url: `/pages/djDetails/djDetails?id=${a}&number=${b}`,
                });
            }
        },
        getIsPlay(id, flage) {
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