var Stargazer = Backbone.Model.extend();

var Stargazers = Backbone.Collection.extend({
	model: Stargazer
});

var Repo = Backbone.Model.extend({
	initialize: function() {
		var that = this;
		var stargazers = new Stargazers();
		stargazers.url = this.get('stargazers_url');
		stargazers.fetch().done(function() {
			that.set('stargazers', stargazers);
		});
	}
});

var Repos = Backbone.Collection.extend({
	model: Repo
});

var RepoView = Backbone.View.extend({
	tagName: 'li',
	className: 'repo',
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

	render: function() {
		this.$el.html("");
		this.collection.each(function(model) {
			var that = this;
			setTimeout(function() {
				var repoView = new RepoView({model: model});
				var stargazerListView = new StargazerListView({collection: model.get('stargazers')});
				$(repoView.render().el).append(stargazerListView.render().el);
				that.$el.append(repoView.el);
			}, 1000);

		}, this);
		return this;
	}
});

var StargazerView = Backbone.View.extend({
	tagName: 'li',
	className: 'stargazer',
	template: _.template($('#stargazer').html()),
	render: function() {
		console.log(this.model);
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var StargazerListView = Backbone.View.extend({
	tagName: 'ul',
	render: function() {
		this.collection.each(function(model) {
			var stargazerView = new StargazerView({model: model});
			this.$el.append(stargazerView.render().el);
		}, this);
		return this;
	}
});

$('form').on('submit', function(e) {
	e.preventDefault();
	var url = 'https://api.github.com/users/'+e.target[0].value+'/repos?access_token=10838b19e7632b67bde25802235eac0e559ec8a2';
	var repos = new Repos();
	repos.url = url;
	repos.fetch().complete(function() {
		var repoListView = new RepoListView({collection: repos});
		repoListView.render();
		$('#list').html(repoListView.el);
	});
});