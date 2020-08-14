/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
     var iconUrl= 'http://localhost/feemaster/assets/images/icons/warning.png';
      var successiconUrl= 'http://localhost/feemaster/assets/images/icons/success.png';
     
/*PREVENT DEFUALT BROWSER REFRESH*/
$(document).ready(function(){
   $(".menuitem >a").click(function(e){
       e.preventDefault(); // prevent browser refresh
       $(this).addClass('active').siblings().removeClass('active');
       $("#container").load(this.href, function(){
        
       });
   }); 
});
  /*PREVENT DEFUALT BROWSER REFRESH*/  

$(document).ready(function(){
    $('#searchtxt').keyup( function(e) {
            var min_length = 0; 
    var keyword = $('#searchtxt').val();
   
    if (keyword.length > min_length) {
     
      $('#list').show();
        $.ajax({
            url: 'http://localhost/feemaster/index.php/pos/itemsearch',
            type: 'POST',
             dataType: 'json',
            data: { searchtxt: keyword},
            success:function(data){
            $("#list").empty();
               $.each(data, function(index, value) {
                       
                       $("#list").css({
                           "visibility":"visible",
                          "max-height": "80px",
                           "overflow":"hidden",
                           "overflow-y":"scroll",                           
                           "float":"left"
                       });
                      
                       $("#list li:first").addClass("active");
                      
                        $("#list").append("<li id='listitem' value='"+value.ITEMCODE+"' onclick='listClicked(this,value)'>" +value.ITEMNAME+ "</li>");
                       
                        });
                 
                }
            });
      if(e.which === 13){
      confirmItemstatus();
    }
    } else {
   $('#list').hide();
       } 
});
});

$(document).ready(function(){
    $("#searchtxt").keydown(function(e){
        if(e.which===40){
            console.log("key down pressed");
            $("#list").focus();
        }
    });
});

 /* CONFIRM ITEM STATUS BEFORE ADDING TO LIST*/
 function confirmItemstatus(){
        var itemid = $("#list li").first().attr("value"); 
         $("#searchtxt").val("").text;
       // alert("you pressed enter, item id is: "+itemid);
  //CONFIRM QTY FIRST
    $.ajax({
           url:'http://localhost/feemaster/index.php/pos/qtycheck',
           type:'post',
           dataType:'json',
           data:{searchid:itemid},
           success:function(data){
               console.log(data);
               console.log("ITEM QTY "+data[0].QTY+" ITEM STATE: "+data[0].STATUS);
               
               if(data[0].STATUS ==="Inactive"){
        
          Alert.render(data[0].ITEMNAME+" is locked and unavailable for sale!","Alert",iconUrl);
               }else if(data[0].QTY<1){
                 
          Alert.render(data[0].ITEMNAME+" is out of stock!","Alert",iconUrl);  
               }
               else{
                  addItem(itemid); //ADD ITEM IF STATUS OK
               }
           }
           
       });
        console.log("you pressed enter");
        $('#list').hide();
 }
 /* END OF CONFIRM ITEM STATUS BEFORE ADDING TO LIST*/
 
 
/*IF USER CLICKS LIST*/ 
function listClicked(elm, value){
 
var listitemid = elm.getAttribute('value'); 
if(listitemid === null){
    listitemid = value;
}
    $('#searchtxt').val($("#listitem").text());
   console.log(listitemid);
   $('#list').hide();
confirmItemstatus(); //CHECK ITEM STATUS BEFORE ADDING TO LIST
}
/* END OF USER CLICKS LIST*/ 



/* ADD ITEM TO POS LIST*/

function addItem(listitemid){
       var rows = $("table#salestable >tbody >tr").length;
  console.log("no of rows: "+rows); 
    
   $.ajax({
       url: 'http://localhost/feemaster/index.php/pos/getitem',
       type: 'POST',
       dataType: 'json',
       data:{ searchid:listitemid},
       success: function(data){
    $.each(data,function(index, value){
     var taxrate = parseInt(value.TAXRATE);
      var unitprice = parseInt(value.SP);
     var subtotal = ((taxrate/100)*unitprice)+unitprice;

  for(var i=1;i<=rows;i++){
    var itemcode = $("tr:nth-child("+i+") td:nth-child(3)").html();
    var qty =  $("tr:nth-child("+i+") td:nth-child(7)").html();
     console.log("loop number "+i+": searched code:"+itemcode+". Against "+listitemid);
     
      if(itemcode === listitemid){
         $("tr:nth-child("+i+") td:nth-child(7)").html(parseInt(qty)+1);
         subtotal = (((taxrate+100)/100)*unitprice)*((parseInt(qty)+1));
         console.log("subtotal is "+subtotal);
        
         $("tr:nth-child("+i+") td:nth-child(10)").html(subtotal);
          $('#searchtxt').val($("").text()); 
        $("#searchtxt").focus();
        $("#list").children().remove();
        $("#list").hide();
          $(getGrandtotal);  
         return true;
     }
      
  }
  
  var markup ="<tr>\n\
<td><a class='deleterow' onclick='deleterow($(this))'><img src='http://localhost/feemaster/assets/images/icons/delete.png' width='20px' height='20px'></a></td>\n\
<td id='counter'>"+(rows+1)+"</td>\n\
<td id='itemcodecell'>"+value.ITEMCODE+"</td>\n\
<td id='itemnamecell'>"+value.ITEMNAME+"</td>\n\
<td id='descriptioncell'>"+value.DESCRIPTION+"</td>\n\
<td id='itempricecell'>"+value.SP+"</td>\n\
<td contenteditable='true' id='itemqtycell'>1</td>\n\
<td contenteditable='true' id='itemdisccell'>0</td>\n\
<td id='itemvatcell'>"+value.TAXRATE+"</td>\n\
<td id='itemsubtotalcell' class='itemsubtotal'>"+subtotal.toFixed(2)+"</td></tr>";   
       
 $("#salestablebody").append(markup);
console.log("rows after update: "+$("table#salestable >tbody >tr").length);
 
  $(getGrandtotal);      
$('#searchtxt').val($("").text()); 
$("#searchtxt").focus();
$("#list").children().remove();
$("#list").hide();
 return true;
               });
         
       }
   });
}
/*END OF ADD ITEM TO POS LIST*/

/*CLEAR SEARCH FIELD IF CLICKED BY USER */
function clearTxtonclick(elem){
    $("#searchtxt").click(function(){
        $(elem).val('');
        $("#list").hide();
    });
}
/*END OF CLEAR SEARCH FIELD IF CLICKED BY USER */


 function getGrandtotal(){
   //  alert("totals being calculated");
    var grandtotal =0;
    $(".itemsubtotal").each(function(){
        var subtotal = $(this).text();
        if(!isNaN(subtotal)&& subtotal.length!==0){
            grandtotal +=parseFloat(subtotal);
             $("#totalsaletxt").val(grandtotal.toFixed(2)).text();
     console.log("grand total is "+grandtotal.toFixed(2));
        }
      });
}

function qtyUpdate(){
     var rows = $("table#salestable >tbody >tr").length;
    var subtotal;
    for(var i=1;i<=rows;i++){
         var unitprice =  parseFloat($("tr:nth-child("+i+") td:nth-child(6)").html());
       var disc = parseFloat($("tr:nth-child("+i+") td:nth-child(8)").html());
       var vat = parseFloat($("tr:nth-child("+i+") td:nth-child(9)").html());
        var qty =  parseFloat($("tr:nth-child("+i+") td:nth-child(7)").html());
       if($.isNumeric(qty)){
  subtotal = ((((vat+100)/100)*unitprice)*qty)-disc;
       $("tr:nth-child("+i+") td:nth-child(10)").html(subtotal.toFixed(2));
       $(getGrandtotal);
       console.log("new subtotal is "+subtotal);   
       }
       else{
       
          Alert.render("Key in a number!","Alert",iconUrl);
           $("tr:nth-child("+i+") td:nth-child(10)").html("0");
       }
      }
    
}


 /* QTY UPDATE FROM THE POS TABLE BY USER*/
$(document).ready(function(){
    $("#salestable").keyup(function(){
         var rows = $("table#salestable >tbody >tr").length;
    var subtotal;
    for(var i=1;i<=rows;i++){
        var itemname = $("tr:nth-child("+i+") td:nth-child(4)").html();
       var itemid = $("tr:nth-child("+i+") td:nth-child(3)").html();
       console.log("item id is "+itemid);
       var qty =  parseFloat($("tr:nth-child("+i+") td:nth-child(7)").html());
        var disc = parseFloat($("tr:nth-child("+i+") td:nth-child(8)").html());
       var unitprice =  parseFloat($("tr:nth-child("+i+") td:nth-child(6)").html());
      
       var vat = parseFloat($("tr:nth-child("+i+") td:nth-child(9)").html());
       
          $.ajax({
          url: 'http://localhost/feemaster/index.php/pos/getItem',
          type: 'POST',
          dataType: 'json',
          data:{ searchid:itemid},
          success: function(data){
                var iconUrl= 'http://localhost/feemaster/assets/images/icons/warning.png';
              $.each(data,function(index, value){
                    var dbqty = parseInt(value.QTY);
                    var dbdiscount = parseFloat(value.DISCRATE);
                    var alloweddiscount = (dbdiscount/100)*unitprice;
                    if(qty>dbqty){
                          $("tr:nth-child("+i+") td:nth-child(7)").html("1");
                        Alert.render(itemname+" has "+dbqty+" items in stock!","Notification",iconUrl);
                       $(qtyUpdate);
                    }else if(disc>alloweddiscount){
                          $("tr:nth-child("+i+") td:nth-child(8)").html("0");
                         Alert.render(itemname+" maximum discount is "+alloweddiscount.toFixed(2)+" !","Notification",iconUrl);
                        
                           $(qtyUpdate);
                    }else{
                         $(qtyUpdate);
                         console.log("table cell is clicked");
                    }
                 });
           }
                     });
  
    }
});

});
    /*END OF QTY UPDATE FROM THE POS TABLE*/
   
   $(document).ready(function(){
      $("#cashtxt").keyup(function(){
        var totalsale = parseFloat($("#totalsaletxt").val());
        var cashinput = parseFloat($("#cashtxt").val());
        var change=0;
   //  alert("cash input started > total sale: "+totalsale+" cash :"+cashinput);
        if(cashinput>=totalsale){
            change = cashinput - totalsale;
            console.log("customer balance "+change);
            $("#changetxt").val(change.toFixed(2)).text();
        }else{
             $("#changetxt").val(0.00).text();
        }
    });   
   });

$(document).ready(function(){
$("#dialogoverlay").click(function(){
var dialogbox = document.getElementById("dialogbox");
if(dialogbox!==null){
  dialogbox.style.animation = "bounce 1s";  
}
var box2 = document.getElementById("registeritemdialog");
if(box2!==null){
     box2.style.animation = "bounce 1s";
}
 var box3 = document.getElementById("viewtransactiondiv");
 box3.style.animation = "bounce 1s";
});    
});


/*CHECK IF CASH TOTAL ADDED IS OK*/

function checkTotals(){
    var iconUrl= 'http://localhost/feemaster/assets/images/icons/warning.png';
    var grandsale = parseFloat($("#totalsaletxt").val());
    console.log("total sale is: "+grandsale);
     var cash = parseFloat($("#cashtxt").val());
     
    if($.isNumeric(grandsale) && grandsale>0){
        if($.isNumeric(cash)){
            if(cash >= grandsale){
             Confirm.render('Execute Transaction?','execute_sale','cancel');
        }else{
            Alert.render("Cash issued is insufficient!","Alert",iconUrl);
            //$("#cashtxt").focus();
        } 
        }else{
             Alert.render("Enter a valid cash amount!","Alert",iconUrl);
              // $("#cashtxt").focus();
        }
       
    }else{
        Alert.render('Add at least a single item to sell!',"Notification",iconUrl);
          $("#searchtxt").focus();
    }
}

/*END OF CHECKING IF CASH TOTAL IS OKAY */
   $(document).ready(function(){
       $("#cashtxt").keypress(function(event){
        if(event.which ===13){
           $(checkTotals);
           return false;
        }
    });
   }); 

/* ALERT DIALOG POP UP */

function CustomAlert(){
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
var Alert = new CustomAlert();

/* * CONFIRM POP UP DIALOG */


function confirmDialog(){
    this.render = function(dialog,op,itemid,qty){
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
           
     document.getElementById("dialogboxhead").innerHTML = "Confirm";
     document.getElementById("dialogboxbody").innerHTML = dialog;
   document.getElementById('dialogboxfoot').innerHTML = '<button class="okBtn" onclick="Confirm.yes(\''+op+'\',\''+itemid+'\',\''+qty+'\')">Yes</button> <button class="okBtn" onclick="Confirm.no()">No</button>';
 //  $(".okBtn").focus();
    };
    
    this.no = function(){
        document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
        $("#searchtxt").focus();
    };

this.yes = function(op,itemid,qty){
    if(op === "execute_sale"){
        $(executeSale);
        document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
        $("#searchtxt").focus();
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


function executeSale(){
    
     var rows = $("table#salestable >tbody >tr").length;
   var totaldiscount=0,totalqty=0,totalvat=0, grandtotal=0, itemsubtotal=0, transubtotal=0; 
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
   var d = new Date();
    var transaction_no = Math.floor((Math.random() * 10000) + 1)+""+d.getFullYear()+d.getMonth()+d.getDay();
       var timestamp = (new Date(Date.now()-tzoffset)).toISOString().slice(0,-1).replace("T"," ");
    var totalBP;   var temp_total =0;
    for(var i=1;i<=rows;i++){ //GET TRANSACTION DETAILS
          var itemid =  $("tr:nth-child("+i+") td:nth-child(3)").html(); 
        var qty =  parseFloat($("tr:nth-child("+i+") td:nth-child(7)").html());
       var unitprice =  parseFloat($("tr:nth-child("+i+") td:nth-child(6)").html());
       var disc = parseFloat($("tr:nth-child("+i+") td:nth-child(8)").html());
       var vat = parseFloat($("tr:nth-child("+i+") td:nth-child(9)").html());
        var itemtotal = parseFloat($("tr:nth-child("+i+") td:nth-child(10)").html());
       var transprofit;
    totalBP = function(){
     
        $.ajax({
            async: false,
           url:"http://localhost/feemaster/index.php/pos/getItem",
           type:"post",
           dataType:"json",
           data:{searchid:itemid},
           success:function(data){
             $.each(data,function(index,value){
                 console.log("item bp: "+value.BP);
                temp_total = temp_total +(parseFloat(value.BP)*qty);
             
             }); 
           },
           error:function(){
               console.log("item bp could not be retrieved");
           }
       });
       return temp_total;
   }();
         
         
        itemsubtotal = qty * unitprice;
        transubtotal = transubtotal + itemsubtotal;
        totaldiscount = totaldiscount + disc;
       totalqty = totalqty + qty;
       totalvat = totalvat + (((vat/100)*unitprice)*qty);
       grandtotal = grandtotal + itemtotal;  
       transprofit = transubtotal - totaldiscount - totalBP;
        }
        console.log("itemsub: "+itemsubtotal+" totaldiscount "+totaldiscount+" totalqty: "+totalqty+" totalvat: "+totalvat+" grandtotal: "+grandtotal
              +" transprofit: "+transprofit);
      console.log("total bp: "+totalBP);
      
    $.ajax({
        url:"http://localhost/feemaster/index.php/pos/createtransaction",
        type: 'post',
        dataType:'json',
        data:{transaction_no:transaction_no,transubtotal:transubtotal,totaldiscount:totaldiscount,totalqty:totalqty,totalvat:totalvat,transprofit:transprofit,
        totalBP:totalBP},
        success:function(data){
            console.log("status "+data);
            if(data.status>0){
             for(var i=1;i<=rows;i++){
         var itemid =  $("tr:nth-child("+i+") td:nth-child(3)").html(); 
        var qty =  parseFloat($("tr:nth-child("+i+") td:nth-child(7)").html());
       var unitprice =  parseFloat($("tr:nth-child("+i+") td:nth-child(6)").html());
       var disc = parseFloat($("tr:nth-child("+i+") td:nth-child(8)").html());
       var vat = parseFloat($("tr:nth-child("+i+") td:nth-child(9)").html());
        var itemtotal = parseFloat($("tr:nth-child("+i+") td:nth-child(10)").html());
       
      $.ajax({
          url: 'http://localhost/feemaster/index.php/pos/transact_sale',
           type: 'POST',
        dataType: 'json',
        // async: true,
           data: {transaction_no:transaction_no,itemid:itemid,qty:qty,unitprice:unitprice,disc:disc,vat:vat, timestamp:timestamp},
           success: function(data){
            console.log("success function running: "+data.status);
            
                confirmTransaction(data.status);
             },
           error: function(status){
           
          Alert.render('Something went wrong!',"Notification"); 
                console.log("error logged: "+status);
               }
       });
    }      
            }else{
           
          Alert.render('Transaction not successful!',"Notification");   
            }
        }
    });
 
}

function confirmTransaction($result){
    if($result ==="success"){
        
      
          Alert.render('Transaction completed successfully!',"Notification",successiconUrl);
          $("#salestable tbody").empty();
          $("#totalsaletxt").val(0.00).text();
          $("#cashtxt").val(0.00).text();
             $("#changetxt").val(0.00).text();
             
    }else{
         Alert.render('Something went wrong!',"Notification"); 
    }
}

/*DELETE TABLE ROW*/
function deleterow(row){
 
   var rows = $("table#salestable >tbody >tr").length;
   
    var subtotal = parseFloat(row.closest('tr').find('td.itemsubtotal').text());
    
    console.log("item total is "+subtotal);
    var grandtotal = parseFloat($("#totalsaletxt").val());
    grandtotal = grandtotal - subtotal;
    $("#totalsaletxt").val(grandtotal).text();
    row.closest('tr').remove();  
    for(var i=1;i<=rows;i++){
     $("tr:nth-child("+i+") td:nth-child(2)").html(i);
      }
       
}

/*EXIT ALERT DIALOG ON PRESSING ENTER */
$(document).ready(function(){
    $("#dialogbox").keyup(function(event){
        if(event.keyCode===13){
            document.getElementById("dialogbox").style.display = "none";
        document.getElementById("dialogoverlay").style.display = "none";
        }
    });
});


function openTab(evt,tabid){
    var i;
    var x =document.getElementsByClassName("inventorytab");
    for(i=0;i<x.length;i++){
        x[i].style.display = "none";
    }
    document.getElementById(tabid).style.display = "block";
    if(tabid === "stockmanagementtab"){
        $("#searchstockitem").focus();
    }
}

$(document).ready(function(){
    $(".tabhead").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});



 /* UPDATE BROWSER URL ON A HREF CLICK */
 $(document).ready(function(){
        $('a').click(function(e){
           // var host = window.location.hostname;
          var value = $(this).attr('id');
            window.location.replace(value); // it replaces id to url without refresh
        });
});  
 /* END OF UPDATE BROWSER URL ON A HREF CLICK */ 
