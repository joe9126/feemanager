/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var currency ="KSh. ";
 var baseUrl = "http://localhost/primepos/index.php/";
 var iconUrl= 'http://localhost/primepos/assets/images/icons/warning.png';
  var successiconUrl= 'http://localhost/primepos/assets/images/icons/success.png';
      
function showDialog(){
    var winW = window.innerWidth;
	    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    
    dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
              dialogoverlay.style.width = winW+"px";
            
	    var dialogbox = document.getElementById('registeritemdialog');
            dialogbox.style.left = (winW/2) - (800 * .5)+"px";
           dialogbox.style.top = "200px";
           
           dialogbox.style.display = "block";
                $("#invent_itemcode").focus();
                
             $("#invent_discgroup").find('option').remove().end().append('<option value="">Select</option>');       
                 $("#invent_taxgroup").find('option').remove();
                     $("#invent_category").find('option').remove();
                     $("#invent_discgroup").find('option').remove();
     $.ajax({
         url:'http://localhost/primepos/index.php/inventory/gettaxes',
         type:'POST',
         dataType:'JSON',
         success: function(data){
           $.each(data,function(index, element){
           $taxgroups = document.getElementById("invent_taxgroup");
             $options ="<option value="+element.TAXID+">"+element.TAXNAME+"</option>";
           $($taxgroups).append($options); 
           });
         } 
     }); 
       $.ajax({
         url:'http://localhost/primepos/index.php/inventory/getcategories',
         type:'POST',
         dataType:'JSON',
         success: function(data){
             
           $.each(data,function(index, element){
           $categories = document.getElementById("invent_category");
            $options2 ="<option value="+element.CATEGORYID+">"+element.CATEGORYNAME+"</option>";
           $($categories).append($options2);
            });
         } 
     });  
      $.ajax({
         url:'http://localhost/primepos/index.php/inventory/getdiscounts',
         type:'POST',
         dataType:'JSON',
         success: function(data){
         
           $.each(data,function(index, element){
           $discounts = document.getElementById("invent_discgroup");
            $options3 ="<option value="+element.DISCID+">"+element.DISCNAME+"</option>";
           $($discounts).append($options3);
            });
         } 
     });
            
}

$(document).ready(function(){
   $("#closebutton").click(function(){
         var dialogoverlay = document.getElementById('dialogoverlay'); 
          var dialogbox = document.getElementById('registeritemdialog');
            var dialogbox2 = document.getElementById('viewtransactiondiv');
          
          dialogoverlay.style.display = "none";
           dialogbox.style.display = "none";
           dialogbox2.style.display = "none";
           $("#itemcodespan").html(""); $("#itemnamespan").html("");  $("#buypricespan").html(""); $("#salepricespan").html("");
            $("#marginspan").html("");
}); 



 $("#invent_itemcode").keyup(function(){
  $(searchitemcode);
});


});
/* SEARCH ITEM CODE FOR THE POP UP DIALOG  */
function searchitemcode(){
    var searchitemcode = $('#invent_itemcode').val();
    if(searchitemcode.length>0){
  // alert("search text: "+searchitemcode);
    $.ajax({
        url: 'http://localhost/primepos/index.php/inventory/searchitem',
        type: 'POST',
        dataType: 'json',
        data:{searchid:searchitemcode},
        success: function(data){
            $("#invent_itemname").val('');
                   $("#invent_description").val('');
                     $("#invent_buyprice").val('');
                       $("#invent_saleprice").val('');
                         $("#invent_margin").val('');
                         $("#invent_stocklimit").val('');
            $.each(data,function(index,value){
                if(data.length>0){
                     console.log("item name returned: "+value.ITEMNAME);
                  $("#invent_itemname").val(value.ITEMNAME);
                   $("#invent_description").val(value.DESCRIPTION);
                     $("#invent_buyprice").val(value.BP);
                       $("#invent_saleprice").val(value.SP);
                         $("#invent_margin").val(value.MARGIN);
                           $("#invent_stocklimit").val(value.QTYNOTICE);
                          /* $("#invent_category").val($("#invent_category option:first").val(value.ITEMCATEGORYNAME));*/
                  }
              });
             },
        error: function(data){
           console.log("data response: "+data+" search text: "+searchitemcode);
            alert("something's wrong");
        }
        
    });
}  
}
/*END OF SEARCH ITEM CODE FOR THE POP UP DIALOG  */

jQuery(document).ready(function(){
   
   jQuery("#form").validate({
       rules:{
           invent_itemcode:{required:true, minlength:3},
           invent_itemname:{ required:true,minlength:3},
           description:{required:true,minlength:3 },
           invent_buyprice:{required:true,number:true },
           invent_saleprice:{ required:true, number:true  },
           invent_margin:{required:true, number:true},
           invent_category:{required:true },
           invent_discgroup:{  required:true },
           invent_taxgroup:{ required:true},
            invent_status:{ required:true}, 
            invent_stocklimit:{ required:true,number:true},
       },
       messages:{
           invent_itemcode:{  required: "Item code is required",minlength:" at least 3 characters" },
             invent_itemname:{  required: "Item name is required",minlength:" at least 3 characters" },
               description:{  required: "Description is required",minlength:" at least 3 characters" },
                   invent_buyprice:{  required: "Buy price is required", number: "Must be a number!"},
                       invent_saleprice:{  required: "Sale price is required",number: "Must be a number!" },
                           invent_margin:{  required: "Margin is required",number: "Must be a number!" },
                               invent_category:{  required: "Category is required"},
                                   invent_discgroup:{  required: "Discount group is required"},
                                    invent_taxgroup:{  required: "Discount group is required"},
                                     invent_status:{  required: "Discount group is required"},
                                      invent_stocklimit:{  required: "Discount group is required",number: "Must be a number!"}
       },
       submitHandler: function(form,e) {
      e.preventDefault();
     var itemcode = $("#invent_itemcode").val();
     var itemname = $("#invent_itemname").val();
     var description = $("#invent_description").val();
     var buyprice = $("#invent_buyprice").val();
     var saleprice = $("#invent_saleprice").val();
     var margin = $("#invent_margin").val();
     var category = $("#invent_category option:selected").val();
     var taxgroup = $("#invent_taxgroup option:selected").val();
     var discount = $("#invent_discgroup option:selected").val();
     var status = $("#invent_status option:selected").val();
     var stocklimit = $("#invent_stocklimit").val();

$.ajax({
    url: "http://localhost/primepos/index.php/inventory/updateinventory",
    type:"post",
    dataType:'json',
    data:{itemcode:itemcode,itemname:itemname,description:description,buyprice:buyprice,saleprice:saleprice,margin:margin,category:category,
    taxgroup:taxgroup,discount:discount,status:status,stocklimit:stocklimit},
    success:function(data){
         console.log(data.status); 
       
              if(data.status ==="success"){
          var iconUrl= 'http://localhost/primepos/assets/images/icons/success.png';
          Alert.render(itemname+' added successfully!',"Notification",iconUrl); 
         document.getElementById("form").reset();
         }else{
              var iconUrl= 'http://localhost/primepos/assets/images/icons/warning.png';
          Alert.render(itemname+' Was not added!',"Notification",iconUrl);
         }
    }
});
}
   });
    
   
});

$(document).ready(function(){
    $("#invent_saleprice").keyup(function(){
   var bprice = parseFloat($("#invent_buyprice").val());
   var sprice = parseFloat($("#invent_saleprice").val());
   
   if($.isNumeric(bprice)&& $.isNumeric(sprice)){
       var margin = ((sprice - bprice)/bprice)*100;
       $("#invent_margin").val((margin.toFixed(2)));
       console.log("margin: "+margin);
   }
    });
    
    $("#invent_margin").keyup(function(){
   var bprice = parseFloat($("#invent_buyprice").val());
   var margin = parseFloat($("#invent_margin").val());
    if($.isNumeric(bprice) && $.isNumeric(margin)){
       var sprice = bprice*(1+(margin/100));
       $("#invent_saleprice").val(parseFloat(sprice.toFixed(2)));
       console.log("sale price: "+sprice);
   }
    });
    
 $("#invent_buyprice").keyup(function(){
   var sprice = parseFloat($("#invent_saleprice").val());
   var bprice = parseFloat($("#invent_buyprice").val());
   console.log("bprice: "+bprice+" sprice: "+sprice);
    if($.isNumeric(sprice) && $.isNumeric(bprice)){
       var margin = ((sprice - bprice)/bprice)*100;
       $("#invent_margin").val(parseFloat(margin.toFixed(2)));
       console.log("margin: "+margin);
   }
    });
});

$(document).ready(function(){
    $.ajax({
        url: 'http://localhost/primepos/index.php/inventory/getItemsregister',
        type: 'post',
        dataType: 'json',
        success:function(data){
            var r=1;
         
       $("#invent_itemstable").DataTable({
                data: data,
                createdRow: function(row,data,index){
                        $(row).attr('id',index).find('td').eq(2).attr('id','transcode');
                         $(row).attr('id',index).find('td').eq(3).attr('id','transdate');
                          $(row).attr('id',index).find('td').eq(4).attr('id','itemsqty');
                            $(row).attr('id',index).find('td').eq(5).attr('id','subtotal');
                              $(row).attr('id',index).find('td').eq(6).attr('id','totaldisc');
                                $(row).attr('id',index).find('td').eq(7).attr('id','totalvat');
                                  $(row).attr('id',index).find('td').eq(8).attr('id','grandtotal');
                                    $(row).attr('id',index).find('td').eq(9).attr('id','cashier'); 
                                  
                },
                columns: [
                    {mRender:function(){
                  var viewbutton ="<a class='editrow' onclick='editrow($(this))'><img src='http://localhost/primepos/assets/images/icons/edit.png' width='15px' height='20px'></a>";
                            return viewbutton;
                        }},
                    {mRender:function(){
                       return r++;     
                    }},
                      {data: 'ITEMCODE'},
                       {data: 'ITEMNAME'},
                          {data: 'DESCRIPTION'},
                             {data: 'CATEGORYNAME'},
                                {data: 'BP'},
                                   {data: 'SP'},
                                     {data: 'MARGIN'},
                                       {data: 'QTYNOTICE'},
                                       {data: 'TAXNAME'},
                                         {data: 'DISCNAME'},
                                           {data: 'STATUS'}
                                          ],
                                 "pageLength":15,
                                  "bLengthChange": false,
                                  "bAutoWidth":false,
                                  "autoWidth": true
                                 
                         });          
   

  },
        error: function(data){
            console.log(data);
           var iconUrl= 'http://localhost/primepos/assets/images/icons/warning.png';
          Alert.render('Items register could not be loaded!',"Notification",iconUrl);   
        }
    });
    

     
     
});


function editrow(row){
 
  // var rows = $("table#invent_itemstable >tbody >tr").length;
    var itemcode = row.closest('tr').find('td#itemcodecell').text();
    console.log("item code is "+itemcode);
  showDialog();
          $("#invent_itemcode").focus();
  document.getElementById("invent_itemcode").value = itemcode;
        $(searchitemcode);
}
         

//SEARCH THE STOCK TABLE
$(document).ready(function(){
  $("#searchstockitem").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#invent_stocktable tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
   


/*GET STOCK FUNCTION*/

$(document).ready(function(){
       $.ajax({
         url:'http://localhost/primepos/index.php/inventory/getstock',
         type:'post',
         dataType:'json',
         success:function(data){
               var r=1;
         
       $("#invent_stocktable").DataTable({
                data: data,
                createdRow: function(row,data,index){
                        $(row).attr('id',index).find('td').eq(1).attr('class','itemcodecell');
                         $(row).attr('id',index).find('td').eq(2).attr('class','itemnamecell');
                          $(row).attr('id',index).find('td').eq(3).attr('class','descriptioncell');
                            $(row).attr('id',index).find('td').eq(4).attr('class','totalqty');
                              $(row).attr('id',index).find('td').eq(5).attr('class','lastadded');
                                $(row).attr('id',index).find('td').eq(6).attr('class','addedby');
                                  $(row).attr('id',index).find('td').eq(7).attr('contenteditable','true');
                                    $(row).attr('id',index).find('td').eq(8).attr('contenteditable','true'); 
                                     $(row).attr('id',index).find('td').eq(9).attr('class','itemsavebtncell'); 
                                  
                },
                columns: [
                 {mRender:function(){
                       return r++;     
                    }},
                      {data: 'ITEMCODE'},
                       {data: 'ITEMNAME'},
                          {data: 'DESCRIPTION'},
                             {mRender:function(data,type,row){
                                   var qty = row.QTY;
                                   if(qty===null){qty=0;}
                                   return qty;
                             }},
                                {mRender:function(data,type,row){
                                        return moment(row.DATE).format('ddd Do MMM,YYYY, h:mm:ss a');
                                }},
                                   {mRender:function(data,type,row){
                                           var staffname=row.FNAME+" "+row.LNAME;
                                           if(row.FNAME  ===null && row.LNAME ===null){
                                               staffname = "None";
                                           }
                                           return staffname;
                                   }},
                                     {mRender:function(){
                                             var holder="";
                                             return holder;
                                     }},
                                       {mRender:function(){
                                            
                                             return 0;
                                     }},
                                       {mRender:function(){
                                        var savebtn ="<button id='additemqtybtn'>Save</button>";
                                        return savebtn;
                                       }}                                         
                                          ],
                                 "pageLength":15,
                                  "bLengthChange": false,
                                  "bAutoWidth":false,
                                  "autoWidth": true
                                 
                         }); 
  

 $(document).ready(function(){
       console.log("about to make update");
         var itemcode,addqty,delqty,itemname;
            $("table#invent_stocktable tbody tr").mouseover(function(){
              itemcode = $(this).find('td:nth-child(2)').text();
              addqty = $(this).find('td:nth-child(8)').text();
              delqty = $(this).find('td:nth-child(9)').text();
              itemname = $(this).find('td:nth-child(3)').text();
           // console.log("item code is "+itemcode+" addqty:"+addqty+" delqty:"+delqty);
            });
            
         $(".itemsavebtncell").click(function(){
          var iconUrl= 'http://localhost/primepos/assets/images/icons/warning.png';
          var updateqty;
         /// alert("update started");
              if(!$.isNumeric(addqty)){
          Alert.render('Addition items quantity must be numeric!',"Notification",iconUrl);  
              }
              else  if($.isNumeric(delqty)){
                  updateqty = parseFloat(addqty)- parseFloat(delqty);
                 if(updateqty>0){
                      Confirm.render('Add '+updateqty+" item(s) of "+itemname+" ?",'update_qty',itemcode,updateqty);
                 }
                 else{
                      Confirm.render('Delete '+(updateqty*-1)+" item(s) of "+itemname+" ?",'update_qty',itemcode,updateqty);
                 }
               
              }else{
              Alert.render('Deletion items quantity must be numeric!',"Notification",iconUrl); 
            }
        
         });
        });
 
   },
         error:function(){
             console.log("error occured");
              var iconUrl= 'http://localhost/primepos/assets/images/icons/warning.png';
          Alert.render('Stock could not be loaded!',"Notification",iconUrl);   
         }
     });      
  
});

function updateStock(itemcode,updateqty){
  $.ajax({
                  url:'http://localhost/primepos/index.php/inventory/updatestock',
                  type:'post',
                  dataType:'json',
                  data:{itemcode: itemcode,updateqty:updateqty},
                  success:function(data){
                      console.log("update status: "+data);
                      if(data.status >0){
                         if(updateqty>0){
                             /*location.reload(); */
                          var iconUrl= 'http://localhost/primepos/assets/images/icons/success.png';
                      Alert.render(updateqty+" item(s)  added successfully!","Notification",iconUrl); 
                        
                     }else{
                         Alert.render((updateqty*-1)+" item(s)  deleted successfully!","Notification",iconUrl);  
                       
                     }
                      }else{
                        Alert.render('item was not updated!',"Notification",iconUrl);    
                      }
                  }
              });
}

$(document).ready(function(){
    $.ajax({
        url:baseUrl+"/inventory/getstocklogs",
        type:"post",
        dataType:"json",
        success:function(data){
            var r=1;
            $("#stocklogtable").DataTable({
                data:data,
                columns:[
                    {mRender:function(data,type,row){
                       return r++;     
                    }},
                {data:"DATE"},
                {data:"ITEMCODE"},
                {data:"ITEMNAME"},
                {data:"DESCRIPTION"},
                {data:"QTY"},
                 {mRender:function(data,type,row){
                         return currency+row.VALUE;
                 }},
                {data:"ACTIONTYPE"},
                {mRender:function(data,type,row){
                        return row.FNAME+" "+row.LNAME;
                }}
                ],
                autoWidth:true,
                bLengthChange:false,
                pageLength:23,
                bAutoWidth:false
            });
                $("#searchstocklogitem").keyup(function(){
                   $("#stocklogtable").DataTable().search($(this).val()).draw();
                      });
        }
        
    });
      
});


function searchStocklog(){ 
 $(document).ready(function(){
   // Extend dataTables search
$.fn.dataTable.ext.search.push(
  function(settings, data, dataIndex) {
    var min = $('#stocklogfromdate').val();
    var max = $('#stocklogtodate').val();
    var createdAt = data[1] || 0; // Our date column in the table

    if (
      (min === "" || max === "") ||
      (moment(createdAt).isSameOrAfter(min) && moment(createdAt).isSameOrBefore(max))
    ) {
      return true;
    }
    return false;
  }
);

// Re-draw the table when a date range filter changes
$('.date-range-filter').change(function() {
  $("#stocklogtable").DataTable().draw();
});

$('#stocklogtable_filter').hide(); 
 
  
     });

}


$(document).ready(function(){
    var fromdate,todate;
     $("#stocklogfromdate").on("change",function(){
           fromdate = $(this).val();
       });
      
    $("#stocklogtodate").on("change",function(){
        todate = $(this).val();
         if(fromdate ===null){
             Alert.render("Select From date!","Alert",iconUrl);  
            }else{
                searchStocklog( );  
                }
    });
   
});