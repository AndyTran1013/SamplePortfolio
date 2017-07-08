var app  = angular.module("portfolioApp",[
	"ngRoute",
	"ngAnimate",
	"portfolioControllers",
	"infoDirectives"]);

app.config(["$routeProvider",
	function($routeProvider){
		$routeProvider.
			when("/Home",{
				templateUrl: "partials/home.html"
			}).
			when("/About",{
				templateUrl: "partials/about.html",
				controller: "aboutCtrl"
			}).
			when("/Works",{
				templateUrl: "partials/works.html",
				controller: "worksCtrl"
			}).
			when("/Contact",{
				templateUrl: "partials/contact.html"
			}).
			otherwise({
				redirectTo: "/Home"
			});
	}]);

angular.module("portfolioControllers",[])
	.controller("navigationCtrl", ["$scope","$location", function($scope,$location){

		$scope.pages = [
			{name: "Home"},
			{name: "About"},
			{name: "Works"},
			{name: "Contact"}
		];

		$scope.showNav = function (){
			return $location.path() !== "/Home";
		};

		$scope.homeNav = function(){
			return $scope.pages.filter(function(page){
				return page.name !== $location.path().slice(1);
			});
		};

		$scope.isActive = function(page){
			return $location.path() == "/" + page;
		};

	}])

	.controller("aboutCtrl", ["$scope", function($scope){
		$scope.skills = [
			{	name: "HTML5", 
				url: "images/skill_icons/icon_html.png"},
			{	name: "CSS3", 
				url: "images/skill_icons/icon_css.png"},
			{	name: "JavaScript", 
				url: "images/skill_icons/icon_js.png"},
			{	name: "AngularJS", 
				url: "images/skill_icons/icon_angular.png"},
			{	name: "PHP", 
				url: "images/skill_icons/icon_php.png"},
			{	name: "SQL", 
				url: "images/skill_icons/icon_sql.png"},
			{	name: "VBA", 
				url: "images/skill_icons/icon_vb.png"},
			{	name: "Photoshop", 
				url: "images/skill_icons/icon_ps.png"}
		];
	}])


	.controller("worksCtrl", ["$scope", function($scope){
		$scope.works = [
			{ title: "Brandi",
				bgUrl: "images/works/brandi.png",
				detail: ""},
			{ title: "To Do App",
				bgUrl: "images/works/toDo.png",
				detail: ""},
			{ title: "Piece #3",
				bgUrl: "",
				detail: ""},
			{ title: "Piece #4",
				bgUrl: "",
				detail: ""},
			{ title: "Piece #5",
				bgUrl: "",
				detail: ""}
		];
	}]);



/*temporary place for directives*/
angular.module("infoDirectives",[])
	.directive("infoHex", ["$window","$timeout", function($window, $timeout){
		return {
			restrict: "AE",
			replace: true,
			transclude: true,
			templateUrl: "js/infoHex.html",
			scope:{
				hexLink: '@'
			},
			link: function(scope,el){
			//dynamically resize hexagons
			function setHeight(){
					var h = Math.ceil(el[0].offsetWidth * Math.tan(30*Math.PI/180)); //height

					el.css("height", h + "px");
					el.css({ 	//make wrap entire hexagon element in box-model, not just center rectangle
					"margin-top": (h / 2 + 2.5) + "px",
					"margin-bottom": (h / 2 + 2.5) + "px"
					});
				}

			var heightTimer;
			setHeight();

			angular.element($window).on("resize",function(){
				//prevent $apply everytime resize fires
				$timeout.cancel(heightTimer);
				heightTimer = $timeout(function(){setHeight();}, 500);
			});

			}
		};
}]);
