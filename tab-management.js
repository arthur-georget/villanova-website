function openTab(event, tabName) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let i, x, tabLinks, selectedTabLinks;
    x = document.getElementsByClassName("main-section");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" selected-tab", "");
    }
    document.getElementById(tabName).style.display = "block";
    if (tabName == "events"){
        data = requestEvents();
    } else if (tabName == "places"){
        data = requestPlaces();
    }
    selectedTabLinks = document.getElementsByClassName(`${tabName}-button`);
    for (i=0; i< selectedTabLinks.length; i++) {
        selectedTabLinks[i].className += " selected-tab";
    }
}

function searchFocus(event){
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" selected-tab", "");
    }
    document.getElementsByClassName("search-button")[0].className += " selected-tab";
    document.getElementById("internalSearch").focus();
}