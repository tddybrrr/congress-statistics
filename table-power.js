
if (document.getElementById("senate") == null){
    
    fetch('https://api.propublica.org/congress/v1/115/house/members.json', {
        headers: new Headers({
            "X-API-Key": "VoUTxAXwkKdNuARhtuxtZnGwGaFZslYOMHD32Nw0"
        })
    })
    .then(function (response) {

        return response.json()
    })
    .then(function (data) {
        activateListeners(data)
        printPosts(data)
        initialTable(data)
        generateHeader()
        generateStateList()
    })

    
} else{
    fetch('https://api.propublica.org/congress/v1/115/senate/members.json', {
        headers: new Headers({
            "X-API-Key": "VoUTxAXwkKdNuARhtuxtZnGwGaFZslYOMHD32Nw0"
        })
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        activateListeners(data)
        printPosts(data)
        initialTable(data)
        generateHeader()
        generateStateList()
    })
}


function activateListeners(data) {
    document.querySelector("#R").addEventListener('change', function(){
                                myFunction(data)                  
                                                  })
    document.querySelector("#D").addEventListener('change', function(){
                                myFunction(data)                  
                                                  })
    document.querySelector("#I").addEventListener('change', function(){
                                myFunction(data)                  
                                                  })
    document.querySelector("#states").addEventListener('change', function(){
                                myFunction(data)                  
                                                  })
}

function printPosts(someShit) {
    console.log(someShit.results[0].members[2])
}


var tableDaddy = document.getElementById("tableZone");
var table = document.createElement("table");
tableDaddy.appendChild(table);

function initialTable(data) {
    for (i = 0; i < data.results[0].num_results; i++) {

        var row = table.insertRow(i)

        var x = 0;

        while (x < 4) {

            var a = document.createElement('a')
            var linkText = document.createTextNode(data.results[0].members[i].first_name + " " + replacer(data.results[0].members[i].middle_name) + " " + data.results[0].members[i].last_name)
            a.appendChild(linkText)
            a.title = "senator's personal website";
            a.href = data.results[0].members[i].url

            var column1 = row.insertCell(x);
            column1.appendChild(a)
            x++

            var column2 = row.insertCell(x);
            column2.innerHTML = (data.results[0].members[i].party)

            x++

            var column3 = row.insertCell(x);
            column3.innerHTML = (data.results[0].members[i].state)
            x++

            var column4 = row.insertCell(x);
            column4.innerHTML = (data.results[0].members[i].seniority)
            x++

            var column5 = row.insertCell(x);
            column5.innerHTML = (data.results[0].members[i].votes_with_party_pct + "%")

        }


    }
}


function myFunction(data) {

    var selectedParties = Array.from(document.querySelectorAll('input[name=politcal_party]:checked')).map(elt => elt.value)

    var selectedState = document.querySelector('#states').value

    if ((selectedState == "returnAll") && (selectedParties.length == 3)) {
        table.innerHTML = ""
        initialTable(data)
        generateHeader()
        return;
    } else if ((selectedState == "returnAll") && (selectedParties.length == 2 || selectedParties.length == 1)) {

        table.innerHTML = ""

        for (i = 0; i < data.results[0].num_results; i++) {

            var row = table.insertRow(i)

            if (selectedParties.indexOf(data.results[0].members[i].party) !== -1) {

                var x = 0;

                while (x < 4) {

                    var a = document.createElement('a')
                    var linkText = document.createTextNode(data.results[0].members[i].first_name + " " + replacer(data.results[0].members[i].middle_name) + " " + data.results[0].members[i].last_name)
                    a.appendChild(linkText)
                    a.title = "senator's personal website";
                    a.href = data.results[0].members[i].url

                    var column1 = row.insertCell(x);
                    column1.appendChild(a)
                    x++

                    var column2 = row.insertCell(x);
                    column2.innerHTML = (data.results[0].members[i].party)
                    x++

                    var column3 = row.insertCell(x);
                    column3.innerHTML = (data.results[0].members[i].state)
                    x++

                    var column4 = row.insertCell(x);
                    column4.innerHTML = (data.results[0].members[i].seniority)
                    x++

                    var column5 = row.insertCell(x);
                    column5.innerHTML = (data.results[0].members[i].votes_with_party_pct + "%")

                }

            }

        }
        generateHeader()
        return;
    } else {
        table.innerHTML = ""
        for (i = 0; i < data.results[0].num_results; i++) {

            var row = table.insertRow(i)
            if ((selectedParties.indexOf(data.results[0].members[i].party) !== -1) && (selectedState.indexOf(data.results[0].members[i].state) !== -1)) {

                var x = 0;

                while (x < 4) {

                    var a = document.createElement('a')
                    var linkText = document.createTextNode(data.results[0].members[i].first_name + " " + replacer(data.results[0].members[i].middle_name) + " " + data.results[0].members[i].last_name)
                    a.appendChild(linkText)
                    a.title = "senator's personal website";
                    a.href = data.results[0].members[i].url

                    var column1 = row.insertCell(x);
                    column1.appendChild(a)
                    x++

                    var column2 = row.insertCell(x);
                    column2.innerHTML = (data.results[0].members[i].party)
                    x++

                    var column3 = row.insertCell(x);
                    column3.innerHTML = (data.results[0].members[i].state)
                    x++

                    var column4 = row.insertCell(x);
                    column4.innerHTML = (data.results[0].members[i].seniority)
                    x++

                    var column5 = row.insertCell(x);
                    column5.innerHTML = (data.results[0].members[i].votes_with_party_pct + "%")

                }
            }

        }

    }

    generateHeader()

}

function headerNames(value) {
    if (value == 0) {
        return "full name"
    } else if (value == 1) {
        return "politcal party"
    } else if (value == 2) {
        return "state"
    } else if (value == 3) {
        return "senitory (years)"
    } else if (value == 4) {
        return "votes within party"
    }
}

function generateHeader() {
    var header = table.createTHead();
    var rowHead = header.insertRow(0);
    for (y = 0; y < 5; y++) {
        var cellular = rowHead.insertCell(y);
        cellular.innerHTML = headerNames(y);
    }
}

function generateStateList() {
    var selectOption = document.createElement("option");
    selectOption.text = "select";
    selectOption.value = "returnAll";
    var select = document.getElementById("states");
    select.appendChild(selectOption);
    for (var i = 0; i < usStates.length; i++) {
        var option = document.createElement("option");
        option.text = usStates[i].name;
        option.value = usStates[i].abbreviation;
        var select = document.getElementById("states");
        select.appendChild(option);
    }
}

function replacer(value) {
    if (value === null) {
        return " ";
    } else {
        return value;
    }
}


function redify() {
    for (i = 0; i < rows.length; i++) {
        cells = rows[i].getElementsByTagName('td');
        if (cells[1].innerHTML == 'R')
            rows[i].className = "red";

        if (cells[1].innerHTML == 'I')
            rows[i].className = "grey";
    }
}
