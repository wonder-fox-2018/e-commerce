Vue.component("vote", {
    data: function() {
        return {
            like_: this.like,
            dislike_: this.dislike,
        }
    },

    props: {
        like: {
            type: [String, Number],
            default: 0
        },
        dislike: {
            type: [String, Number],
            default: 0
        },
        item: {
            type: Object
        }
    },

    template: `<div class="tm-voteing">
    <span class="tm-vote tm-vote-like"
     @click="onVote(item, \'like\')">
     <span class="fa tm-icon"></span>
     <span class="tm-vote-count">{{like_}}</span>
     </span>
     <span class="tm-vote tm-vote-dislike" 
     @click="onVote(item, \'dislike\')">
     <span class="fa tm-icon"></span>
     <span class="tm-vote-count">{{dislike_}}</span>
     </span></div>`,

    methods: {
        onVote: function(data, action) {
            var $this = this;
            // instead of jquery ajax can be axios or vue-resource
            $.ajax({
                method: "POST",
                url: "/api/vote/vote",
                data: {id: data.id, action: action},
                success: function(response) {
                    if(response.status === "insert") {
                        $this[action + "_"] = Number($this[action + "_"]) + 1;
                    } else {
                        $this[action + "_"] = Number($this[action + "_"]) - 1;
                    }
                },
                error: function(response) {
                    console.error(response);
                }
            });
        }
    }
});