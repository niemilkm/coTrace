Template.client.helpers({

	eachClient: function()
	{
		return ClientCompanies.find({});
	},

	isImage: function(id)
	{
		if (CompanyImages.findOne({"metadata.clientCompany": id}) != undefined)
		{
			var types = ['image/jpeg','image/png','image/gif', 'image/tiff'];
			var ci = CompanyImages.findOne({"metadata.clientCompany": id}).contentType;
	    	return _.contains(types, ci);
	    }
	},

	uploadFileName: function()
	{
		if (Session.get('fileChosen'))
		{
			return Template.client.uploadFile.fileName;
		}
		return "Choose Client Image";
	},

	companyImage_id: function(id)
	{
		if (CompanyImages.findOne({"metadata.clientCompany": id}) != undefined)
		{
			var ci = CompanyImages.findOne({"metadata.clientCompany": id}).md5;
			return CompanyImages.baseURL + "/" + ci;
		}
	},

	companyImage_edit: function()
	{
		console.log("companyImage_edit");
		var ci = CompanyImages.findOne({"metadata.clientCompany": Session.get("editClient")}).md5;
		return CompanyImages.baseURL + "/" + ci;
	},

	isImage_edit: function()
	{
		console.log("isImage_edit");
		var types = ['image/jpeg','image/png','image/gif', 'image/tiff'];
		var ci = CompanyImages.findOne({"metadata.clientCompany": Session.get("editClient")}).contentType;
    	return _.contains(types, ci);
	},

});

Template.adminModal_editClient.helpers({
	companyImage_edit: function()
	{
		if (CompanyImages.findOne({"metadata.clientCompany": Session.get("editClient")}))
		{
			var ci = CompanyImages.findOne({"metadata.clientCompany": Session.get("editClient")}).md5;
			return CompanyImages.baseURL + "/" + ci;
		}
	},

	isImage_edit: function()
	{
		if (CompanyImages.findOne({"metadata.clientCompany": Session.get("editClient")}))
		{
			var types = ['image/jpeg','image/png','image/gif', 'image/tiff'];
			var ci = CompanyImages.findOne({"metadata.clientCompany": Session.get("editClient")}).contentType;
	    	return _.contains(types, ci);
    	}
	},

	uploadFileName_edit: function()
	{
		if (Session.get('fileChosen'))
		{
			return Template.adminModal_editClient.uploadFile.fileName;
		}
		return "Choose Client Image";
	},
});


Template.client.events =
{
	'click .editClient': function()
	{
		var clientName = ClientCompanies.findOne({_id: this._id}).name
		Session.set("editClient", this._id);
		$('#clientEdit').val( clientName );
		Session.set('uploading', false);
		Template.client.uploadFile = undefined;
		Session.set('fileChosen', false);
	},

	'click #editClientDetails': function()
	{
		var clientName = $('#clientEdit').val().trim();
		Meteor.call("update_client", Session.get("editClient"), clientName);
		$('#clientEdit').val('')
		$('#adminModal_editClient').modal('hide');
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
			if (Template.client.uploadFile)
			{
			  $('#clientAdd').val('');
			  Meteor.call("insert_client", client, function(error, result_id)
			  {
			  	if (!error)
			  	{
			  		var file = Template.client.uploadFile;
			  		console.log("the result is: ");
	    			console.log(result_id);
			  		//var file = uploadFile;
			  		CompanyImages.insert(	{
							    _id: file.uniqueIdentifier,
							    filename: file.fileName,
							    contentType: file.file.type,
							    metadata: 	{ 
							    				owner: Meteor.userId(),
							    				clientCompany: result_id
							    			}
	  						},
	  			function(err, _id)
	  			{
				    if (err)
				    {
				      console.warn('File creation failed', err);
				      return;
					}
					else
						Session.set('uploading', true);
	    			// Once the document has been created we can upload our file information.
	    				CompanyImages.resumable.upload();
	    				Session.set('fileChosen', false);
	    				
	  			});

			  	}
			  	$('#companyLogoImage_upload').prop('disabled', false);
			  });
			}
			else
				console.log("error add client upload file - undefined");
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

	},

	// 'click [data-action=delete]': function(e, instance) {
	// 	e.preventDefault();
	// 	CompanyImages.remove({_id: this._id});
	// 	$('#companyLogoImage_upload').prop('disabled', false);
	// }

}

Template.client.onRendered(function()
{

	Session.set('fileChosen', false);
	CompanyImages.resumable.cancel(true); //this does not work but found work around
	Template.client.uploadFile = undefined;


  CompanyImages.resumable.assignBrowse($('#companyLogoImage_upload'));

  CompanyImages.resumable.on('fileAdded', function(file) {
	$('#companyLogoImage_upload').prop('disabled', true);

	Template.client.uploadFile = file;
	Session.set('fileChosen', true);
	console.log("in resumable fileAdded");

  });


  // Another resumable event. Fires when the file has successfully been uploaded.
  // We're just using it to hide our uploading indicator.
  CompanyImages.resumable.on('fileSuccess', function(file) {
    Session.set('uploading', undefined);
  });

  // Another resumable event. Fires when the file upload encounters an error.
  // Used to hide uploading indicator and inform user of an error.
  CompanyImages.resumable.on('fileError', function(file) {
    console.warn("Error uploading", file.uniqueIdentifier);
    Session.set('uploading', undefined);
  });



});

Template.client.onCreated(function()
{
  	Session.set('uploading', undefined);
});

Template.adminModal_editClient.onRendered(function()
{

	Session.set('fileChosen', false);
	CompanyImages.resumable.cancel(true); //this does not work but found work around
	Template.adminModal_editClient.uploadFile = undefined;


  CompanyImages.resumable.assignBrowse($('#companyLogoImage_upload_edit'));

  CompanyImages.resumable.on('fileAdded', function(file) {
	$('#companyLogoImage_upload_edit').prop('disabled', true);

	Template.adminModal_editClient.uploadFile = file;
	Session.set('fileChosen', true);
	console.log("in resumable fileAdded");

  });


  // Another resumable event. Fires when the file has successfully been uploaded.
  // We're just using it to hide our uploading indicator.
  CompanyImages.resumable.on('fileSuccess', function(file) {
    Session.set('uploading', undefined);
  });

  // Another resumable event. Fires when the file upload encounters an error.
  // Used to hide uploading indicator and inform user of an error.
  CompanyImages.resumable.on('fileError', function(file) {
    console.warn("Error uploading", file.uniqueIdentifier);
    Session.set('uploading', undefined);
  });



});



