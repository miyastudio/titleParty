App.controller('postsCtrl', function ($scope,post) {
    post.load();
    $scope.post=post;
});