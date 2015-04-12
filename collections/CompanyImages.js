CompanyImages = new FileCollection('companyImage', {
  resumable: true, //Enables the resumable.js API on the client
  baseURL: '/companyImages',
  http: [{
    method: 'get',
    path: '/:md5',
    lookup: function(params, query) {
      return { md5: params.md5 }
    }
  }]
});

Meteor.methods({

	remove_companyImages: function(id) {
	}

});

if (Meteor.isServer)
{
	CompanyImages.allow({
		insert: function () {
		    return true;
		},

		remove: function () {
		    return true;    
		},
		read: function() {
	      return true;
	    },
	    write: function() {
	      return true;
	    }

	});
}



