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
                bestPeople.push(people[i])
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
                worstPeople.push(people[i])
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
        totalPercentage(array){
            var totes = 0;
            for (i=0; i<array.length; i++){
                totes+=array[i].votes_with_party_pct;
            }
            return (totes/array.length).toPrecision(4);
        }
    }
})


if (document.getElementById("senate") == null) {

    fetch('https://api.propublica.org/congress/v1/115/house/members.json', {
            headers: new Headers({
                "X-API-Key": "VoUTxAXwkKdNuARhtuxtZnGwGaFZslYOMHD32Nw0"
            })
        })
        .then(function (response) {

            return response.json()
        })
        .then(function (data) {

            attendance.members = data.results[0].members
        })


} else {
    fetch('https://api.propublica.org/congress/v1/115/senate/members.json', {
            headers: new Headers({
                "X-API-Key": "VoUTxAXwkKdNuARhtuxtZnGwGaFZslYOMHD32Nw0"
            })
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            attendance.members = data.results[0].members
        })
}


function generateStatistics(data) {

    return statistics = {

        "parties": [

            {
                "numberInParty": listOfMembers("D", data).length,
                "list_of_members": listOfMembers("D", data),
                "votedWithParty": AverageVotesWithParty("D", data),
                "leastLoyal": leastLoyal("D", data),
                "mostLoyal": mostLoyal("D", data)
        },
            {
                "numberInParty": listOfMembers("R", data).length,
                "list_of_members": listOfMembers("R", data),
                "votedWithParty": AverageVotesWithParty("R", data),
                "leastLoyal": leastLoyal("R", data),
                "mostLoyal": mostLoyal("R", data)
        }
    ]
    }

}


function listOfMembers(partyInitial, data) {

    var filteredByParty = data.results[0].members.filter(function (person) {

        return person.party == partyInitial;
    });
    return filteredByParty;

}

function AverageVotesWithParty(partyInitial, data) {
    var totalVotePercentage = 0;

    var filteredByParty = listOfMembers(partyInitial, data)

    for (i = 0; i < filteredByParty.length; i++) {
        totalVotePercentage += filteredByParty[i].votes_with_party_pct
    }
    return totalVotePercentage / filteredByParty.length
}

function leastLoyal(partyInitial, data) {

    var filteredByParty = listOfMembers(partyInitial, data);
    var people = sortByKey(filteredByParty, 'missed_votes_pct')
    people.reverse()
    var worstPeople = []
    var counter = 0;
    var currentPercentage = (counter / people.length)
    var idealCount = people.length * .1

    for (i = 0; i < idealCount; i++) {
        worstPeople.push(people[i])
    }

    return worstPeople;
}

function mostLoyal(partyInitial, data) {

    var filteredByParty = listOfMembers(partyInitial, data);
    var people = sortByKey(filteredByParty, 'missed_votes_pct')
    var bestPeople = []
    var counter = 0;
    var currentPercentage = (counter / people.length)
    var idealCount = people.length * .1

    for (i = 0; i < idealCount; i++) {
        bestPeople.push(people[i])
    }
    return bestPeople
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
