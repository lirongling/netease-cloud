import store from '../../../store/index'
import create from '../../../utils/store/create'
import util from '../../../utils/util'
create.Component(store, {
    use: ['mvDetails'],
    properties: {
        mvs: {
            type: Array,
            value: [],

        },

    },
    data: {

    },
    methods: {
        goDetails(e) {
            let a = e.currentTarget.dataset.id
            let item = e.currentTarget.dataset.item
            if (typeof item.duration) {
                item.duration = util.changeDuration(item.duration)
            }
            this.store.data.mvDetails = item
                // item.duration = util.changeDuration(item.duration)
                // this.store.data.mvDetails = item
            wx.navigateTo({
                url: `/pages/audioDetails/audioDetails?id=${a}&type=0`,
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