Template.adminModal_addAuthor.events = 
{
	'click #addAuthorDetails': function()
	{
		var authorInfo 		= true;
    var authorName    = $('#authorName_add').val().trim();
    var authorCompany = $('#authorCompany_add').val().trim();
    var authorTitle   = $('#authorTitle_add').val().trim();
    var authorPhone   = $('#authorPhone_add').val().trim();
    var authorEmail   = $('#authorEmail_add').val().trim();

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
        alert("Author already exists with the same Name, Company, Title, Phone, and Email. Please change author attribute(s) or Cancel");
        authorInfo = false;
      }
    }

    if (authorInfo)
    {
      var authorDetails = {
                            name:           authorName,
                            authorCompany:  authorCompany,
                            title:          authorTitle,
                            phone:          authorPhone,
                            email:          authorEmail
                          };
      Meteor.call("insert_author", authorDetails, function(error, result) {
      });
      $('#adminModal_addAuthor').modal('hide'); 
    }
	}
}