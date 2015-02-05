Template.admin.helpers({

  eachClient: function()
  {
    return ClientCompanies.find({});
  },

  eachAuthor: function()
  {
    return Authors.find({});
  },

  eachCategory: function()
  {
    return Categories.find({});
  },

  eachTag: function()
  {
    return Tags.find({});
  },

  eachSSInput: function()
  {
    return SuccessStoryInputs.find({});
  },

  clientEditDelete: function()
  {
    var val = Session.get("editDelete"); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
    console.log("val is: " + val);
    if (val==1)
      return true;
    return false;
  },

  authorEditDelete: function()
  {
    var val = Session.get("editDelete"); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
    if (val==2)
      return true;
    return false;
  },

  categoryEditDelete: function()
  {
    var val = Session.get("editDelete"); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
    if (val==3)
      return true;
    return false;
  },

  tagEditDelete: function()
  {
    var val = Session.get("editDelete"); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
    if (val==4)
      return true;
    return false;
  },

  ssInputEditDelete: function()
  {
    var val = Session.get("editDelete"); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
    console.log("in ssInputEditDelete    " + val)
    if (val==5)
      return true;
    return false;
  },

});

Template.admin.events = 
{
  'click .editClient': function()
  {
    var clientName = ClientCompanies.findOne({_id: this._id}).name
    Session.set("editClient", this._id);
    $('#clientEdit').val( clientName );
  },

  'click .editAuthor': function()
  {
    var author = Authors.findOne({_id: this._id})
    Session.set("editAuthor", this._id);
    $('#authorName').val( author.name );
    $('#authorCompany').val( author.authorCompany );
    $('#authorTitle').val( author.title );
    $('#authorPhone').val( author.phone );
    $('#authorEmail').val( author.email );
  },

  'click .editCategory': function()
  {
    var categoryName = Categories.findOne({_id: this._id}).name
    Session.set("editCategory", this._id);
    $('#categoryEdit').val( categoryName );
  },

  'click .editTag': function()
  {
    var tagName = Tags.findOne({_id: this._id}).name
    Session.set("editTag", this._id);
    $('#tagEdit').val( tagName );
  },

  'click .editSSInput': function()
  {
    var ssInputName = SuccessStoryInputs.findOne({_id: this._id}).input
    Session.set("editSSInput", this._id);
    $('#ssInputEdit').val( ssInputName );
  },

  'click #editClientDetails': function()
  {
    var clientName = $('#clientEdit').val().trim();
    Meteor.call("update_client", Session.get("editClient"), clientName);
    $('#clientEdit').val('')
    $('#adminModal_editClient').modal('hide');
  },

  'click #editCategoryDetails': function()
  {
    var categoryName = $('#categoryEdit').val().trim();
    Meteor.call("update_category", Session.get("editCategory"), categoryName);
    $('#categoryEdit').val('')
    $('#adminModal_editCategory').modal('hide');
  },

  'click #editTagDetails': function()
  {
    var tagName = $('#tagEdit').val().trim();
    Meteor.call("update_tag", Session.get("editTag"), tagName);
    $('#tagEdit').val('')
    $('#adminModal_editTag').modal('hide');
  },

  'click #editSSInputDetails': function()
  {
    var ssInputName = $('#ssInputEdit').val().trim();
    Meteor.call("update_ssInput", Session.get("editSSInput"), ssInputName);
    $('#ssInputEdit').val('')
    $('#adminModal_editSSInput').modal('hide');
  },

  'click #clientAdd_submit': function()
  {
    var client = $('#clientAdd').val().trim();
    if (client == "" || client == null || client == undefined)
    {
      alert("To Add a Client Name - Please Enter Client Name");
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
      alert("To Add a Category - Please Enter Category Name");
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
      alert("To Add a tag - Please Enter Tag Name");
    }
    else
    {
      $('#tagAdd').val('');
      Meteor.call("insert_tag", tag);
    }
  },

  'click #ssInputAdd_submit': function()
  {
    var ssInput = $('#ssInputAdd').val().trim();
    if (ssInput == "" || ssInput == null || ssInput == undefined)
    {
      alert("To Add a Success Story Input - Please Enter the Input");
    }
    else
    {
      $('#ssInputAdd').val('');
      Meteor.call("insert_ssInput", ssInput);
    }
  },

  'click #authorAdd_submit': function()
  {
    var authorName = $('#authorAdd').val().trim();
    if (authorName == "" || authorName == null || authorName == undefined)
    {
      alert("To Add an Author - Please Enter Author Name");
    }
    else
    {
      $('#authorName_add').val(authorName);
      $('#authorAdd').val('');
    }
  },

  'click .deleteClient': function()
  {
    var projectsToDelete = "";
    var clientId = this._id;
    var testimonialCount = 0;
    var projectCount = 0;
    var testimonial;
    var projectData = undefined;
    Session.set("deleteClient", clientId);
    var projects = Projects.find({clientCompany: clientId}).fetch();
    _.each(projects, function(projectData)
    {
      testimonial = Testimonials.find({project: projectData._id});
      testimonialCount += testimonial.count();
      projectCount++;
      projectsToDelete += projectData.name + "\n";
    });

    clientName= ClientCompanies.findOne({_id: clientId}).name;
    Session.set("clientName_deleteClient", clientName);
    Session.set("projectCount_deleteClient", projectCount);
    Session.set("testimonialCount_deleteClient", testimonialCount);

    Session.set("projectsToDelete", projectsToDelete);
    Session.set("projectsToDelete_objects", projects);
    Session.set("clientToDelete_id", clientId);

    console.log("done .deleteClient");
    
  },

  'click .deleteAuthor': function()
  {
    var authorId = this._id;
    var testimonialCount = 0;
    var projectCount = 0;
    var projectsToDelete = "";
    var testimonialData = undefined;
    Session.set("deleteAuthor", authorId);
    var testimonials = Testimonials.find({author: authorId}).fetch();
    _.each(testimonials, function(testimonialData)
    {
      project = Projects.findOne({_id: testimonialData.project});
      testimonialCount++;;
      projectCount++;
      projectsToDelete += project.name + "\n";
    });

    Session.set("projectCount_deleteAuthor", projectCount);
    Session.set("testimonialCount_deleteAuthor", testimonialCount);

    Session.set("projectsToDelete", projectsToDelete);
    Session.set("authorToDelete_id", authorId);

    console.log("done .deleteAuthor");
    
  },

  'click .deleteCategory': function()
  {
    var projectsToDelete = "";
    var categoryId = this._id;
    var testimonialCount = 0;
    var projectCount = 0;
    var testimonial;
    var projectData = undefined;
    Session.set("deleteCategory", categoryId);
    var projects = Projects.find({categories: categoryId}).fetch();
    _.each(projects, function(projectData)
    {
      testimonial = Testimonials.find({project: projectData._id});
      testimonialCount += testimonial.count();
      projectCount++;
      projectsToDelete += projectData.name + "\n";
    });

    categoryName= Categories.findOne({_id: categoryId}).name;
    Session.set("categoryName_deleteCategory", categoryName);
    Session.set("projectCount_deleteCategory", projectCount);
    Session.set("testimonialCount_deleteCategory", testimonialCount);

    Session.set("projectsToDelete", projectsToDelete);
    Session.set("projectsToDelete_objects", projects);
    Session.set("categoryToDelete_id", categoryId);

    console.log("done .deleteCategory");
    
  },

  'click .deleteTag': function()
  {
    var projectsToDelete = "";
    var tagId = this._id;
    var testimonialCount = 0;
    var projectCount = 0;
    var testimonial;
    var projectData = undefined;
    Session.set("deleteTag", tagId);
    var projects = Projects.find({tags: tagId}).fetch();
    _.each(projects, function(projectData)
    {
      testimonial = Testimonials.find({project: projectData._id});
      testimonialCount += testimonial.count();
      projectCount++;
      projectsToDelete += projectData.name + "\n";
    });

    tagName= Tags.findOne({_id: tagId}).name;
    Session.set("tagName_deleteTag", tagName);
    Session.set("projectCount_deleteTag", projectCount);
    Session.set("testimonialCount_deleteTag", testimonialCount);

    Session.set("projectsToDelete", projectsToDelete);
    Session.set("projectsToDelete_objects", projects);
    Session.set("tagToDelete_id", tagId);

    console.log("done .deleteTag");
    
  },

  'click .deleteSSInput': function()
  {
    var SSInputId = this._id;
    //console.log("HEREEEEE: " + SSInputId);
    //Session.set("deleteSSInput", SSInputId);
    //ssInputName = SuccessStoryInputs.findOne({_id: ssInputId}).input;
    //Session.set("ssInputName_deleteSSInput", ssInputName);
    Session.set("ssInputToDelete_id", SSInputId);

    console.log("done .deleteSSInput");
  },

  'click .clientEdit': function() {
    Session.set("editDelete", 1); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
  },

  'click .authorEdit': function() {
    Session.set("editDelete", 2); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
  },

  'click .categoryEdit': function() {
    Session.set("editDelete", 3); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
  },

  'click .tagEdit': function() {
    Session.set("editDelete", 4); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
  },

  'click .ssInputEdit': function() {
    Session.set("editDelete", 5); // 0=none, 1=client, 2=author, 3=category, 4=tag, 5=ssInput
  }
  
}