function openTab(event, tabName) {
    let i, x, tablinks;
    x = document.getElementsByTagName("main");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" selected-tab", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " selected-tab";
}