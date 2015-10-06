function buildNav(progress, selected) {

    var hrefArray = ["ANMission1MD", "ANMission2PCO", "ANMission3COG", "ANMission4TCOA", "ANMission5CM", "ANMission6PO"];
    var textArray = ["<span>1 </span> Mission Details", "<span>2 </span> Characteristics Overlay", "<span>3 </span> Center Of Gravity", "<span>4 </span> Threat Course Of Action", "<span>5 </span> CARVER Methodology", "<span>6 </span> PsyOps Objective"];
    var nav = document.getElementById("nav-shield");
    for (var x = 1; x <= 6; x++) {
        var item = document.createElement('li');
        if (x == selected)
            item.className = "active";
        else if (x <= progress)
            item.className = "visited";


        var a = document.createElement('a')
        a.innerHTML = textArray[x - 1];
        if (x <= progress)
            a.setAttribute('href', hrefArray[x - 1]);
        item.appendChild(a);
        nav.appendChild(item);
    }
    document.getElementById('nav-mission-title-label').innerHTML = missionTitle;
    document.getElementById('nav-analyst-name-label').innerHTML = analystName;
}