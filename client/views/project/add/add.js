Template.ProjectAdd.events = 
{
	'click button[type=submit]': function(e)
	{
        e.preventDefault();

        //var clientCompanyId = ClientCompanies.findOne({name: $('#companyName').val()})._id;
        //var categoryId = Categories.findOne({name: "Pharmaceuticals"})._id;//Categories.findOne({name: $('#category').val()});
        //var tagId = Tags.findOne({name: $('#tag').val()})._id;
        var authorId = Authors.findOne({name: $('#authorName').val()})._id;
        var projectId = Projects.findOne({name: $('#projectName').val()})._id;

        var testimonialProperties = {
        	project:     projectId,
        	testimonial: $('#description').val(),
        	author:      authorId
        }

        Meteor.call("insert_testimonial", testimonialProperties);
        console.log("testimonial submitted");
        Router.go('/dashboard');
	},

  'click .open-modal': function(e,t)
  {
    e.preventDefault();
    $(".modalAdd").modal("show");
  }

}

Template.testimonialAdd.helpers({

  author: function()
  {
    return Authors.find({}).fetch();
  },

  project: function()
  {
    return Projects.find({}).fetch();
  },

  client: function()
  {
    return ClientCompanies.find({}).fetch();
  },

  category: function()
  {
    return Categories.find({}).fetch();
  },
  
});
