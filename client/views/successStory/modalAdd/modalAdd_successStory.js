
Template.modalAdd_successStory.events = 
{

	'click .left-arrow': function()
	{
    Session.set("hidden_successStory", true);
    $('.authorSelect').show();
  },

  'click .right-arrow': function()
  {
    Session.set("hidden_successStory", false);
    $('.authorSelect').hide();
  },

  'click #addSuccessStoryDetails': function()
  {
    var authorInfo                = true;
    var executeSuccessStorySubmit = true;
    var author                    = null;
    var project                   = $('#projectName_modalSuccessStory').val().trim();
    //var successStory              = $('#successStory_modalSuccessStory').val().trim();
    var successStoryName          = $('#successStoryName_modalSuccessStory').val().trim();

    if (project == "" || project == null || project == undefined)
    {
      alert("Please Enter Project Name");
      executeSuccessStorySubmit = false;
    }
    // else if (successStory == "" || successStory == null || successStory == undefined)
    // {
    //   alert("Please Enter SuccessStory");
    //   executeSuccessStorySubmit = false;
    // }
    else if (successStoryName == "" || successStoryName == null || successStoryName == undefined)
    {
      alert("Please Enter Success Story Name");
    }
    else
    {
      if (Session.get("hidden_successStory"))
      {
        author = $('#authorName_modalSuccessStory').val().trim();
        if (author == "" || author == null || author == undefined)
        {
          alert("Please Enter Author");
          authorInfo = false;
        }
      }
      else
      {
        var authorName    = $('#authorNameAdd_successStory').val().trim();
        var authorCompany = $('#authorCompanyAdd_successStory').val().trim();
        var authorTitle   = $('#authorTitleAdd_successStory').val().trim();
        var authorPhone   = $('#authorPhoneAdd_successStory').val().trim();
        var authorEmail   = $('#authorEmailAdd_successStory').val().trim();

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
            alert("Author already exists with the same Name, Company, Title, Phone, and Email. Please add a new author or toggle Add Author to select Author on the main Add SuccessStory page");
            authorInfo = false;
          }
        }
      }

      if (authorInfo && executeSuccessStorySubmit)
      {
        //Find all success story input data before submitting to DB
        var companyId = Companies.findOne({})._id;
        var ssInputs = SuccessStoryInputs.findOne({}).inputs;
        var array = [];
        _.each(ssInputs, function(data)
        {
          var index = data.index;
          var jquery = "ans_" + index;
          var ans = $('#' + jquery).val();
          array.push({ssInputs: data, ans: ans});
          $('#' + jquery).val('');
        });

        //Submit to DB if already have Author\Contact Info
        if (Session.get("hidden_successStory"))
        {
          var successStoryDetails = {
                                project: project,
                                author: author,
                                SSInputs: array,
                                SSName: successStoryName
                              };
          console.log("author Id after successStory details is: " + author);
          Meteor.call("insert_successStory", successStoryDetails)
          $('#projectName_modalSuccessStory').val('');
          $('#authorName_modalSuccessStory').val('');
          $('#authorCompany_modalSuccessStory').val('');
          $('#successStory_modalSuccessStory').val('');
          $('#authorNameAdd_successStory').val('');
          $('#authorCompanyAdd_modalSuccessStory').val('');
          $('#authorTitleAdd_successStory').val('');
          $('#authorPhoneAdd_successStory').val('');
          $('#authorEmailAdd_successStory').val('');
          $('#modalAdd_successStory').modal('hide');
        }
        //Submit to DB with new Author\Contact information
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
            var successStoryDetails = {
                                project: project,
                                author: result,
                                SSInputs: array,
                                SSName: successStoryName
                              };
            console.log("author Id after successStory details is: " + author);

            Meteor.call("insert_successStory", successStoryDetails)
            $('#projectName_modalSuccessStory').val('');
            $('#authorName_modalSuccessStory').val('');
            $('#authorCompany_modalSuccessStory').val('');
            //$('#successStory_modalSuccessStory').val('');
            $('#authorNameAdd_successStory').val('');
            $('#authorCompanyAdd_modalSuccessStory').val('');
            $('#authorTitleAdd_successStory').val('');
            $('#authorPhoneAdd_successStory').val('');
            $('#authorEmailAdd_successStory').val('');
            $('#modalAdd_successStory').modal('hide'); 
          });
        }
      }
    }
  },

  'click #closeModal': function()
  {
    Session.set("hidden", true);
    Session.set("hidden_successStory", true);
    $('#projectName_modalSuccessStory').val('');
    $('#authorName_modalSuccessStory').val('');
    $('#authorCompany_modalSuccessStory').val('');
    //$('#successStory_modalSuccessStory').val('');
    $('#authorNameAdd_successStory').val('');
    $('#authorCompanyAdd_modalSuccessStory').val('');
    $('#authorTitleAdd_successStory').val('');
    $('#authorPhoneAdd_successStory').val('');
    var ssInputs = SuccessStoryInputs.findOne({}).inputs;
    _.each(ssInputs, function(data)
    {
      var index = data.index;
      var jquery = "ans_" + index;
      $('#' + jquery).val('');
    });
    $('#authorEmailAdd_successStory').val('');
    $('#modalAdd_successStory').modal('hide'); 
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

  // 'click .closeModal': function()
  // {
  //   Session.set("hidden", true);
  //   Session.set("hidden_successStory", true);
  // }

}

Template.modalAdd_successStory.helpers({

  SSInput: function()
  {
    if (SuccessStoryInputs.findOne({}) != undefined)
    {
      var array = [];
      var ss = SuccessStoryInputs.findOne({}).inputs;
      ss.sort(function(a,b)
      {
        var a_ss_num_int = parseInt(a.num);
        var b_ss_num_int = parseInt(b.num);
        if(a_ss_num_int > b_ss_num_int)
          return 1;
        else if (a_ss_num_int < b_ss_num_int)
          return -1;
        else
          return 0;
      });
      _.each(ss, function(ssData) {
        array.push(ssData);
      });
      return array;
    }
    return;
  },

  hidden_successStory: function()
  {
    var hidden_successStory = Session.get("hidden_successStory");
    if (hidden_successStory || hidden_successStory == undefined)
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
