
 var iconUrl= 'http://localhost/primepos/assets/images/icons/warning.png';
 var successiconUrl = 'http://localhost/primepos/assets/images/icons/success.png';
 var currency ="KSh. ";
 //var baseUrle="";
function opensettingsTab(evt,tabid){
    var i;
    var x =document.getElementsByClassName("tabs");
    for(i=0;i<x.length;i++){
        x[i].style.display = "none";
    }
    document.getElementById(tabid).style.display = "block";
    
}

$(document).ready(function(){
    $.ajax({
        url:baseUrl+"system/getusers",
        type:"post",
        dataType:"json",
        success:function(data){
            var r=1;
            $("#useraccountstable").DataTable({
                data:data,
                columns:[
                    {mRender:function(){
                       var editbutton ="<a class='editrow' onclick='edituser($(this))'><img src='http://localhost/primepos/assets/images/icons/edit.png' width='15px' height='20px'></a>";
                            return editbutton;     
                    }},
                    {mRender:function(){return r++;}},
                     {data:"STAFFID"},
                    {mRender:function(data,type,row){
                            return row.FNAME+" "+row.LNAME;
                    }},
                {data:"TITLE"},
                {data: "OUTLETNAME"},
                {data: "USERNAME"},
                {data: "ROLE"},
                 {data:"STATUS"}
                ],
               "pageLength":5,
               "bLengthChange": false,
               "bAutoWidth":false,
               "autoWidth": true
            });
            
             $("#datatablesearchtxt").keyup(function(){
                   $("#useraccountstable").DataTable().search($(this).val()).draw();
                      });
        }
    });
});
 
   $(document).ready(function(){
        $.ajax({
            url:'http://localhost/primepos/index.php/system/getstaff',
            type: 'post',
            dataType: 'json',
            success:function(data){
                $.each(data, function(index,value){
                var option = "<option value="+value.STAFFID+">"+value.FNAME+" "+value.LNAME+"</option>";
                $("#staffname").append(option);
                });
               
                console.log("staff data: "+data);
             var r=1;
             
             $("#staffregistertable").DataTable({
                 data:data,
                  createdRow: function(row,data,index){
                        $(row).attr('id',index).find('td').eq(2).attr('class','staffidcell');
                         $(row).attr('id',index).find('td').eq(3).attr('class','fnamecell');
                          $(row).attr('id',index).find('td').eq(4).attr('class','lnamecell');
                            $(row).attr('id',index).find('td').eq(5).attr('class','phonecell');
                              $(row).attr('id',index).find('td').eq(6).attr('class','emailcell');
                                $(row).attr('id',index).find('td').eq(7).attr('class','addresscell');
                                  $(row).attr('id',index).find('td').eq(8).attr('class','titlecell');
                                    $(row).attr('id',index).find('td').eq(9).attr('class','basicsalarycell'); 
                                     $(row).attr('id',index).find('td').eq(10).attr('class','benefitscell'); 
                                      $(row).attr('id',index).find('td').eq(11).attr('class','stationcell'); 
                                  
                },
                 columns:[
                     {mRender:function(){
                      var editstaffBtn ="<a class='editrow' onclick='editstaff($(this))'><img src='http://localhost/primepos/assets/images/icons/edit.png' width='15px' height='20px'></a>";       
                      return editstaffBtn;
                         }},
                     {mRender:function(){
                             return r++;
                     }},
                 {data:"STAFFID"},
                 {data:"FNAME"},
                 {data:"LNAME"},
                 {data:"PHONE"},
                 {data:"EMAIL"},
                 {data:"ADDRESS"},
                 {data:"TITLE"},
                  {mRender:function(data,type,row){
                             return currency+row.BASICSALARY;
                     }},
                  {mRender:function(data,type,row){
                             return currency+row.BENEFITS;
                     }},
                 {data:"OUTLETNAME"}
                 ],
                 pageLength:7,
                 autoWidth:true,
                 bLengthChange:false,
                 bAutoWidth:false
                 
             });
             $("#datatablesearchtxt").keyup(function(){
                   $("#staffregistertable").DataTable().search($(this).val()).draw();
                      });
        
  $("#lowermaindiv").load(location.href + " #lowermaindiv");
        
            },
            error:function(){
                console.log("staff data couldnt be loaded");
            }
        });
    });
 

$(document).ready(function(){

    getoutlets();
    
 /*setTimeout(function(){
   window.location.reload(1);
}, 5000);*/
});



jQuery(document).ready(function(){
   
   jQuery("#staffregform").validate({
       rules:{
           staffid:{required:true, minlength:3},
           fname:{ required:true,minlength:3},
           lname:{required:true,minlength:3 },
           phone:{required:false,number:true, minlength:10 },
           email:{ required:false, email:true  },
           address:{required:false, minlength:3 },
           title:{required:false,minlength:3  },
           basicsalary:{  required:false, number:true},
           benefits:{ required:false, number:true},
            station:{ required:true}
             },
       messages:{
           staffid:{  required: "ID number is required",minlength:" at least 3 characters" },
             fname:{  required: "First name is required",minlength:" at least 3 characters" },
               lname:{  required: "Last name is required",minlength:" at least 3 characters" },
                   phone:{ number: "Must be a number!",minlength:" at least 10 characters"},
                       email:{  email: "Must be a valid email " },
                           address:{ minlength: "at least 3 characters!" },
                               title:{ minlength: "at least 3 characters!"},
                                   basicsalary:{  number: "Must be a number!"},
                                    benefits:{ number: "Must be a number!"},
                                     station:{  required: "Station is required"}
                                         },
       submitHandler: function(form,e) {
      e.preventDefault();
     var idno = $("#staffid").val();
     var fname = $("#fname").val();
     var lname = $("#lname").val();
     var phone = $("#phone").val();
     var email = $("#email").val();
     var address = $("#address").val();
     var title = $("#title").val();
     var salary = $("#monthlysalary").val();
     var benefits = $("#benefits").val();
     var station = $("#station option:selected").val();
    
$.ajax({
    url: "http://localhost/primepos/index.php/system/updatestaffs",
    type:"post",
    dataType:'json',
    data:{idno:idno,fname:fname,lname:lname,phone:phone,email:email,address:address,title:title,
    salary:salary,benefits:benefits,station:station},
    success:function(data){
         console.log(data.status); 
       
         if(data.status ===1){
           Alert.render(fname+" "+lname+' details saved successfully!',"Notification",iconUrl); 
          getStaff();
         document.getElementById("staffregform").reset(); //RESET THE FORM 
         }else{
           Alert.render(fname+" "+lname+' Was not registered!',"Notification",iconUrl);
         }
    }
});
}
   });
});


$(document).ready(function(){
 
$("#usersform").validate({
    rules:{
        staffname:{required:true},
        user_selectstation:{required:true},
        user_username:{required:true, minlength:3},
        user_password:{required:true,minlength:8},
         user_passwordconfirm:{required:true,minlength:8},
        user_auth:{required:true},
        user_status:{required:true}
    },
    messages:{
         staffname:{required:"Staff name is required!"},
        user_selectstation:{required:"Station is required!"},
        user_username:{required:"Username is required!",minlength:" At least 3 characters long!"},
        user_password:{required:"Password is required!",minlength:"At least 8 characters long!"},
        user_passwordconfirm:{required:"Confirmation password is required!",minlength:"At least 8 characters long!"},
        user_auth:{required:"Authorization is required!"},
        user_status:{required:"Status is requried!"}
    }, 
    submitHandler:function(form,e){
        e.preventDefault();
     var userid = $("#staffname option:selected").val();
     var username = $("#user_username").val();
     var password = $("#user_password").val();
     var passwordconfirm = $("#user_passwordconfirm").val();
     var role =  $("#user_auth option:selected").val();
     var status =  $("#user_status option:selected").val();
     var station = $("#user_selectstation option:selected").val();
     
     if(password===passwordconfirm){
    $.ajax({
        url:"http://localhost/primepos/index.php/system/checkusername",
        type:"post",
        dataType:"json",
        data:{username:username},
        success:function(data){
            console.log("username status: "+data);
            if(data.status >0){ 
          Alert.render('Username is already taken!',"Notification",iconUrl);
            }
            else{
                $.ajax({
                    url:"http://localhost/primepos/index.php/system/createuser",
                    type:"post",
                    dataType: "json",
                    data:{userid:userid,username:username,password:password,role:role,status:status,station:station},
                    success:function(data){
                        if(data.status ==="account_exists"){
                           Alert.render($("#staffname option:selected").text()+' has an account in '+$("#user_selectstation option:selected").text()+"","Notification",iconUrl);  
                        }
                      else if(data.status ===1){
                       Alert.render($("#staffname option:selected").text()+' user account for '+$("#user_selectstation option:selected").text()+" created successfully!","Notification",successiconUrl);       
                    document.getElementById("usersform").reset();
                        } else{
                          alert("something's wrong!");
                      } 
                      
                    }
                    
                });
            }
        }
    });
    }else{
      Alert.render('The passwords do not match! ',"Notification",iconUrl);  
    }
}
});    
});



function getoutlets(){
    $.ajax({
        url:"http://localhost/primepos/index.php/system/outlets",
        type:'post',
        dataType:'json',
        success:function(data){
             $select = document.getElementById("station");
               $stations =   document.getElementById("user_selectstation");
          $.each(data,function(index,value){
                var options = "<option value="+value.ID+">"+value.OUTLETNAME+"</option>";
                 $($select).append(options); $($stations).append(options);
          });  
           
          
        }
        
    });
}

function editstaff(row){
    var staffid = row.closest('tr').find('td.staffidcell').text();
       var fname = row.closest('tr').find('td.fnamecell').text();
          var lname = row.closest('tr').find('td.lnamecell').text();
             var phone = row.closest('tr').find('td.phonecell').text();
                var email = row.closest('tr').find('td.emailcell').text();
                   var address = row.closest('tr').find('td.addresscell').text();
                      var title = row.closest('tr').find('td.titlecell').text();
                         var salary = row.closest('tr').find('td.basicsalarycell').text();
                            var benefits = row.closest('tr').find('td.benefitscell').text();
                               var station = row.closest('tr').find('td.stationcell').text();
  document.getElementById("staffid").value = staffid;
  document.getElementById("fname").value = fname;
  document.getElementById("lname").value = lname;
  document.getElementById("phone").value = phone;
  document.getElementById("email").value = email;
  document.getElementById("address").value = address;
  document.getElementById("title").value = title;
  document.getElementById("monthlysalary").value = salary;
document.getElementById("benefits").value = benefits;
$("#fname").focus();
}


$(document).ready(function(){
    $("#staffname").change(function(){
       var staffid = $("#staffname option:selected").val();
      
        $.ajax({
            url:"http://localhost/primepos/index.php/system/searchstaff",
            type:"post",
            dataType:"json",
            data:{staffid:staffid},
            success:function(data){
                console.log(data);
             document.getElementById("user_title").value = data[0].TITLE;
             document.getElementById("user_station").value = data[0].OUTLETNAME;    
            }
        });
    });
});
