App.factory('post', function($http) {
    var service = {
        _post: {},
        _posts: [],
        getOne: function() {
            return this._post;
        },
        getItems: function() {
            return this._posts;
        },
        get: function(id) {
            return $http.get('/api/post/' + id);
        },
        load: function() {
            _self=this;
            //
            $http({
                url: '/api/posts',
                method: 'GET'
            }).success(function(result) {
                console.log("success!", result);
                _self._posts = result;
                console.log('post',this._posts);
            }).error(function(result) {
                console.log("error", result);
            });
        },
        post: function() {
            //
        },
        del: function(id) {

        },
        update: function(id, json) {

        }
    };
    return service;
});