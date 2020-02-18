import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['navHeight', 'navTop', 'navRight'],
    properties: {
        title: {
            type: String,
            value: '详情',

        },

    },
    data: {

    },
    methods: {
        back() {
            wx.navigateBack({
                delta: 1
            })
        },
        home() {
            wx.switchTab({
                url: '/pages/index/index',

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