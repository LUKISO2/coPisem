window.addEventListener("load", async () => {
    async function getJsonFromUrl(theUrl) {
        let response = await fetch("https://api.jsonstorage.net/v1/json/81b5d14c-0fe3-4cac-8fec-4f7f954630d0/c24ccd0e-67d3-4fc3-9756-267a4c4f6c0f", {method: "GET"});
        return await response.json();
    }

    var builded, missing, dict, date, prefix;
    dict = await getJsonFromUrl("https://api.jsonstorage.net/v1/json/81b5d14c-0fe3-4cac-8fec-4f7f954630d0/c24ccd0e-67d3-4fc3-9756-267a4c4f6c0f")

    function trsDic(x) {
        return x.replace("Mon", "Pond\u011bl\u00ed").replace("Tue", "\u00dater\u00fd").replace("Wed", "St\u0159eda").replace("Thu", "\u010ctvrtek").replace("Fri", "P\u00e1tek").replace("Sat", "Sobota").replace("Sun", "Ned\u011ble");
    }

    missing = "<div id=\"nothing\"><i>\u017d\u00e1dn\u00e9 napl\u00e1novan\u00e9 testy.</i></div>";

    if (Date.now()/1000 > dict.lastUpdate + 86400) {
        document.getElementById('error').innerHTML = `<p><label class="errorText">Chyba backendu, ub\u011bhlo v\u00edce ne\u017e 24 hodin od posledn\u00ed aktualizace. Kontaktujte LUKISO2 pro opravu!</label></p>`;
    }

    if (dict.error === true) {
        document.getElementById('error').innerHTML = `<p><label class="errorText">${dict.errMsg}</label></p>`;
    }

    if (dict.today.length > 0) {
        builded = "<ul>";

        for (var i, iter = 0; iter < dict.today.length; iter += 1) {
            builded += "<li>" + dict.today[iter].info + "</li>";
        }

        builded += "</ul>";
    } else {
        builded = missing;
    }
    document.getElementById('today').innerHTML = builded;

    if (dict.tomorrow.length > 0) {
        builded = "<ul>";

        for (var i, iter = 0; iter < dict.tomorrow.length; iter += 1) {
            builded += "<li>" + dict.tomorrow[iter].info + "</li>";
        }

        builded += "</ul>";
    } else {
        builded = missing;
    }
    document.getElementById('tomorrow').innerHTML = builded;

    if (dict.week.length > 0) {
        builded = "<ul>";

        for (var i, iter = 0; iter < dict.week.length; iter += 1) {
            date = new Date(dict.week[iter].date*1000).toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3');
            prefix = trsDic(new Date(dict.week[iter].date*1000).toString().split(" ")[0]);
            builded += "<li>" + prefix + ' ' + date + ": " + dict.week[iter].info + "</li>";
        }

        builded += "</ul>";
    } else {
        builded = missing;
    }
    document.getElementById('week').innerHTML = builded;

    if (dict.later.length > 0) {
        builded = "<ul>";

        for (var i, iter = 0; iter < dict.later.length; iter += 1) {
            date = new Date(dict.later[iter].date*1000).toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3');
            prefix = trsDic(new Date(dict.later[iter].date*1000).toString().split(" ")[0]);
            builded += "<li>" + prefix + ' ' + date + ": " + dict.later[iter].info + "</li>";
        }

        builded += "</ul>";
    } else {
        builded = missing;
    }
    document.getElementById('later').innerHTML = builded;
});
