// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })

        .state('intro', { url: '/', templateUrl: 'templates/intro.html', controller: 'IntroCtrl' })

        /* Location Tab Pages */
        .state('tabs.dashboard', {
            url: "/dashboard",
            views: { 'location-view': { templateUrl: "templates/dashboard.html", controller: 'DashCtrl' } }
        })

       .state('tabs.nearbyList', {
           url: '/nearby-list',
           views: { 'location-view': { templateUrl: "templates/nearby-list.html", controller: 'NearbyListCtrl' } }
       })

       .state('tabs.nearbyDetail', {
           url: '/nearby-detail/:id',
           views: { 'location-view': { templateUrl: "templates/nearby-detail.html", controller: 'NearbyDetailCtrl' } }
       })

        //.state('tabs.directionMap', {
        //    url: '/direction-map',
        //    params: { myParam: null },
        //    views: { 'location-view': { templateUrl: "templates/direction-map.html", controller: 'DirectionMapCtrl' } }
        //})
 
        .state('direction-map', { url: '/direction-map', params: { myParam: null }, templateUrl: 'templates/direction-map.html', controller: 'DirectionMapCtrl' })

        /* Deal Tab Pages */
        .state('tabs.dealList', {
            url: "/deal-list",
            views: { 'deal-view': { templateUrl: "templates/deal-list.html", controller: 'DealCtrl' } }
        })

        .state('tabs.dealDetail', {
            url: '/deal-detail/:id',
            views: { 'deal-view': { templateUrl: "templates/deal-detail.html", controller: 'DealDetailCtrl' } }
        })

    /* Contact Tab Page */
    .state('tabs.contact', {
        url: '/contact',
        views: { 'contact-view': { templateUrl: "templates/contact.html", controller: 'ContactCtrl' } }
    })
   
    $urlRouterProvider.otherwise("/");

});
