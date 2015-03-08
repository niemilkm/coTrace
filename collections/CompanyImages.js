var CompanyImages = new FS.Store.GridFS('companyImages');

var CImages = new FS.Collection('companyImages', {
 stores: [CompanyImages]
});

Meteor.methods({
	companyImages_insert: function(file)
	{
		CImages.insert({file: file});
	}
	
	// CImages.insert(file, function (err, fileObj) {
 //    if (err){
 //       // handle error
 //    } else {
 //       // handle success depending what you need to do
 //      var imagesURL = {
 //        “company.image”: “/cfs/files/images/“ + fileObj._id
 //      };
 //      Meteor.users.update(userId, {$set: imagesURL});
 //    }
 //  });
})

CImages.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

CImages.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});