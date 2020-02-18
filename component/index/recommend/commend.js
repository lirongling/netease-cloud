//Component Object
Component({
    properties: {
        singData: {
            type: Object,
            value: {},
        },

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
            wx.navigateTo({
                url: `/pages/details/details?id=${a}`,

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