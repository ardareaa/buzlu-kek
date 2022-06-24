function checkPage() {
    var hash = window.location.hash;
    var path;
    if (hash.startsWith("#!")) {
        path = hash.substr(2);
        while (path.startsWith('//')) path = path.substr(1);
    } else {
        path = "/home";
    }

    if (window.XMLHttpRequest) { // IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
        xmlhttp = new XMLHttpRequest();
    } else { // IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200)
                document.querySelector("#content").innerHTML = xmlhttp.responseText;
            else if (xmlhttp.status == 404)
                document.querySelector("#content").innerHTML = "Aradığın sayfa bulunamadı!";
            else
                document.querySelector("#content").innerHTML = "Sunucu hatası! (" + xmlhttp.status + ")";


            [...document.querySelectorAll("#content > *")].forEach(item => {
                if (item.id !== "container") item.remove();
            });
            window.checkerAddons();
        }
    }
    xmlhttp.open("GET", path + ".htm", false);
    xmlhttp.send();
}

document.addEventListener("DOMContentLoaded", checkPage);
window.addEventListener("hashchange", checkPage);
