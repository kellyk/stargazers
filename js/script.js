var Stargazer = Backbone.Model.extend();

var Stargazers = Backbone.Collection.extend({
	model: Stargazer,
	initialize: function() {
		//console.log("Stargazers: ", this);
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
	var repoListView = new RepoListView({collection: repos});
	repoListView.render();
	$('#list').html(repoListView.el);
});

var RepoView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#repo').html()),

	initialize: function() {
		this.model.on('change', this.render, this);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var RepoListView = Backbone.View.extend({
	tagName: 'ul',

	initialize: function() {
		//console.log(this);
	},

	render: function() {
		this.collection.each(function(model) {
			var repoView = new RepoView({model: model});
			this.$el.append(repoView.render().el);
		}, this);
		return this;
	}
});

