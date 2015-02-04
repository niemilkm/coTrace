Tags = new Meteor.Collection('tag');

Meteor.methods({
	insert_tag: function(tag) {
		var companyId = Companies.findOne({})._id;
		Tags.insert({name: tag, company: companyId, dateUpdated: moment.utc(), dateAdded: moment.utc(), dateUpdated: moment.utc()});
	},

	update_tag: function(tagId, tag) {
		Tags.update({_id: tagId}, {$set: {name: tag}, dateUpdated: moment.utc()});
	},

	remove_tag: function(tagId, tag) {
		Tags.remove({_id: tagId});
	}

});

Tags.allow({
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