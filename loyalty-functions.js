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

            var someStats = generateStatistics(data)
            
            atGlanceTable(someStats)
            leastLoyalTable(someStats)
            mostLoyalTable(someStats)
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
        
        var someStats = generateStatistics(data)
        
       
            atGlanceTable(someStats)
            leastLoyalTable(someStats)
            mostLoyalTable(someStats)
        })
}


function generateStatistics(data){
           return statistics = {

                "parties": [

                    {
                        "numberInParty": listOfMembers("D", data).length,
                        "list_of_members": listOfMembers("D", data),
                        "votedWithParty": AverageVotesWithParty("D", data),
                        "leastLoyal": worstTen("D", data),
                        "mostLoyal": bestTen("D", data)
        },
                    {
                        "numberInParty": listOfMembers("R", data).length,
                        "list_of_members": listOfMembers("R", data),
                        "votedWithParty": AverageVotesWithParty("R", data),
                        "leastLoyal": worstTen("R", data),
                        "mostLoyal": bestTen("R", data)
        },
                    {
                        "numberInParty": listOfMembers("I", data).length,
                        "list_of_members": listOfMembers("I", data),
                        "votedWithParty": AverageVotesWithParty("I", data),
                        "leastLoyal": worstTen("I", data),
                        "mostLoyal": bestTen("I", data)
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

function worstTen(partyInitial, data) {

    var filteredByParty = listOfMembers(partyInitial, data);
    var people = sortByKey(filteredByParty, 'votes_with_party_pct')
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

function bestTen(partyInitial, data) {

    var filteredByParty = listOfMembers(partyInitial, data);
    var people = sortByKey(filteredByParty, 'votes_with_party_pct')
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

function atGlanceTable(data) {
    var atGlanceBody = document.getElementById("atGlance")
    atGlanceBody.innerHTML = ""

    for (var i = 0; i < 3; i++) {
        var row = atGlanceBody.insertRow(i)

        var x = 0;

        while (x < 2) {

            var column1 = row.insertCell(x);
            if (x == i) {
                column1.innerHTML = "democrats"
            } else if (i == 1) {
                column1.innerHTML = "republicans"
            } else if (i == 2) {
                column1.innerHTML = "independents"
            }

            x++
            var column2 = row.insertCell(x);
            column2.innerHTML = statistics.parties[i].numberInParty
            x++
            var column3 = row.insertCell(x);
            column3.innerHTML = statistics.parties[i].votedWithParty
            x++
        }
    }
}

function leastLoyalTable(data) {
    var leastLoyal = document.getElementById("leastLoyal")
    leastLoyal.innerHTML = ""

    for (var i = 0; i < statistics.parties[0].leastLoyal.length; i++) {
        var row = leastLoyal.insertRow(i)

        var x = 0;

        while (x < 2) {

            var column1 = row.insertCell(x);
            column1.innerHTML = statistics.parties[1].leastLoyal[i].first_name + " " + statistics.parties[1].leastLoyal[i].last_name
            x++
            var column2 = row.insertCell(x);
            column2.innerHTML = statistics.parties[1].leastLoyal[i].total_votes
            x++
            var column3 = row.insertCell(x);
            column3.innerHTML = statistics.parties[1].leastLoyal[i].votes_with_party_pct
            x++
        }
    }
}

function mostLoyalTable(data) {
    var atGlanceBody = document.getElementById("mostLoyal")
    mostLoyal.innerHTML = ""

    for (var i = 0; i < statistics.parties[0].leastLoyal.length; i++) {
        var row = mostLoyal.insertRow(i)

        var x = 0;

        while (x < 2) {

            var column1 = row.insertCell(x);
            column1.innerHTML = statistics.parties[1].mostLoyal[i].first_name + " " + statistics.parties[1].mostLoyal[i].last_name
            x++
            var column2 = row.insertCell(x);
            column2.innerHTML = statistics.parties[1].mostLoyal[i].total_votes
            x++
            var column3 = row.insertCell(x);
            column3.innerHTML = statistics.parties[1].mostLoyal[i].votes_with_party_pct
            x++
        }
    }
}
