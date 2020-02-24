//Component Object
Component({
    properties: {
        video: {
            type: Object,
            value: {},
        },

    },
    data: {

    },
    methods: {

    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {
        setTimeout(() => {
            console.log(this.properties.video);

        }, 1000)
    },
    moved: function() {

    },
    detached: function() {

    },
});