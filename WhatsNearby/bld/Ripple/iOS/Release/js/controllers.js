angular.module('starter.controllers', [])

.controller('IntroCtrl', function ($scope, $location, Geolocation, $state) {

    $scope.getCurrentPosition = function () {

        Geolocation.getCurrentPosition();

        //move only when position is available else let the user try again.
        //$location.path('/dashboard');
        $location.path('tab/dashboard');
    }
})

.controller('DashCtrl', function($scope) {

})

.controller('DealCtrl', function ($scope, Geolocation, GrouponApi) {

    var currPosition = Geolocation.getPosition();

    var lat = currPosition.coords.latitude;
    var lng = currPosition.coords.longitude;

    GrouponApi.search(lat, lng, function (data, status, headers, config) {

        if (status != "200") {
            $scope.dataResult = null;
        }

        GrouponApi.setResult(data);

        $scope.deals = data.deals;
    })

    $scope.doRefresh = function () {
        //Implement refresh here... call api.. observe location then call api
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('DealDetailCtrl', function ($scope, $stateParams, GrouponApi) {

    var data = GrouponApi.getResult() || null;

    if (!data) {
        alert('Unable to Display Detail');
        return;
    }

    var selectedData = null;

    for (i = 0; i <= data.deals.length; i++) {
        if (data.deals[i].id == $stateParams.id) {
            selectedData = data.deals[i];
            break;
        }
    }
   
    $scope.dealDetail = selectedData;
})

.controller('NearbyListCtrl', function ($scope, $stateParams, YelpApi, Geolocation) {

    //if (!YelpApi.getResult())
    //{
        var currPosition = Geolocation.getPosition();

        var lat = currPosition.coords.latitude;
        var lng = currPosition.coords.longitude;
  
        var term = $stateParams.term;

        YelpApi.search(lat, lng, term, function (data, status, headers, config) {

            if (status != "200")
            {
                $scope.dataResult = null;
            }
        
            YelpApi.setResult(data);

            $scope.dataResult = data;
        });
    //} 
    //else{
    //    $scope.dataResult = YelpApi.getResult();
    //}

    $scope.doRefresh = function () {
        //Implement refresh here... call api.. observe location then call api
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('NearbyDetailCtrl', function ($scope, $stateParams, $location, YelpApi, Map, Geolocation, $state) {

    var data = YelpApi.getResult() || null;

    if (!data)
    {
        alert('Unable to Display Detail');
        return;
    }

    var selectedData = null;

    for (i = 0; i <= data.businesses.length; i++)
    {
        if (data.businesses[i].id == $stateParams.id)
        {   
            selectedData = data.businesses[i];
            break;
        }
    }

    $scope.businessDetail = selectedData;

    var lat_position = $scope.businessDetail.location.coordinate.latitude;
    var lng_position = $scope.businessDetail.location.coordinate.longitude;

    Map.displayGoogleMap(lat_position, lng_position);

    $scope.getDirection = function () {

        var currPosition = Geolocation.getPosition();

        var data = YelpApi.getResult() || null;

        var directionObj = {
            'lat_from': currPosition.coords.latitude,
            'lng_from': currPosition.coords.longitude,
            'lat_to': $scope.businessDetail.location.coordinate.latitude,
            'lng_to': $scope.businessDetail.location.coordinate.longitude
        }

        $state.go('direction-map', { myParam: directionObj });
        //$state.go('tab.direction-map', { myParam: directionObj });
        //$location.path('tab/direction-map/' + directionObj);
     
    }
})

.controller('DirectionMapCtrl', function ($scope, $stateParams, Map) {

    Map.displayDirection($stateParams.myParam);
})

.controller('ContactCtrl', function ($scope) {

})


