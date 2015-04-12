Template.client.helpers({

	eachClient: function()
	{
		return ClientCompanies.find({});
	},

	companyImage: function()
	{
		return CompanyImages.find();
	},

	link: function()
	{
		return CompanyImages.baseURL + "/" + this.md5;
	},

	isImage: function()
	{
		var types = ['image/jpeg','image/png','image/gif', 'image/tiff'];
    	return _.contains(types, this.contentType);
	},

});

Template.client.events =
{
	'click .editClient': function()
	{
		var clientName = ClientCompanies.findOne({_id: this._id}).name
		Session.set("editClient", this._id);
		$('#clientEdit').val( clientName );
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
		  $('#clientAdd').val('');
		  Meteor.call("insert_client", client, function(error, result)
		  {
		  	if (!error)
		  		CompanyImages.resumable.upload();
		  	$('#companyLogoImage_upload').prop('disabled', false);
		  });
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

	'click [data-action=delete]': function(e, instance) {
		e.preventDefault();
		CompanyImages.remove({_id: this._id});
		$('#companyLogoImage_upload').prop('disabled', false);
	}

}

Template.client.onRendered(function()
{
	console.log("onRendered ran");
	// Assign our button to be a browse button with resumable.
  CompanyImages.resumable.assignBrowse($('#companyLogoImage_upload'));

  // When you select a file this event fires at which point we upload the file.
  CompanyImages.resumable.on('fileAdded', function(file) {
	$('#companyLogoImage_upload').prop('disabled', true);
			
  	CompanyImages.insert(	{
						    _id: file.uniqueIdentifier,
						    filename: file.fileName,
						    contentType: file.file.type,
						    metadata: 	{ 
						    				owner: Meteor.userId(),
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
    			// CompanyImages.resumable.upload();
  			});
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




