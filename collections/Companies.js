Companies = new Meteor.Collection('company');

Meteor.methods({
	insert_company: function(name) {
		Companies.insert({name: name, dateAdded: moment.utc(), dateUpdated: moment.utc()});
		console.log("company inserted");
	}
});

Companies.allow({
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