 var successiconUrl= 'http://localhost/feemaster/assets/images/icons/success.png';
  var failiconUrl= 'http://localhost/feemaster/assets/images/icons/warning.png';
  
$(document).ready(function(){
    $("#loginform").validate({
        rules:{
            username:{required:true},
            password:{required:true}
        },
        messages:{
             username:{required:"Username is required!"},
            password:{required:"Password is required!"}
        },
        submitHandler:function(form,e){
            e.preventDefault();
            var username = $("#username").val();
            var password =$("#password").val();
            $.ajax({
                url:"home/authenticate",
                type:'post',
                dataType:'json',
                data:{username:username, password:password},
                success:function(data){
                    console.log("user status:"+data.status);
                    if(data.status ==="loggedin"){
                     Loginalert.render("Login Successful, "+data.staffname+". ","Welcome",successiconUrl);
                    }else{
                         alert("invalid login");
                    }
                }
            });
        }
    });
});


function CustomAlert(){
	this.render = function(dialogmessage,popupTilte,iconUrl){
	var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('alertdialogbox');
            
            dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
            dialogbox.style.left = (winW/2) - (395 * .5)+"px";
             
               
	    dialogbox.style.top = "200px";
	    dialogbox.style.display = "block";
            
		document.getElementById('alertdialogboxhead').innerHTML = popupTilte;
	    document.getElementById('alertdialogboxbody').innerHTML = dialogmessage;
            $('#alertdialogboxbody').css("background-image", "url("+iconUrl+")"); 
		document.getElementById('alertdialogboxfoot').innerHTML = '<button class="okBtn" onclick="Loginalert.ok()">OK</button>';
                $(".okBtn").focus();
	};
	this.ok = function(){
               document.getElementById('alertdialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
              window.location.replace("dashboard");
	};
}
var Loginalert = new CustomAlert();



function MessageAlert(){
	this.render = function(dialog,popupTilte,iconUrl){
	var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('alertdialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "200px";
	    dialogbox.style.display = "block";
            
		document.getElementById('alertdialogboxhead').innerHTML = popupTilte;
	    document.getElementById('alertdialogboxbody').innerHTML = dialog;
            $('#alertdialogboxbody').css("background-image", "url("+iconUrl+")"); 
		document.getElementById('alertdialogboxfoot').innerHTML = '<button class="okBtn" onclick="Alert.ok()">OK</button>';
                $(".okBtn").focus();
	};
	this.ok = function(){
		document.getElementById('alertdialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
                $("#searchtxt").focus();
	};
}
var Alert = new MessageAlert();

