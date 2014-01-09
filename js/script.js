var Stargazer = Backbone.Model.extend();

var Stargazers = Backbone.Collection.extend({
	model: Stargazer,
	initialize: function() {
		console.log("Stargazers: ", this);
	}
});


var Repo = Backbone.Model.extend({

	initialize: function(){
		this.stargazers = new Stargazers();
		this.stargazers.url = this.get('stargazers_url');
		this.stargazers.fetch();
	}
});

var Repos = Backbone.Collection.extend({
	url: 'https://api.github.com/users/m1ck3y/repos?access_token=10838b19e7632b67bde25802235eac0e559ec8a2',
	model: Repo
});

var repos = new Repos();
repos.fetch().complete(function() {
	console.log("Repos:", repos);
});