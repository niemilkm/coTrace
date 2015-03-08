Template.dashboard.rendered = function()
{
  $('#searchSidebar').hide();
}

Template.dashboard.helpers({

});

Template.dashboard.events = 
{
  'click .searchModal': function(e)
  {
    $('#searchSidebar').toggle();
  }

}

// Template.dashboard.rendered = function()
// {
//   setTimeout(function()
//   {
//     masonize(function()
//     {
//       //$('.search-query').focus();
//     })
//   }, 500);
// }

// function masonize(callback)
// {
//   var container = $('#mainContent');
//   console.log("ran masonize");
//   container.masonry(
//   {
//     itemSelector:'.projectItem',
//     columnWidth: 50,
//     gutter:20
//   })
//   if(callback){callback()};
// }