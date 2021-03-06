
Template.modalEdit_testimonial.events = 
{

	'click .left-arrow': function()
	{
    Session.set("hidden_testimonial", true);
    $('.authorSelect').show();
  },

  'click .right-arrow': function()
  {
    Session.set("hidden_testimonial", false);
    $('.authorSelect').hide();
  },

  'click #addTestimonialDetails': function()
  {
    var testimonialId            = Session.get("testimonialId");
    var authorInfo               = true;
    var executeTestimonialSubmit = true;
    var author                   = null;
    var project                  = $('#projectName_modalTestimonial').val().trim();
    var testimonial              = $('#testimonial_modalTestimonial').val().trim();

    if (project == "" || project == null || project == undefined)
    {
      alert("Please Enter Project Name");
      executeTestimonialSubmit = false;
    }
    else if (testimonial == "" || testimonial == null || testimonial == undefined)
    {
      alert("Please Enter Testimonial");
      executeTestimonialSubmit = false;
    }
    else
    {
      if (Session.get("hidden_testimonial"))
      {
        author = $('#authorName_modalTestimonial').val().trim();
        if (author == "" || author == null || author == undefined)
        {
          alert("Please Enter Author");
          authorInfo = false;
        }
      }
      else
      {
        var authorName    = $('#authorNameAdd_testimonial').val().trim();
        var authorCompany = $('#authorCompanyAdd_testimonial').val().trim();
        var authorTitle   = $('#authorTitleAdd_testimonial').val().trim();
        var authorPhone   = $('#authorPhoneAdd_testimonial').val().trim();
        var authorEmail   = $('#authorEmailAdd_testimonial').val().trim();

        if (authorName == "" || authorName == null || authorName == undefined)
        {
          alert("Please Enter Author Name");
          authorInfo = false;
        }
        else if (authorCompany == "" || authorCompany == null || authorCompany == undefined)
        {
          alert("Please Enter Author Company");
          authorInfo = false;
        }
        else if (authorTitle == "" || authorTitle == null || authorTitle == undefined)
        {
          alert("Please Enter Author Title");
          authorInfo = false;
        }
        else if (authorPhone == "" || authorPhone == null || authorPhone == undefined)
        {
          alert("Please Enter Author Phone");
          authorInfo = false;
        }
        else if (authorEmail == "" || authorEmail == null || authorEmail == undefined)
        {
          alert("Please Enter Author Email");
          authorInfo = false;
        }
        else
        {
          var authorExistAlready = Authors.findOne({name: authorName, authorCompany: authorCompany, title: authorTitle, phone: authorPhone, email: authorEmail});
          if (authorExistAlready != null && authorExistAlready != undefined)
          {
            alert("Author already exists with the same Name, Company, Title, Phone, and Email. Please add a new author or toggle Add Author to select Author on the main Add Testimonial page");
            authorInfo = false;
          }
        }
      }

      if (authorInfo && executeTestimonialSubmit)
      {

        if (Session.get("hidden_testimonial"))
        {
          var testimonialDetails = {
                                project: project,
                                author: author,
                                testimonial: testimonial
                              };
          console.log("author Id after testimonial details is: " + author);

          Meteor.call("update_testimonial", testimonialDetails, testimonialId)
          var projectId = Testimonials.findOne({_id: Session.get("testimonialId")}).project;
          var authorId = Testimonials.findOne({_id: Session.get("testimonialId")}).author;
          var testimonial = Testimonials.findOne({_id: Session.get("testimonialId")}).testimonial;
          $('#projectName_modalTestimonial').val(projectId);
          $('#authorName_modalTestimonial').val(authorId);
          $('#testimonial_modalTestimonial').val(testimonial);
          $('#authorNameAdd_testimonial').val('');
          $('#authorNameCompany_testimonial').val('');
          $('#authorTitleAdd_testimonial').val('');
          $('#authorPhoneAdd_testimonial').val('');
          $('#authorEmailAdd_testimonial').val('');
          $('#modalEdit_testimonial').modal('hide');
        }
        else
        {
          var authorDetails = {
                                name:           authorName,
                                authorCompany:  authorCompany,
                                title:          authorTitle,
                                phone:          authorPhone,
                                email:          authorEmail,
                                client:         Projects.findOne({_id: project}).clientCompany
                              };
          Meteor.call("insert_author", authorDetails, function(error, result) {
            var testimonialDetails = {
                                project: project,
                                author: result,
                                testimonial: testimonial
                              };
            //console.log("author Id after testimonial details is: " + author);

            Meteor.call("update_testimonial", testimonialDetails, testimonialId)
            var projectId = Testimonials.findOne({_id: Session.get("testimonialId")}).project;
            var authorId = Testimonials.findOne({_id: Session.get("testimonialId")}).author;
            var testimonial = Testimonials.findOne({_id: Session.get("testimonialId")}).testimonial;
            $('#projectName_modalTestimonial').val(projectId);
            $('#authorName_modalTestimonial').val(authorId);
            $('#testimonial_modalTestimonial').val(testimonial);
            $('#authorNameAdd_testimonial').val('');
            $('#authorNameCompany_testimonial').val('');
            $('#authorTitleAdd_testimonial').val('');
            $('#authorPhoneAdd_testimonial').val('');
            $('#authorEmailAdd_testimonial').val('');
            $('#modalEdit_testimonial').modal('hide'); 
          });
        }

        
        console.log(author);
      }
    }
  },

  'click .modalClose': function()
  {
    var projectId = Testimonials.findOne({_id: Session.get("testimonialId")}).project;
    var authorId = Testimonials.findOne({_id: Session.get("testimonialId")}).author;
    var testimonial = Testimonials.findOne({_id: Session.get("testimonialId")}).testimonial;
    Session.set("hidden", true);
    Session.set("hidden_testimonial", true);
    $('#projectName_modalTestimonial').val(projectId);
    $('#authorName_modalTestimonial').val(authorId);
    $('#testimonial_modalTestimonial').val(testimonial);
    $('#authorNameAdd_testimonial').val('');
    $('#authorNameCompany_testimonial').val('');
    $('#authorTitleAdd_testimonial').val('');
    $('#authorPhoneAdd_testimonial').val('');
    $('#authorEmailAdd_testimonial').val('');
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

  'click .closeModal': function()
  {
    Session.set("hidden", true);
    Session.set("hidden_testimonial", true);
  }

}

Template.modalEdit_testimonial.helpers({

  projectSelected: function()
  {
    var projectId = Testimonials.findOne({_id: Session.get("testimonialId")}).project;
    if (projectId == this._id)
      return "selected";
    else
      return "";
  },

  authorSelected: function()
  {
    var authorId = Testimonials.findOne({_id: Session.get("testimonialId")}).author;
    if (authorId == this._id)
      return "selected";
    else
      return "";
  },

  testimonialSelected: function()
  {
    return Testimonials.findOne({_id: Session.get("testimonialId")}).testimonial;

  },

  hidden_testimonial: function()
  {
    var hidden_testimonial = Session.get("hidden_testimonial");
    if (hidden_testimonial || hidden_testimonial == undefined)
    {
      $('.authorSelect').show();
      return true;
    }
    else
    {
      $('.authorSelect').hide();
      return false;
    }
  },

  project: function()
  {
    return Projects.find({}).fetch();
  },

  author: function()
  {
    return Authors.find({}).fetch();
  }

})
