Template.registerHelper('siteTitle', function(string) {
  return SEO.settings.title;
});

Template.registerHelper('summarize', function(string) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(140);
});

stringTruncate = function(string, length)
{
	console.log(length);
	if (length == 0 || length==undefined) length=200;
	var cleanString = _(string).stripTags();
  	return _(cleanString).truncate(length);
}
