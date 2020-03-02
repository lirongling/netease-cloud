//Component Object
Component({
    properties: {
        artist: {
            type: Array,
            value: [],
        },

    },
    data: {

    },
    methods: {
        singerDetails(e) {
            let id = e.currentTarget.dataset.id
            let name = e.currentTarget.dataset.name
            wx.navigateTo({
                url: `/pages/singerDetails/singerDetails?id=${id}&name=${name}`,

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