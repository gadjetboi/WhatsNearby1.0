angular.module('starter.services', [])

.factory('GrouponApi', function ($http) {
 
    return {
        setResult: function (data) {
            result = data;
        },
        getResult: function () {
            return result;
        },
        search: function (lat, lng, callback) {
            var method = 'GET';
            var url = 'https://partner-api.groupon.com/deals.json';
            var params = {
                tsToken: 'US_AFF_0_204362_212556_0',
                lat: lat,
                lng: lng,
                limit: 50
            };

            $http.get(url, { params: params }).success(callback).error(callback);
        }
    }
})

.factory('YelpApi', function ($http) {

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    var result = null;

    return {
        setResult: function (data) {
            result = data;
        },
        getResult: function () {
            return result;
        },
        search: function (lat, lng, term, callback) {

            var method = 'GET';
            var url = 'http://api.yelp.com/v2/search';
            var params = {
                //callback: 'angular.callbacks._0',
                ll: lat + ", " + lng,
                oauth_consumer_key: 'JCs1r-qqSQnB0tF2NTxUPw', //Consumer Key
                oauth_token: 'IONf9lLQuAsWQFD_1-YLBg6u7zJ6LBl4', //Token
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: term
            };

            var consumerSecret = '4IhnBf44M8M04XAUcLtvuhKN9xQ'; //Consumer Secret
            var tokenSecret = 'h80GpMjekndS2Q-20arPjl0logM'; //Token Secret
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false });
            params['oauth_signature'] = signature;

            $http({
                method: 'GET',
                url: url,
                params: params,
                cache: false
            }).success(callback).error(callback);

            //$http.jsonp(url, { params: params }).success(callback).error(callback);
        }
    }
})

.factory('Geolocation', function () {

    var _position = null;

    function setPosition(position) {
        _position = position;
    }

    function getPosition() {
        return _position;
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    };

    return {
        getCurrentPosition: function (onSuccess) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, enableHighAccuracy: true });
        },
        getPosition: getPosition,
        setPosition: setPosition
    }
})

.factory('Map', function () {

    var displayGoogleMap = function displayGoogleMap(lat, lng) {

        var myLatlng = new google.maps.LatLng(lat, lng);

        var mapProp = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 14,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var elem = document.getElementById("googleMap");

        //get the screen size then do the computation to get the area of map.
        elem.style.width = '300px';
        elem.style.height = '300px';

        var map = new google.maps.Map(elem, mapProp);

        map.setCenter(myLatlng);

        var marker = new google.maps.Marker({
            position: myLatlng,
        });

        marker.setMap(map);
    };

    var displayDirection = function (directionObj) {
       
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
       
        directionsDisplay = new google.maps.DirectionsRenderer();
        var position = new google.maps.LatLng(directionObj.lat_from, directionObj.lng_from);
        var mapOptions = {
            zoom: 10,
            center: position
        }
        map = new google.maps.Map(document.getElementById("directionMap"), mapOptions);
        directionsDisplay.setMap(map);

        var request = {
            origin: position,
            destination: new google.maps.LatLng(directionObj.lat_to, directionObj.lng_to),
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    }

    return {
        displayDirection: displayDirection,
        displayGoogleMap: displayGoogleMap
    }
})

