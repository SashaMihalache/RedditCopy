/**
 * Created by sasha.mihalache on 9/25/2015.
 */
var app = angular.module('SashasReddit', ['ui.router'])

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }]);

app.controller('MainCtrl',[
   '$scope','posts', function($scope, posts){

        //factory->array posts
        $scope.posts = posts.posts;

        //Dummy Data
        //$scope.posts = [
        //    {title: "post1", upvotes: 5},
        //    {title: "post2", upvotes: 2},
        //    {title: "post3", upvotes: 4},
        //    {title: "post4", upvotes: 2}
        //];



        $scope.addPost = function(){
            if(!$scope.titleInsert || $scope.titleInsert ==""){
                return;
            }else {
                $scope.posts.push(
                    {   title: $scope.titleInsert,
                        link : $scope.linkInsert,
                        upvotes: 0,
                        comments: [
                            {author: 'Joe', body: 'Cool post!', upvotes: 0},
                            {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                        ]
                    });
                $scope.titleInsert = "";
                $scope.linkInsert = "";
            }
        }

        $scope.incrementUpvotes = function(post){
            post.upvotes +=1;
        }
    }
]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];
        $scope.addComment = function(){
            if($scope.body === '') { return; }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };
    }]);

app.factory('posts', [function(){
    //service body
    var o = {
        posts: []
    };
    return o;

}]);













