App.controller('footerCtrl', function ($scope) {
    var year = moment().year();
    var copyright = 'copyright ' + year;
    $scope.copyright = copyright;
});