Testimonials = new Meteor.Collection('testimonial');

Meteor.methods({
	insert_testimonial: function(td) {
		var companyId = Companies.findOne({})._id;
		Testimonials.insert({testimonial: td.testimonial, project: td.project, author: td.author, company: companyId});
		console.log("testimonial inserted");
	},

	update_testimonial: function(td, td_id) {
		Testimonials.update({_id: td_id}, {$set: {testimonial: td.testimonial, project: td.project, author: td.author}});
		console.log("testimonial updated");
	},

	remove_testimonial_byProjectIds: function(projectObjects) {
		_.each(projectObjects, function(eachProject)
		{
			Testimonials.remove({project: eachProject._id});
		});
	},

	remove_testimonial_byAuthorId: function(authorId) {
		Testimonials.remove({author: authorId});
	},

	remove_testimonial_byProjectId: function(projectId) {
		Testimonials.remove({project: projectId})
	},

	remove_testimonial_byId: function(Id) {
		Testimonials.remove({_id: Id})
	}

});

Testimonials.allow({
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