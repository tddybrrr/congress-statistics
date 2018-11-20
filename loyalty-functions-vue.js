var loyalty = new Vue({
    el: "#loyality",
    data: {
        members: [],

    },

    computed: {
        loyalSenators() {
            var people = this.sortByKey(this.members, 'votes_with_party_pct')
            var bestPeople = []
            var counter = 0;
            var currentPercentage = (counter / people.length)
            var idealCount = people.length * .1

            for (i = 0; i < idealCount; i++) {
                if (people[i].total_votes > 0){
                    bestPeople.push(people[i])
                }
                
            }
           
            return bestPeople;
        },

        unloyalSenators() {
            var people = this.sortByKey(this.members, 'votes_with_party_pct');
            people.reverse();
            var bestPeople = [];
            var counter = 0;
            var currentPercentage = (counter / people.length);
            var idealCount = people.length * .1;

            for (i = 0; i < idealCount; i++) {
                if (people[i].total_votes > 0){
                    bestPeople.push(people[i])
                }
            }
             
            return bestPeople;
        },
        totalRepublicans() {
            return this.members.filter(each => {
                return each.party == "R"
            })
        },
        totalDemocrats() {
            return this.members.filter(each => {
                return each.party == "D"
            })
        },
        totalIndependents() {
            return this.members.filter(each => {
                return each.party == "I"
            })
        }
    },

    methods: {
        sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        },
        totalPercentage(array) {
            var totes = 0;
            for (i = 0; i < array.length; i++) {
                totes += array[i].votes_with_party_pct;
            }
            return (totes / array.length).toPrecision(4);
        }
    }
})


if (document.getElementById("senate") == null) {

    fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
            headers: new Headers({
                "X-API-Key": "VoUTxAXwkKdNuARhtuxtZnGwGaFZslYOMHD32Nw0"
            })
        })
        .then(function (response) {

            return response.json()
        })
        .then(function (data) {

            loyalty.members = data.results[0].members
        })

} else {
    fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
            headers: new Headers({
                "X-API-Key": "VoUTxAXwkKdNuARhtuxtZnGwGaFZslYOMHD32Nw0"
            })
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            loyalty.members = data.results[0].members

        })
}
