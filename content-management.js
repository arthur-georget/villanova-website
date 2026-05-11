const PUBLIC_KEY = '9798715ee53d4cb8bbd620bc89e5409f';
const AGENDA_ID = '1854436';

let data;
let isLoading = false;

async function showEventInfos(ref_button, event){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let target_url = `https://corsproxy.io/https://api.openagenda.com/v2/agendas/${AGENDA_ID}/events/${event.uid}`;
    const RESPONSE = await fetch(target_url, {
        headers: {
            'key': PUBLIC_KEY
        }
    });

    const DATA = await RESPONSE.json();
    console.log(DATA);

    const CURTAIN = document.createElement("div");
    const EVENT = document.createElement("article");

    const EXIT_BUTTON = document.createElement("button");
    EXIT_BUTTON.setAttribute("tabindex", "1");

    EXIT_BUTTON.addEventListener('click', () => {
                CURTAIN.remove();
                EVENT.remove();
            });

    const EXIT_LOGO = document.createElement("IMG");
    EXIT_LOGO.setAttribute("src", "assets/icons/xmark.svg");
    EXIT_LOGO.setAttribute("width", "10px");
    EXIT_LOGO.setAttribute("alt", "Icône en forme de croix.");
    EXIT_BUTTON.appendChild(EXIT_LOGO);

    const EVENT_NAME = document.createElement("h3");
    const EVENT_NAME_CONTENT = document.createTextNode(event.title['fr']);
    EVENT_NAME.appendChild(EVENT_NAME_CONTENT);

    const IMAGE = document.createElement("IMG");
    IMAGE.setAttribute("src", `${event.image.base}${event.image.filename}`);
    IMAGE.setAttribute("width", "304");
    IMAGE.setAttribute("alt", `Illustration de ${event.title['fr']}`);
    
    const DATE_RANGE = document.createElement("p");
    const DATE_RANGE_CONTENT = document.createTextNode(event.dateRange["fr"]);
    DATE_RANGE.appendChild(DATE_RANGE_CONTENT);

    const LOCATION = document.createElement("p");
    const LOCATION_CONTENT = document.createTextNode(`${event.location.name}, ${event.location.city}`);
    LOCATION.appendChild(LOCATION_CONTENT);

    const LONG_DESCRIPTION = document.createElement("p");
    const LONG_DESCRIPTION_CONTENT = document.createTextNode(DATA.event.longDescription["fr"])
    LONG_DESCRIPTION.appendChild(LONG_DESCRIPTION_CONTENT);

    EVENT.appendChild(EXIT_BUTTON);
    EVENT.appendChild(EVENT_NAME);
    EVENT.appendChild(IMAGE);
    EVENT.appendChild(DATE_RANGE);
    EVENT.appendChild(LOCATION);
    EVENT.appendChild(LONG_DESCRIPTION);

    document.getElementById('events').appendChild(CURTAIN);
    document.getElementById('events').appendChild(EVENT);
}

async function requestEvents(after="", search="") {
    const EVENTS_SECTION = document.getElementById('events-section');

    if (isLoading) return;
    isLoading = true;
    let target_url = `https://corsproxy.io/https://api.openagenda.com/v2/agendas/${AGENDA_ID}/events?size=10&relative[]=current&relative[]=upcoming`;
    if (search){
        EVENTS_SECTION.textContent = "";
        target_url += `&search=${encodeURIComponent(search)}`;
    }
    if (after && Array.isArray(after)) {
        after.forEach((value) => {
            target_url += `&after[]=${encodeURIComponent(value)}`;
        });
    }
    const RESPONSE = await fetch(target_url, {
        headers: {
            'key': PUBLIC_KEY
        }
    });

    const DATA = await RESPONSE.json();
    const EVENTS = DATA.events || [];
    console.log(DATA);

    EVENTS.forEach(event => {
        const CLICKABLE_EVENT = document.createElement("button");
        CLICKABLE_EVENT.setAttribute("tabindex", "0");
        CLICKABLE_EVENT.addEventListener('click', () => {
                if (typeof showEventInfos === "function") {
                    showEventInfos(CLICKABLE_EVENT, event);
                }
            });
            
        const EVENT = document.createElement("article");
        CLICKABLE_EVENT.appendChild(EVENT);

        const EVENT_NAME = document.createElement("h3");
        const EVENT_NAME_CONTENT = document.createTextNode(event.title['fr']);
        EVENT_NAME.appendChild(EVENT_NAME_CONTENT);

        const IMAGE = document.createElement("IMG");
        IMAGE.setAttribute("src", `${event.image.base}${event.image.filename}`);
        IMAGE.setAttribute("width", "304");
        IMAGE.setAttribute("alt", `Illustration de ${event.title['fr']}`);
        
        const DATE_RANGE = document.createElement("p");
        const DATE_RANGE_CONTENT = document.createTextNode(event.dateRange["fr"]);
        DATE_RANGE.appendChild(DATE_RANGE_CONTENT);

        const LOCATION = document.createElement("p");
        const LOCATION_CONTENT = document.createTextNode(`${event.location.name}, ${event.location.city}`);
        LOCATION.appendChild(LOCATION_CONTENT);
        
        EVENT.appendChild(EVENT_NAME);
        EVENT.appendChild(IMAGE);
        EVENT.appendChild(DATE_RANGE);
        EVENT.appendChild(LOCATION);

        EVENTS_SECTION.appendChild(CLICKABLE_EVENT);
    });
    
    isLoading = false;
    return DATA;
}

async function requestPlaces(after="", search="") {
    const PLACES_SECTION = document.getElementById('places-section');
    if (isLoading) return;
    isLoading = true;
    let target_url = `https://corsproxy.io/https://api.openagenda.com/v2/agendas/${AGENDA_ID}/locations?size=10&relative[]=current&relative[]=upcoming`;
    if (search){
        PLACES_SECTION.textContent = "";
        target_url += `&search=${encodeURIComponent(search)}`;
    }
    if (after){
        target_url += `&after=${encodeURIComponent(after)}`;
    }
    const RESPONSE = await fetch(target_url, {
        headers: {
            'key': PUBLIC_KEY
        }
    });

    const DATA = await RESPONSE.json();
    const PLACES = DATA.locations || [];
    console.log(DATA);

    PLACES.forEach(place => {
        const PLACE = document.createElement("article");
        PLACE.setAttribute("tabindex", "0");
        
        const PLACE_NAME = document.createElement("h3");
        const PLACE_NAME_CONTENT = document.createTextNode(place.name);
        PLACE_NAME.appendChild(PLACE_NAME_CONTENT);

        const ADDRESS = document.createElement("p");
        const ADDRESS_CONTENT = document.createTextNode(place.address);
        ADDRESS.appendChild(ADDRESS_CONTENT);
        
        PLACE.appendChild(PLACE_NAME);
        PLACE.appendChild(ADDRESS);

        PLACES_SECTION.appendChild(PLACE);
    });
    
    isLoading = false;
    return DATA;
}

window.onscroll = function(event) {
    if ((window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 100)) {
        if (data && !isLoading) {
            data = data.then(value => {
                if (value.after ) {
                    if (document.getElementById("events").style.display == "block" && Array.isArray(value.after)){
                        return requestEvents(value.after); 
                    } else if (document.getElementById("places").style.display == "block"){
                        return requestPlaces(value.after);
                    }
                }
                return value;
            });
        }
    }
};

const searchForm = document.getElementById("searchForm");

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const SAFETY_REGEX = /^(?![^{}<>]*[{}<>])[^]{1,50}$/;
    const SEARCH_INPUT = document.getElementById("internalSearch");

    if (!SAFETY_REGEX.test(SEARCH_INPUT.value)){
        SEARCH_INPUT.value = "";
        SEARCH_INPUT.setAttribute("placeholder", "{} et <> interdits!");
    } else {
        SEARCH_INPUT.setAttribute("placeholder", "Rechercher");
        if (document.getElementById("events").style.display == "block"){
            data = requestEvents("",SEARCH_INPUT.value);
        } else if (document.getElementById("places").style.display == "block"){
            data = requestPlaces("",SEARCH_INPUT.value);
        }
    }
});