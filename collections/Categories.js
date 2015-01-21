Categories = new Meteor.Collection('category');

Meteor.methods({
	insert_category: function(category) {
		var companyId = Companies.findOne({})._id;
		Categories.insert({name: category, company: companyId});
	},

	update_category: function(categoryId, category) {
		Categories.update({_id: categoryId}, {$set: {name: category}});
	},

	remove_category: function(categoryId) {
		Categories.remove({_id: categoryId});
	}
	
});

Categories.allow({
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