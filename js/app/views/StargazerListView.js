define(['jquery', 'underscore', 'backbone', 'app/views/StargazerView'], function($, _, Backbone, StargazerView) {
	'use strict';

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

	return StargazerListView;
});
