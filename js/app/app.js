define(['jquery', 'underscore', 'backbone', 'app/collections/Repos', 'app/views/RepoListView'],
	function($, _, Backbone, Repos, RepoListView) {
	'use strict';

	var App = {
		init: function() {
			$(document).ready(function() {
				$('[data-action=search]').focus();
			});

			$('form').on('submit', function(e) {
				e.preventDefault();
				var url = 'https://api.github.com/users/'+e.target[0].value+'/repos';
				var repos = new Repos();
				repos.url = url;
				repos.comparator = function(repo) {
					return -repo.get("stargazers_count");
				};
				repos.fetch().complete(function() {
					var repoListView = new RepoListView({collection: repos});
					repoListView.render();
				});
				
			});
		}
	};

	return App;
});
