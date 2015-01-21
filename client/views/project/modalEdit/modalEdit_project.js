


Template.modalEdit_project.events = 
{


	'click .left-arrow': function()
	{
    Session.set("hidden", true)
  },

  'click .right-arrow': function()
  {
    Session.set("hidden", false)
  },

  'click #addProjectDetails': function()
  {
    var project  = $('#projectName_modalAdd').val().trim();
    var client   = $('#clientName_modalAdd').val().trim();
    var category = $('#category_modalAdd').val().trim();
    var tag      = $('#tag_modalAdd').val().trim();

    if (tag == "" || tag == null || tag == undefined)
    {
      tag = null;
    }

    if (project == "" || project == null || project == undefined)
    {
      alert("Please Enter Project Name");
    }
    else if (client == "" || client == null || client == undefined)
    {
      alert("Please Enter Client Name");
    }
    else if (category == "" || category == null || category == undefined)
    {
      alert("Please Enter Category");
    }
    else
    {
      var projectDetails = {
                              project: project,
                              client: client,
                              category: category,
                              tag: tag
                            };
      projectId = Session.get("projectId");
      Meteor.call("update_projectDetails", projectDetails, projectId, function(error) {
        var projectName = Projects.findOne({_id: projectId}).name;
        var client = Projects.findOne({_id: projectId}).clientCompany;
        var category = Projects.findOne({_id: projectId}).categories;
        var tag = Projects.findOne({_id: projectId}).tags;
        Session.set("hidden", true);
        Session.set("hidden_testimonial", true);
        $('#projectName_modalAdd').val(projectName);
        $('#clientName_modalAdd').val(client);
        $('#category_modalAdd').val(category);
        $('#tag_modalAdd').val(tag);
        $('#clientAdd').val('');
        $('#categoryAdd').val('');
        $('#tagAdd').val('');
        $('#modalEdit_project').modal('hide');
      });
    }
  },

  'click #clientAdd_submit': function()
  {
    var client = $('#clientAdd').val().trim();
    if (client == "" || client == null || client == undefined)
    {
      alert("To Add a Client Name - Please Add Client Name");
    }
    else
    {
      $('#clientAdd').val('');
      Meteor.call("insert_client", client);
    }
  },

  'click #categoryAdd_submit': function()
  {
    var category = $('#categoryAdd').val().trim();
    if (category == "" || category == null || category == undefined)
    {
      alert("To Add a Category Name - Please Add Category Name");
    }
    else
    {
      $('#categoryAdd').val('');
      Meteor.call("insert_category", category);
    }
  },

  'click #tagAdd_submit': function()
  {
    var tag = $('#tagAdd').val().trim();
    if (tag == "" || tag == null || tag == undefined)
    {
      alert("To Add a Tag Name - Please Add Tag Name");
    }
    else
    {
      $('#tagAdd').val('');
      Meteor.call("insert_tag", tag);
    }
  },

  'click .modalClose': function()
  {
    var projectName = Projects.findOne({_id: Session.get("projectId")}).name;
    var client = Projects.findOne({_id: Session.get("projectId")}).clientCompany;
    var category = Projects.findOne({_id: Session.get("projectId")}).categories;
    var tag = Projects.findOne({_id: Session.get("projectId")}).tags;
    Session.set("hidden", true);
    Session.set("hidden_testimonial", true);
    $('#projectName_modalAdd').val(projectName);
    $('#clientName_modalAdd').val(client);
    $('#category_modalAdd').val(category);
    $('#tag_modalAdd').val(tag);
    $('#clientAdd').val('');
    $('#categoryAdd').val('');
    $('#tagAdd').val('');
  },

}

Template.modalEdit_project.helpers({

  projectName: function()
  {
    var projectName = Projects.findOne({_id: Session.get("projectId")}).name;
    return projectName;
  },

  clientSelected: function()
  {
    var clientId = Projects.findOne({_id: Session.get("projectId")}).clientCompany;
    if (clientId == this._id)
      return "selected";
    else
      return "";
  },

  categorySelected: function()
  {
    var categoryId = Projects.findOne({_id: Session.get("projectId")}).categories;
    if (categoryId == this._id)
      return "selected";
    else
      return "";
  },

  tagSelected: function()
  {
    var tagId = Projects.findOne({_id: Session.get("projectId")}).tags;
    if (tagId == this._id)
      return "selected";
    else
      return "";
  },

  hidden: function()
  {
    return Session.get("hidden");
  },

  htmlEndDiv: function()
  {
    return '</div>';
  },

  category: function()
  {
    return Categories.find({}).fetch();
  },

  client: function()
  {
    return ClientCompanies.find({}).fetch();
  },

  tag: function()
  {
    return Tags.find({}).fetch();
  },

})
