//Component Object
Component({
    properties: {
        playlist: {
            type: Array,
            value: [],
        },

    },
    data: {

    },
    methods: {
goDetails(e){
 let a = e.currentTarget.dataset.id
  wx.navigateTo({
                    url: `/pages/details/details?id=${a}&number=${1}`,
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