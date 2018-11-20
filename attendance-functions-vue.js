var attendance = new Vue({
    el: "#attendance",
    data: {
        members: [],

    },

    computed: {
        highAttendance() {
            var people = this.sortByKey(this.members, 'missed_votes_pct')
            var bestPeople = [];
            var counter = 0;
            var currentPercentage = (counter / people.length);
            var idealCount = people.length * .1

            for (i = 0; i < idealCount; i++) {

                if (people[i].missed_votes_pct !== 0) {
                    bestPeople.push(people[i])
                }
            }
            return bestPeople;
        },

        lowAttendance() {
            var people = this.sortByKey(this.members, 'missed_votes_pct')
            people.reverse();
            var worstPeople = [];
            var counter = 0;
            var currentPercentage = (counter / people.length);
            var idealCount = people.length * .1;

            for (i = 0; i < idealCount; i++) {
                if (people[i].missed_votes_pct !== 0) {
                    worstPeople.push(people[i])
                }
            }
            return worstPeople;
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
                if (array[i].votes_with_party_pct !== 0) {
                    totes += array[i].votes_with_party_pct;
                }

            }
            return (totes / array.length).toPrecision(4);
        }
    },

    created: function () {
        

            if (document.getElementById("senate") == null) {

                fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
                        headers: new Headers({
                            "X-API-Key": "VoUTxAXwkKdNuARhtuxtZnGwGaFZslYOMHD32Nw0"
                        })
                    })
                    .then(response => {

                        return response.json()
                    })
                    .then(data => {

                        this.members = data.results[0].members
                    })

            } else {
                fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
                        headers: new Headers({
                            "X-API-Key": "VoUTxAXwkKdNuARhtuxtZnGwGaFZslYOMHD32Nw0"
                        })
                    })
                    .then(response => {

                        return response.json()
                    })
                    .then(data => {

                        this.members = data.results[0].members
                    })
            }
        }
})


