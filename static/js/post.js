App.controller('postCtrl', function ($scope, $http) {
    $scope.posted = [
        {
            id: 1,
            title: 'haha'
        },
        {
            id: 3,
            title: 'sss'
        },
        {
            id: 5,
            title: 'kkk'
        },
        {
            id: 6,
            title: 'ppp'
        }
    ];
    $scope.display = {
        reAdd: 'none',
        add: 'block'
    }
    $scope.post = function () {
        var title = $scope.title;
        var text = $scope.text;
        var json = {
            title: title,
            text: text
        }
        $http({
            url: '/api/post',
            method: 'POST',
            data: json
        }).success(function (result) {
            console.log("success!", result);
            $scope.title = '';
            $scope.text = '';
            $scope.posted.push(result);

            console.log($scope.posted);
        }).error(function (result) {
            console.log("error", result);
        });
    }
});