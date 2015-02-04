Authors = new Meteor.Collection('author');

Meteor.methods({
	insert_author: function(ad) {
		var companyId = Companies.findOne({})._id;
		var authorId = Authors.insert({name: ad.name, authorCompany: ad.authorCompany, title: ad.title, phone: ad.phone, email: ad.email, company: companyId, dateAdded: moment.utc(), dateUpdated: moment.utc()});
		console.log("authorId is: " + authorId);
		return authorId;
	},

	update_author: function(ad, authorId) {
		Authors.update({_id: authorId}, {$set: {name: ad.name, authorCompany: ad.authorCompany, title: ad.title, phone: ad.phone, email: ad.email, dateUpdated: moment.utc()}});
	},

	remove_author: function(authorId) {
		Authors.remove({_id: authorId});
	}

});

Authors.allow({
insert: function () {
    return true;
},

remove: function (){
    return true;    
},

update: function() {
    return true;    
}

});