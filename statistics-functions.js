function listOfMembers(partyInitial) {
    var list_of_democrats = []
    var list_of_republicans = []
    var list_of_independents = []

    if (partyInitial == "D") {
        for (var i = 0; i < data.results[0].members.length; i++) {
            if (data.results[0].members[i].party == "D") {
                list_of_democrats.push(data.results[0].members[i])
            }
        }
        return list_of_democrats
        console.log(list_of_democrats[3])
    } else if (partyInitial == "R") {
        for (var i = 0; i < data.results[0].members.length; i++) {
            if (data.results[0].members[i].party == "R") {
                list_of_republicans.push(data.results[0].members[i])
            }
        }
        return list_of_republicans
    } else if (partyInitial == "I") {
        for (var i = 0; i < data.results[0].members.length; i++) {
            if (data.results[0].members[i].party == "D") {
                list_of_independents.push(data.results[0].members[i])
            }
        }
        return list_of_independents
    }
}



function AverageVotesWithParty() {

    

}

//var statistics = {
//
//    "democrats": {
//        "list_of_democrats": listOfMembers("D"),
//        "number_of_democrats": listOfMembers("D").length,
//        "average_votes_with_party": AverageVotesWithParty
//
//    },
//    "republicans": {
//        "list_of_republicans": listOfMembers("R"),
//        "number_of_republicans": listOfMembers("R").length
//    },
//    "independents": {
//        "list_of_independents": listOfMembers("I"),
//        "number_of_independents": listOfMembers("I").length
//    }
//}

