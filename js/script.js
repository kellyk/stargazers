var Repos = new Repos();
Repos.fetch();
console.log(Repos);
_.each(Repos.models, function(repo) {
	console.log(repo);
});
