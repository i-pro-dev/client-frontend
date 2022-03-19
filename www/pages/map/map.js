var HEIGHT = window.innerHeight+'px';
var pos = [57.621166, 39.888228];
var scale = 15;
var locs = [
    [57.621166,39.888549],
   [57.633281,39.892843],
   [57.63157279920508, 39.88571462755887,],
   [57.62498351193726, 39.90178972755868,],
];

var permissions;

var onSuccess = function(position) {
    pos = [position.coords.latitude,position.coords.longitude];
    console.log('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

setTimeout(()=>{
    permissions = cordova.plugins.permissions;
    var list = [
        permissions.ACCESS_FINE_LOCATION
    ];

    permissions.checkPermission(list, success, null);

    function success( status ) {
        if( !status.hasPermission ) {

            permissions.requestPermissions(
                list,
                function(status) {
                    if( !status.hasPermission ) error();
                },
                error);
        }
    }
},2000);

function get_location(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    update_markers();
    map.flyTo(pos,18);
}

document.getElementById("map").style.height = HEIGHT;

var map = L.map('map', {
    center: pos,
    zoom:scale,
    zoomControl: false,
})

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaHVzY2tlciIsImEiOiJja3pkMTZ0cmUwNGYzMm9tcW5pa200dDJkIn0.-NLqcskaelmtyL5zpaBLzQ'
}).addTo(map);
var pos_marker = L.marker(new L.LatLng(pos[0], pos[1]), );
update_markers();
function update_markers(){
    info2_appear = false;
    let idx = 0;
    locs.forEach((el)=>{
        var title = el[2];
        // glow = "";
        icon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div>\n" +
                "            <a href=\"#\" onclick=\"collapse_toggle("+idx+")\">\n" +
                "                <div class=\"geopoint d-flex flex-column justify-content-end align-items-center pb-5  \">\n" +
                "                    <div class=\"tf\"></div>\n" +
                "                </div>\n" +
                "            </a>\n" +
                "        </div>",
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });
        var marker = L.marker(new L.LatLng(el[0], el[1]), { title: title ,icon: icon});

        //marker.bindPopup(title);
        map.addLayer(marker);
        idx++;
    });
    if(info2_appear){
        document.getElementById("info2").style.display = "block";
    }else{
        document.getElementById("info2").style.display = "none";
    }
    icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div class=\"my-position d-flex justify-content-center align-items-center\">\n" +
            "            <div class=\"orange-circle\"></div>\n" +
            "        </div>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
    });
    pos_marker = L.marker(new L.LatLng(pos[0], pos[1]), { icon: icon});
    map.addLayer(markers);
    map.addLayer(pos_marker);
}
function zoomin(){
    map.zoomIn(1);
}
function zoomout(){
    map.zoomOut(1);
}
