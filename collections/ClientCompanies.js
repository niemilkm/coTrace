ClientCompanies = new Meteor.Collection('clientcompany');

Meteor.methods({
	insert_client: function(client) {
		var companyId = Companies.findOne({})._id;
		return ClientCompanies.insert({name: client, company: companyId, dateAdded: moment.utc(), dateUpdated: moment.utc()});
	},

	update_client: function(id, name) {
		ClientCompanies.update({_id: id}, {$set: {name: name, dateUpdated: moment.utc()}});
	},

	remove_client: function(client) {
		ClientCompanies.remove({_id: client});
	}
	
});

ClientCompanies.allow({
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