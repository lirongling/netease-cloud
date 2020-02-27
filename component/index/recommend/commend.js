import create from '../../../utils/store/create'
import store from '../../../store/index'
import song from '../../../utils/song'
create.Component(store, {
    use: ['songsList', 'songDetails'],
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
                let id = e.currentTarget.dataset.id
                this.store.data.songsList.unshift(e.currentTarget.dataset.item)
                song.getUrl();
                wx.navigateTo({
                    url: `/pages/songDetails/songDetails?id=${id}`,
                });
            } else if (b == 5 || b == 6) {
                wx.navigateTo({
                    url: `/pages/djDetails/djDetails?id=${a}&number=${b}`,
                });
            }


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