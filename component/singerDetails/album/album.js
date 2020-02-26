//Component Object
Component({
    properties: {
        myProperty: {
            type: String,
            value: '',
            observer: function() {}
        },
        hotAlbums: {
            type: Array,
            value: [],
        }

    },
    data: {

    },
    methods: {
goDetails(e){
 let a = e.currentTarget.dataset.id
  wx.navigateTo({
                      url: `/pages/albumDetails/albumDetails?id=${a}&number=${2}`,
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