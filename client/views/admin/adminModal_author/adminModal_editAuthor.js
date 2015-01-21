Template.adminModal_editAuthor.events = 
{
	'click #editAuthorDetails': function()
	{
		var authorInfo 		= true;
    var authorName    = $('#authorName').val().trim();
    var authorCompany = $('#authorCompany').val().trim();
    var authorTitle   = $('#authorTitle').val().trim();
    var authorPhone   = $('#authorPhone').val().trim();
    var authorEmail   = $('#authorEmail').val().trim();

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
        alert("Author already exists with the same Name, Company, Title, Phone, and Email or no Author information was changed. Please change author attribute or Cancel");
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
      Meteor.call("update_author", authorDetails, Session.get("editAuthor"), function(error, result) {
      });
      $('#adminModal_editAuthor').modal('hide'); 
    }
	}
}