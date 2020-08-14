    var iconUrl= 'http://localhost/support/assets/images/icons/warning.png';
      var successiconUrl= 'http://localhost/support/assets/images/icons/success.png';
       var confirmiconUrl= 'http://localhost/support/assets/images/icons/verify.png';
       
$(document).ready(function(){
    $(".datepicker").datepicker({ dateFormat: "dd MM,yy" });
  $("form :input").attr("autocomplete", "off");
});


 /* UPDATE BROWSER URL ON A HREF CLICK */
 $(document).ready(function(e){
       $('a').click(function(e){
            e.preventDefault();
            var value = $(this).attr('id');
            window.location.replace(value); // it replaces id to url without refresh
        });
});  
 /* END OF UPDATE BROWSER URL ON A HREF CLICK */ 

$(document).ready(function(){
    $.ajax({
        url:"home/getclasses",
        type:"post",
        dataType:"json",
        success:function(data){
            console.log("class data "+data[0].CLASSNAME);
            $.each(data, function(index, value){
             var classoption ="<option value="+value.CLASSID+">"+value.CLASSNAME+" "+value.NUM_NAME+"</option>";   
             $("#admissionclass").append(classoption);
             
           
            });
        }
    });
    
    $.ajax({
        url:"home/getstreams",
         type:"post",
        dataType:"json",
        success:function(data){
            console.log(data);
            $.each(data,function(index,value){
                var streamoption ="<option value="+value.STREAMID+">"+value.STREAMNAME+"</option>";   
             $("#admissionstream").append(streamoption);
            });              
                         
        }
    });
});

function openTab(evt,tabid){
    var i;
    var x = document.getElementsByClassName("tabcontainer");
    for(i=0;i<x.length;i++){
        x[i].style.display = "none";
        console.log("tab hidden");
         document.getElementById(tabid).style.display = "block";
    }
}

$(document).ready(function(){
    $("#dialogbox").keyup(function(event){
        if(event.keyCode===13){
            document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
        }
    });
});

$(document).ready(function(){
    $(".tabhead").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});


$(document).ready(function(){
    $("input[name=disability]").click(function(){
      var disability = $("input[name=disability]:checked").val(); 
      if(disability==="No"){
           $("#disability_name").css({"display":"none"});
            $("#disability_name").val("None");
      }else{
        $("#disability_name").css({"display":"block"});
        $("#disability_name").val("");
            $("#disability_name").focus();
      }
     
    });
    
       $("input[name=medicalcondition]").click(function(){
      var medicalcondition = $("input[name=medicalcondition]:checked").val(); 
      if(medicalcondition==="No"){
           $("#medicalconditionname").css({"display":"none"});
            $("#medicalconditionname").val("None");
      }else{
        $("#medicalconditionname").css({"display":"block"});
        $("#medicalconditionname").val("");
            $("#medicalconditionname").focus();
      }
     
    });
    
   $("#studregform").validate({
       rules:{
           admndate:{required:true},
           admno:{required:true},
           fname:{required:true},
           mname:{required:true},
           gender:{required:true},
           disability:{required:true},
           medicalcondition:{required:true},
           admissionclass:{required:true},
           idno:{required:true},
           gfname:{required:true},
           glname:{required:true},
           relationship:{required:true},
           phoneno:{required:true,number:true, minlength:10,maxlength:10},
           residence:{required:true},
           street:{required:true},
           city:{required:true}
       },
       messages:{
            admndate:{required:"Admission date required"},
           admno:{required:"Admission number required"},
           fname:{required:"First name required"},
           mname:{required:"Middle name required"},
           gender:{required:"Gender required"},
           disability:{required:"Specify if disabled or not"},
           medicalcondition:{required:"Specify medical condition if any"},
           admissionclass:{required:"Admission class required"},
           idno:{required:"ID number required"},
           gfname:{required:"First name required"},
           glname:{required:"Last name required"},
           relationship:{required:"Relationship required"},
           phoneno:{required:"Phone number required",number:"Must be numeric", minlength:"Invalid phone number",maxlength:"Invalid phone number"},
           residence:{required:"Residence required"},
           street:{required:"Street address required"},
           city:{required:"City required"}
       },
       submitHandler:function(form,e){
           e.preventDefault();
          var admndate = $("#admndate").val();
          var admno = $("#admno").val();
          var fname = $("#fname").val();
         var mname = $("#mname").val();
         var lname = $("#lname").val();
         var gender = $("input[name=gender]:checked").val();
         
         var disability = $("#disability_name").val();
         
          if(!$("#disability").val()==="Yes"){
               $("#disability_name").focus();
              Alert.render("Please specify disability!","Alert",failiconUrl);
          }
          else  if(!$("#medicalcondition").val()==="Yes"){
               $("#medicalconditionname").focus();
              Alert.render("Please specify medical condition!","Alert",failiconUrl);
          }else{
          var db_admno = function(){
              var temp=null;
              $.ajax({
                    url:"",
                     type:"post",
                    dataType:"text",
                    data:{admno:admno},
                    success:function(data){
                        temp = data;
                        }
                        });    
                  return temp; 
              }();
              if(db_admno ===admno){
                  Alert.render("Admission number "+admno+" already exists!","Alert",failiconUrl); 
              }else{
                  Confirm.render("Register "+fname+" "+lname+" with admission number "+admno+"?","Confirm Registration","studreg");
              }
             }
          
       }
   }); 
});

function confirmDialog(){
    this.render = function(dialog,title,op){
        console.log("confirmation dialog initiated.");
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay =  document.getElementById("dialogoverlay");
        var dialogbox = document.getElementById("dialogbox");
        
        // style the dialog overlay window
        dialogoverlay.style.display = "block";
         dialogoverlay.style.height = winH+"px";
          dialogoverlay.style.width = winW+"px";
          //Style the dialog box;
           dialogbox.style.left = (winW/2) - (550 * .5)+"px";
           dialogbox.style.top = "200px";
           dialogbox.style.display = "block";
           
     document.getElementById("dialogboxhead").innerHTML = title;
     document.getElementById("dialogboxbody").innerHTML = dialog;
   document.getElementById('dialogboxfoot').innerHTML = '<button class="okBtn" onclick="Confirm.yes(\''+op+'\')">Yes</button> <button class="okBtn" onclick="Confirm.no()">No</button>';
 //  $(".okBtn").focus();
    };
    
    this.no = function(){
        document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
        $("#searchtxt").focus();
    };

this.yes = function(op,itemid,qty){
    if(op === "studreg"){
        $(registeStudent);
        document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
            }
 else if(op === 'update_qty'){
     updateStock(itemid,qty); // function found in inventory.js file
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
 } else{
     alert("something's worng. OP value is "+op);
 }  
};
}
var Confirm = new confirmDialog();

function registeStudent(){
          var admndate = $("#admndate").val();
          var admno = $("#admno").val();
          var fname = $("#fname").val();
         var mname = $("#mname").val();
         var lname = $("#lname").val();
         var gender = $("input[name=gender]:checked").val();
         var disability = $("#disability_name").val();
         var medcondition = $("#medicalconditionname").val();
         var studclass = $("#admissionclass option:selected").val();
         var admstream = $("#admissionstream option:selected").val();
         var gid = $("#idno").val();
         var gfname = $("#gfname").val();
         var glname = $("#glname").val();
         var age = $("#age").val();
         var relation = $("#relationship option:selected").val();
         var occupation = $("#occupation").val();
         var phone = $("#phoneno").val();
         var altphone = $("#altphoneno").val();
         var email = $("#email").val();
         var altemail = $("#altemail").val();
         var residence = $("#residence").val();
         var street =  $("#street").val();
         var address = $("#address").val();
         var city = $("#city").val();
         
        var studentdata = [{"ADMNDATE":moment(admndate).format("YYYY-MM-DD"),"ADMNO":admno,"FNAME":fname,"MNAME":mname,"LNAME":lname,"GENDER":gender,"DISABILITY":disability
            ,"MEDCON":medcondition,"ADMCLASS":studclass,"ADMSTREAM":admstream,"GUARDID":gid,"GFNAME":gfname,"GLNAME":glname,"AGE":age,
            "RELATIONSHIP":relation,"OCCUP":occupation,"PHONE":phone,"ALTPHONE":altphone,"EMAIL":email,"ALTEMAIL":altemail,"RESIDENCE":residence,
            "STREET":street,"ADDRESS":address,"CITY":city}];
        
        var data = JSON.stringify(studentdata);
        $.ajax({
            url:"students/register",
            type:"post",
            dataType:"text",
            data:{data:data},
            cache:false,
            success:function(status){
                console.log(status);
                if(status==="successfull"){
                    Alert.render(fname+" "+mname+" registered successfully","Success",successiconUrl);
                }else{
                   Alert.render("Registeration not successfull. Try again!","Success",iconUrl);  
                }
            }
        });
}