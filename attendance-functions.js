var statistics = {

    "parties": [

        {
            "numberInParty": listOfMembers("D").length,
            "list_of_members": listOfMembers("D"),
            "votedWithParty": AverageVotesWithParty("D"),
            "leastLoyal": leastLoyal("D"),
            "mostLoyal": mostLoyal("D")
        },
        {
            "numberInParty": listOfMembers("R").length,
            "list_of_members": listOfMembers("R"),
            "votedWithParty": AverageVotesWithParty("R"),
            "leastLoyal": leastLoyal("R"),
            "mostLoyal": mostLoyal("R")
        }
    ]
}

function listOfMembers(partyInitial) {

    var filteredByParty = data.results[0].members.filter(function (person) {

        return person.party == partyInitial;
    });
    return filteredByParty;


}

function AverageVotesWithParty(partyInitial) {
    var totalVotePercentage = 0;

    var filteredByParty = listOfMembers(partyInitial)

    for (i = 0; i < filteredByParty.length; i++) {
        totalVotePercentage += filteredByParty[i].votes_with_party_pct
    }
    return totalVotePercentage / filteredByParty.length
}

function leastLoyal(partyInitial) {

    var filteredByParty = listOfMembers(partyInitial);
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

function mostLoyal(partyInitial) {

    var filteredByParty = listOfMembers(partyInitial);
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

function atGlanceTable() {
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
            if (i==2){
                column2.innerHTML = "No members in current congress"
               
            } else {
                column2.innerHTML = statistics.parties[i].numberInParty
            }
            x++
            var column3 = row.insertCell(x);
            if (i==2){
                column3.innerHTML = "No members in current congress"
               
            } else {
                 column3.innerHTML = statistics.parties[i].votedWithParty
            }
            x++
        }
    }
}

function leastEngagedTable() {
    var leastEngaged = document.getElementById("leastEngaged")
    leastEngaged.innerHTML = ""

    for (var i = 0; i < statistics.parties[0].leastLoyal.length; i++) {
        var row = leastEngaged.insertRow(i)

        var x = 0;

        while (x < 2) {

            var column1 = row.insertCell(x);
            column1.innerHTML = statistics.parties[1].leastLoyal[i].first_name + " " + statistics.parties[1].leastLoyal[i].last_name
            x++
            var column2 = row.insertCell(x);
            column2.innerHTML = statistics.parties[1].leastLoyal[i].missed_votes
            x++
            var column3 = row.insertCell(x);
            column3.innerHTML = statistics.parties[1].leastLoyal[i].missed_votes_pct
            x++
        }
    }
}

function mostEngagedTable() {
    var mostEngaged = document.getElementById("mostEngaged")
    mostEngaged.innerHTML = ""

    for (var i = 0; i < statistics.parties[0].leastLoyal.length; i++) {
        var row = mostEngaged.insertRow(i)

        var x = 0;

        while (x < 2) {

            var column1 = row.insertCell(x);
            column1.innerHTML = statistics.parties[1].mostLoyal[i].first_name + " " + statistics.parties[1].mostLoyal[i].last_name
            x++
            var column2 = row.insertCell(x);
            column2.innerHTML = statistics.parties[1].mostLoyal[i].missed_votes
            x++
            var column3 = row.insertCell(x);
            column3.innerHTML = statistics.parties[1].mostLoyal[i].missed_votes_pct
            x++
        }
    }
}

atGlanceTable()
mostEngagedTable()
leastEngagedTable()
console.log(listOfMembers("D").length)
console.log(listOfMembers("D").length)