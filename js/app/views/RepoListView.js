define(['jquery', 'underscore', 'backbone', 'app/views/RepoView'], function($, _, Backbone, RepoView) {
	'use strict';

	var RepoListView = Backbone.View.extend({
		el: $('#repos'),

		render: function() {
			this.$el.html("");
			this.collection.each(function(model) {
				var repoView = new RepoView({model: model});
				this.$el.append(repoView.render().el);
			}, this);
			return this;
		}
	});

	return RepoListView;
});
