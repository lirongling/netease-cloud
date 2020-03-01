import store from '../../../store/index'
import create from '../../../utils/store/create'
create.Component(store, {
    use: ['mvDetails'],
    properties: {
        video: {
            type: Object,
            value: {},
        },
        type: {
            type: Number,
            value: 0,
        }

    },
    data: {

    },
    methods: {
        goDetails(e) {
            let a = e.currentTarget.dataset.id
            let video = this.data.video
            video.playCount = video.playTime
            video.duration = video.durationms
            this.store.data.mvDetails = video
                // item.duration = util.changeDuration(item.duration)
                // this.store.data.mvDetails = item
            wx.navigateTo({
                url: `/pages/audioDetails/audioDetails?id=${a}&type=${this.properties.type}`,
            });
        }
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {},
    moved: function() {

    },
    detached: function() {

    },
});