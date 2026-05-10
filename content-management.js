const PUBLIC_KEY = '9798715ee53d4cb8bbd620bc89e5409f';
const AGENDA_ID = '1854436';
let data;
let isLoading = false;

async function requestEvents(after="") {
    if (isLoading) return;
    isLoading = true;
    let target_url = `https://corsproxy.io/https://api.openagenda.com/v2/agendas/${AGENDA_ID}/events?size=10&relative[]=current&relative[]=upcoming`;
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

    const EVENTS_SECTION = document.getElementById('events-section');
    const DATA = await RESPONSE.json();
    const EVENTS = DATA.events || [];
    console.log(DATA);

    EVENTS.forEach(event => {
        const EVENT = document.createElement("article");
        EVENT.setAttribute("tabindex", "0");
        
        const EVENT_NAME = document.createElement("h3");
        const EVENT_NAME_CONTENT = document.createTextNode(event.title['fr']);
        EVENT_NAME.appendChild(EVENT_NAME_CONTENT);

        const IMAGE = document.createElement("IMG");
        IMAGE.setAttribute("src", `${event.image.base}${event.image.filename}`);
        IMAGE.setAttribute("width", "304");
        IMAGE.setAttribute("height", "228");
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

        EVENTS_SECTION.appendChild(EVENT);
    });
    
    isLoading = false;
    return DATA;
}

data = requestEvents();

window.onscroll = function(event) {
    if ((window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 100)) {
        if (data && !isLoading) {
            data = data.then(value => {
                if (value.after && Array.isArray(value.after)) {
                    return requestEvents(value.after); 
                }
                return value;
            });
        }
    }
};