export default {
    name: 'tvshow',
    template: `
        <div class="movCon" v-bind:class="{ kidTv : kid }">
            <div class="mov">
                <div class="imgWrapper">
                    <div class="imgHov">
                        <button v-if="authenticatedCheck = true">Play</button>
                        <button @click="openTvBan" :id="id">SEE MORE INFO</button>
                    </div>
                    <img :src="'public/images/' + img" alt="cover image">
                </div>
                <div class="content">
                    <h3>{{ items.name }}</h3>
                    <p><span class="mpaa">{{ items.mpaa }}</span> {{ items.length }} min</p>
                    <p>{{ items.year }} | {{ items.genre }}</p>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            allitems: [],
            authenticatedCheck: this.$root.authenticated,
            kid: false
        }
    },

    created: function() {
        this.fetchAll();
        if(this.$root.permission == 1) {
            this.kid = true;
        }
    },

    methods: {
        fetchAll() {
            
            if(this.$root.permission == 1) {
                let url = './includes/admin/index.php?all_k_items=true&per=1&tbl=tbl_tvshow';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.allitems = data;
                })
                .catch((err) => console.log(err))
            } else {
                let url = './includes/admin/index.php?all_items=true&tbl=tbl_tvshow';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.allitems = data;
                })
                .catch((err) => console.log(err))
            }
        }
    }
}