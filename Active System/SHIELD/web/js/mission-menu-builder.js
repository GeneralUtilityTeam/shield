function buildNav(progress, selected) {

    var hrefArray = ["ANMission1MD", "ANMission2DS", "ANMission3PCO", "ANMission4COG", "ANMission5TCOA", "ANMission6CM", "ANMission7MO"];
    var textArray = ["<span>1 </span> Mission Details", "<span>2 </span> Data Sources", "<span>3 </span> Characteristics Overlay", "<span>4 </span> Center Of Gravity", "<span>5 </span> Threat Course Of Action", "<span>6 </span> CARVER Methodology", "<span>7 </span> Mission Overview"];
    var nav = document.getElementById("nav-shield");
    for (var x = 1; x <= 7; x++) {
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