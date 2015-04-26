
Template.modalEdit_successStory.events = 
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

  'click #editSuccessStoryDetails': function()
  {
    console.log("in editSuccessStoryDetails");

    var successStoryId            = Session.get("successStoryId");
    var authorInfo               = true;
    var executeSuccessStorySubmit = true;
    var author                   = null;
    var project                  = $('#projectName_modalSuccessStory').val().trim();
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
        console.log("this: "); console.log(this);
        //Find all success story input data before submitting to DB
        //var companyId = Companies.findOne({})._id;
        //var ssInputs = SuccessStoryInputs.findOne({}).inputs;
        var ssInputs = this.SSInputs.ssInputs;
        var array = [];
        console.log("answers: ");
        _.each(ssInputs, function(data)
        {
          var index = data.index;
          console.log(index);
          var jquery = 'ans_' + index;
          console.log(jquery);
          var ans = $('#' + jquery).val();
          console.log(ans);
          array.push({ssInputs: data, ans: ans});
          $('#' + jquery).val('');
        });

        if (Session.get("hidden_successStory"))
        {
          var successStoryDetails = {
                                project: project,
                                author: author,
                                SSInputs: array,
                                SSName: successStoryName
                              };

          console.log(successStoryDetails);

          Meteor.call("update_successStory", successStoryDetails, successStoryId)
          var projectId = SuccessStories.findOne({_id: Session.get("successStoryId")}).project;
          var authorId = SuccessStories.findOne({_id: Session.get("successStoryId")}).author;
          var successStory = SuccessStories.findOne({_id: Session.get("successStoryId")}).successStory;
          $('#projectName_modalSuccessStory').val(projectId);
          $('#authorName_modalSuccessStory').val(authorId);
          $('#successStory_modalSuccessStory').val(successStory);
          // $('#authorNameAdd_successStory').val('');
          // $('#authorNameCompany_successStory').val('');
          // $('#authorTitleAdd_successStory').val('');
          // $('#authorPhoneAdd_successStory').val('');
          // $('#authorEmailAdd_successStory').val('');
          $('#modalEdit_successStory').modal('hide');
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
            var successStoryDetails = {
                                project: project,
                                author: result,
                                SSInputs: array,
                                SSName: successStoryName
                              };
            //console.log("author Id after successStory details is: " + author);

            Meteor.call("update_successStory", successStoryDetails, successStoryId)
            var projectId = SuccessStorys.findOne({_id: Session.get("successStoryId")}).project;
            var authorId = SuccessStorys.findOne({_id: Session.get("successStoryId")}).author;
            var successStory = SuccessStorys.findOne({_id: Session.get("successStoryId")}).successStory;
            // $('#projectName_modalSuccessStory').val(projectId);
            // $('#authorName_modalSuccessStory').val(authorId);
            // //$('#successStory_modalSuccessStory').val(successStory);
            // $('#authorNameAdd_successStory').val('');
            // $('#authorNameCompany_successStory').val('');
            // $('#authorTitleAdd_successStory').val('');
            // $('#authorPhoneAdd_successStory').val('');
            // $('#authorEmailAdd_successStory').val('');
            $('#modalEdit_successStory').modal('hide'); 
          });
        }

        
        console.log(author);
      }
    }
  },

  'click #closeModal': function()
  {
    console.log("in close modal");
    var projectId = SuccessStories.findOne({_id: Session.get("successStoryId")}).project;
    var authorId = SuccessStories.findOne({_id: Session.get("successStoryId")}).author;
    //var successStory = SuccessStorys.findOne({_id: Session.get("successStoryId")}).successStory;
    Session.set("hidden", true);
    Session.set("hidden_successStory", true);
    // $('#projectName_modalSuccessStory').val(projectId);
    // $('#authorName_modalSuccessStory').val(authorId);
    // //$('#successStory_modalSuccessStory').val(successStory);
    // $('#authorNameAdd_successStory').val('');
    // $('#authorNameCompany_successStory').val('');
    // $('#authorTitleAdd_successStory').val('');
    // $('#authorPhoneAdd_successStory').val('');
    // $('#authorEmailAdd_successStory').val('');
    var ssInputs = SuccessStoryInputs.findOne({}).inputs;
    _.each(ssInputs, function(data)
    {
      var index = data.index;
      var jquery = "ans_" + index;
      console.log(index + " " + jquery);
      $('#' + jquery).val('');
    });
    $('#modalEdit_successStory').modal('hide'); 
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

Template.modalEdit_successStory.helpers({

  projectSelected: function()
  {
    var projectId = SuccessStories.findOne({_id: Session.get("successStoryId")}).project;
    if (projectId == this._id)
      return "selected";
    else
      return "";
  },

  authorSelected: function()
  {
    var authorId = SuccessStories.findOne({_id: Session.get("successStoryId")}).author;
    if (authorId == this._id)
      return "selected";
    else
      return "";
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

  SSInput: function()
  {
    if (SuccessStories.findOne({_id: this._id}) != undefined)
    {
      var array = [];
      var ss = SuccessStories.findOne({_id: this._id}).SSInputs;
      ss.sort(function(a,b)
      {
        var a_ss_num_int = parseInt(a.ssInputs.num);
        var b_ss_num_int = parseInt(b.ssInputs.num);
        if(a_ss_num_int > b_ss_num_int)
          return 1;
        else if (a_ss_num_int < b_ss_num_int)
          return -1;
        else
          return 0;
      });
      _.each(ss, function(ssData) {
        array.push({ques:ssData.ssInputs.ques, ans: ssData.ans, index:ssData.ssInputs.index});
      });
      return array;
    }
    return;
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
