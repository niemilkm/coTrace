Template.projectEdit.helpers({

  author: function()
  {
    return Authors.find({});
  },

  client: function()
  {
    return ClientCompanies.find({});
  },

  category: function()
  {
    return Categories.find({});
  },

  project: function()
  {
    return Projects.find({});
  },

  tag: function()
  {
    return Tags.find({});
  },

  selectedAuthor: function(v1)
  {
    console.log(v1);
    console.log(this.name);
    if (v1 == this.name)
    {
      return "selected";
    }
    return "";
  },


  authorValue: function()
  {
    console.log(Authors.findOne({_id: this.author}).name)
    return Authors.findOne({_id: this.author}).name;
  },

  clientValue: function()
  {
    projectId = Projects.findOne({_id: this.project});
    return ClientCompanies.findOne({_id: projectId.clientCompany});
  },

  categoryValue: function()
  {
    projectId = Projects.findOne({_id: this.project});
    return Categories.findOne({_id: projectId.categories});
  },

  projectValue: function()
  {
    return Projects.findOne({_id: this.project});
  },

  tagValue: function()
  {
    projectId = Projects.findOne({_id: this.project});
    return Tags.findOne({_id: projectId.tags});
  }

});

Template.testimonialEdit.events = 
{
	'click button[type=submit]': function(e)
	{
        e.preventDefault();

        var authorProperties = {
          name:   $('#authorName').val(),
          title:  $('#authorTitle').val(),
          email:  $('#authorEmail').val(),
          phone:  $('#authorPhone').val()
        }

        var testimonialProperties = {
        	author:      authorProperties,
        	projectName: $('#projectName').val(),
        	companyName: $('#companyName').val(),
        	description: $('#description').val(),
        	category:    $('#category').val(),
        	tag:         $('#tag').val()
        }

        Meteor.call("update_testimonial", testimonialId, testimonialProperties);
        console.log("testimonial submitted for update");
        Router.go('/dashboard');

	}
}