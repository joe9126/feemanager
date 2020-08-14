/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

$(document).ready(function(){
     $(".menuitem").click(function(e){
       e.preventDefault(); // prevent browser refresh
        var value = $(this).attr('id');
        window.location.replace(value); // it replaces id to url without refresh
       $(this).addClass('active').siblings().removeClass('active');
       $("#container").load(this.href, function(){ 
       });
   });
});