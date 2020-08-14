 var currency ="KSh. ";
 var baseUrl = "http://localhost/primepos/index.php/";
 var iconUrl= 'http://localhost/primepos/assets/images/icons/warning.png';
      var successiconUrl= 'http://localhost/primepos/assets/images/icons/success.png';

 
 //SEARCH THE STOCK TABLE
$(document).ready(function(){
  $("#searchsalesitem").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#saleanalysistable tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
       
    });
 //
  });
 
});
/* END OF SEARCH STOCK TABLE  */
$(document).ready(function(){
    $(".datepicker").datepicker({ dateFormat: "yy-mm-dd" });
  //  $("#gensalestodate").datepicker({ dateFormat: "yy-mm-dd" });
});

 function opensalessTab(evt,tabid){
    var i;
    var x =document.getElementsByClassName("tab");
    for(i=0;i<x.length;i++){
        x[i].style.display = "none";
    }
    document.getElementById(tabid).style.display = "block";
    if(tabid==="sales_analysisTab"){
        $("#searchsalesitem").focus();
    }
}

function opengensalessTab(evt,tabid){
    var i;
    var x =document.getElementsByClassName("tab2");
    for(i=0;i<x.length;i++){
        x[i].style.display = "none";
    }
    document.getElementById(tabid).style.display = "block";
     if(tabid ==="generalitemsalestab"){
      $("#searchsalesitem").focus();
     }
}

 

$(document).ready(function(){
    $.ajax({
        url:"http://localhost/primepos/index.php/sales/gettransactions",
        type:"post",
        dataType:"json",
        success:function(data){
            var i=1; var grandtotal=0;
      
               $("#gensalestable").DataTable({
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
                            var viewbutton ="<a class='viewrow' onclick='viewtrans($(this))'><img src='http://localhost/primepos/assets/images/icons/viewicon.png' width='20px' height='20px'></a>";
                            return viewbutton;
                        }},
                    {mRender:function(){
                       return i++;     
                    }},
                      {data: 'TRANSACTION_NO'},
                      {mRender:function(data,type,row){
                                        return moment(row.TRANSACTION_DATE).format('ddd Do MMM,YYYY, h:mm:ss a');
                                }},
                          {data: 'ITEMS_QTY'},
                             {data: 'TRANS_SUBTOTAL'},
                                {data: 'TRANS_TOTALDISC'},
                                   {data: 'TRANS_TOTALVAT'},
                                         {mRender: function(data,type,row){
                                           grandtotal = parseFloat(row.TRANS_SUBTOTAL)+parseFloat(row.TRANS_TOTALVAT)-parseFloat(row.TRANS_TOTALDISC);
                                             return grandtotal;
                                             }}, 
                                          {mRender:function(data,type,row){
                                                  return row.FNAME+" "+row.LNAME;
                                          }}
                                          ],
                                 "pageLength":10,
                                  "bLengthChange": false,
                                  "bAutoWidth":false,
                                  "autoWidth": true
                                 
                         }); 
                         
               $("#transsearchtxt").keyup(function(){
                 $("#gensalestable").DataTable().search($(this).val()).draw();
                      });       
 
        }
    });
});



function viewtrans(row){
     var winW = window.innerWidth;
     var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
      dialogoverlay.style.height = winH+"px";
        dialogoverlay.style.width = winW+"px";
          dialogoverlay.style.display = "block";
            
	    var dialogbox = document.getElementById('viewtransactiondiv');
            dialogbox.style.left = (winW/2) - (1000 * .5)+"px";
           dialogbox.style.top = "100px"; 
            dialogbox.style.height = "650px"; 
           dialogbox.style.display = "block";
         
      var transno = row.closest('tr').find('td#transcode').text();
      var transdate = row.closest('tr').find('td#transdate').text();
      var subtotal = row.closest('tr').find('td#subtotal').text();
      var discounts = row.closest('tr').find('td#totaldisc').text();
      var vat = row.closest('tr').find('td#totalvat').text();
      var grandtotal = row.closest('tr').find('td#grandtotal').text();
      var cashier = row.closest('tr').find('td#cashier').text();
      var itemqty = row.closest('tr').find('td#itemsqty').text();
      var costnprofit = function(){
          var temp =null;
          $.ajax({
                async:false,
                url:baseUrl+"sales/gettranssales",
                type:"post",
                dataType:"json",
                data:{transcode:transno},
                success:function(data){
                  $.each(data,function(index,value){temp = [value.TRANSPROFIT,value.TRANS_TOTALBP];});  
                }
              });
           return temp;
       }();
       
        document.getElementById('transno').value = transno;
       document.getElementById('transdateshow').value = transdate;
       document.getElementById('transcashiershow').value = cashier;
       document.getElementById('transitemsqtyshow').value = itemqty+" Items";
       document.getElementById('subtotalshow').value = currency+""+subtotal;  
       document.getElementById('discountshow').value = currency+""+discounts;  
        document.getElementById('vatshow').value = currency+""+vat;  
        document.getElementById('grandtotalshow').value = currency+""+grandtotal; 
       console.log("costnprofit:"+costnprofit); 
     document.getElementById("marginshow").value = currency+""+parseFloat( costnprofit[0]).toFixed(2);    
    document.getElementById("costshow").value = currency+""+parseFloat( costnprofit[1]).toFixed(2);
         
        var marginpc = ((parseFloat( costnprofit[0])/parseFloat( costnprofit[1]))*100).toFixed(2);
          document.getElementById("pcmarginshow").value = marginpc+" Percent";
        $.ajax({
            async:false,
            url:baseUrl+"sales/gettranssales",
            type:"post",
            dataType:"json",
            data:{transcode:transno},
            success:function(data){
                var r=1; 
                $("table#transdetailstable tbody").remove();
                
              $("#transdetailstable").DataTable({
                  data:data,
                  columns:[
                      {mRender:function(){
                         return r++;
                      }},
                      {data:'ITEMCODE'},
                      {data:'ITEMNAME'},
                      {data:'QTYSOLD'},
                      {data: 'SP'},
                      {data: 'SUBTOTAL'},
                      {mRender: function(data,type,row){
                           var vatfigure = (parseFloat(row.VAT)/100)*parseFloat(row.SP);  
                           return currency+""+vatfigure;
                      }},
                   {mRender: function(data,type,row){
                           return currency+""+parseFloat(row.DISCOUNT).toFixed(2);
                      }},
                  {mRender: function(data,type,row){
                          var vatfigure = (parseFloat(row.VAT)/100)*parseFloat(row.SP);  
                            var saletotal = parseFloat(row.SUBTOTAL)+vatfigure - parseFloat(row.DISCOUNT);
                           return currency+""+saletotal.toFixed(2);
                      }},
                   {mRender: function(data,type,row){
                             var cost = parseFloat(row.BP)*parseFloat(row.QTYSOLD);
                           return currency+""+cost.toFixed(2);
                      }},
                  {mRender: function(data,type,row){
                          var vatfigure = (parseFloat(row.VAT)/100)*parseFloat(row.SP);  
                           var cost = parseFloat(row.BP)*parseFloat(row.QTYSOLD);
                             var saletotal = parseFloat(row.SUBTOTAL)+vatfigure - parseFloat(row.DISCOUNT);
                           var netmargin = saletotal - vatfigure - cost;
                           return currency+""+netmargin.toFixed(2);
                      }}
                  ],
                     "pageLength":5,
                     "bLengthChange": false,
                     "bAutoWidth":false,
                     "autoWidth": true
              });  
              
                
            }
           
        }); 
        
 
}
    $(document).ready(function(){
        $.ajax({
            url:baseUrl+"sales/analysis",
            type:"post",
            dataType:"json",
            success:function(data){
               var r=1;  var stockvalue; var qty;var bp,totalsold, lastsold, grosssale,margin,percent_margin;
               
               $("#saleanalysistable").DataTable({
                data: data,
                columns: [
                    {mRender:function(){
                       return r++;     
                    }},
                         {data: 'ITEMCODE'},
                             {data: 'ITEMNAME'},
                                {data: 'DESCRIPTION'},
                                   {mRender:function(data,type,row){
                                    bp = parseFloat(row.BP).toFixed(2); if(isNaN(bp)){bp = 0;}
                                    return currency+bp;
                                   }},
                                       {mRender: function(data,type,row){
                                          qty = parseFloat(row.QTY).toFixed(2); if(isNaN(qty)){qty = 0;}
                                             return qty;
                                             }}, 
                                          {mRender: function(data,type,row){
                                        stockvalue =  parseFloat(row.STOCKVALUE).toFixed(2); 
                                        if(isNaN(stockvalue)){stockvalue = 0;}   
                                             return  currency+stockvalue;
                                             }},
                                    {mRender:function(data,type,row){
                                                lastsold = row.LAST_SOLD; if(lastsold ===null){lastsold ="NA";}
                                            return lastsold;    
                                          }}, 
                                      {mRender:function(data,type,row){
                                         totalsold = parseFloat(row.TOTAL_SOLD);  if(isNaN(totalsold)){totalsold = 0;}   
                                            return totalsold;    
                                          }},
                                       {mRender:function(data,type,row){
                                       grosssale = parseFloat(row.GROSS_SALE).toFixed(2); if(isNaN(grosssale)){grosssale = 0;}   
                                            return currency+grosssale;    
                                          }},
                                       {mRender:function(data,type,row){
                                         margin = parseFloat(row.MARGIN).toFixed(2); if(isNaN(margin)){margin = 0;}   
                                            return currency+margin;    
                                          }},
                                       {mRender:function(data,type,row){
                                         percent_margin = ((margin /(totalsold*bp))*100).toFixed(2); if(isNaN(percent_margin)){percent_margin = 0;}  
                                            return percent_margin+" %";    
                                          }}
                                          ],
                                 "pageLength":20,
                                  "bLengthChange": false,
                                  "bAutoWidth":false,
                                  "autoWidth": true
                         }); 
               
             /*  
            $.each(data,function(index,value){
           totalsold = parseFloat(value.TOTAL_SOLD);  if(isNaN(totalsold)){totalsold = 0;}     
           bp = parseFloat(value.BP).toFixed(2); if(isNaN(bp)){bp = 0;}
           qty = parseFloat(value.QTY).toFixed(2); if(isNaN(qty)){qty = 0;}
        
           stockvalue =  parseFloat(value.STOCKVALUE).toFixed(2);  if(isNaN(stockvalue)){stockvalue = 0;}   
            lastsold = value.LAST_SOLD; if(lastsold ===null){lastsold ="NA";}
           grosssale = parseFloat(value.GROSS_SALE).toFixed(2); if(isNaN(grosssale)){grosssale = 0;}   
            margin = parseFloat(value.MARGIN).toFixed(2); if(isNaN(margin)){margin = 0;}   
            percent_margin = ((margin /(totalsold*bp))*100).toFixed(2); if(isNaN(percent_margin)){percent_margin = 0;}  
                var anaylysisdata = "<tr>\n\
                        <td>"+r+"</td>\n\
                        <td>"+value.ITEMCODE+"</td>\n\
                        <td>"+value.ITEMNAME+"</td>\n\
                        <td>"+value.DESCRIPTION+"</td>\n\
                        <td>"+bp+"</td>\n\
                        <td>"+qty+"</td>\n\
                        <td>"+stockvalue+"</td>\n\
                        <td>"+lastsold+"</td>\n\
                        <td>"+totalsold+"</td>\n\
                        <td>"+currency+grosssale+"</td>\n\
                        <td>"+currency+margin+"</td>\n\
                         <td>"+percent_margin+" %</td>\n\
                    </tr>";  
                    $("#saleanalysistablebody").append(anaylysisdata);
                    r++; 
                });
              
                */
            }
        });
    });
 
 


$(document).ready(function(){
    $("#todateanalysis").change(function(){
        if(isNaN($("#fromdateanalysis").val())===false){
           Alert.render("From date is required!","Alert",iconUrl);
        }
       else{
          // alert("selected "+$("#todateanalysis").val()+" from date is "+$("#fromdateanalysis").val());
       }
    });
});

$(document).ready(function(){
   $("#transclosebutton").click(function(){
         var dialogoverlay = document.getElementById('dialogoverlay'); 
         var dialogbox = document.getElementById('viewtransactiondiv');
         
        dialogbox.style.display = "none";
          dialogoverlay.style.display = "none";
}); 
});


//function getsaleitems()
{
    
$(document).ready(function(){
     $(document).ready(function(){
        $.ajax({
            url:'http://localhost/primepos/index.php/sales/getsaleitems',
            type: 'post',
            dataType: 'json',
            success:function(data){
               // console.log("sales data: "+data);
                var r=1; var totalsale=0;
               $("#salesitemstable").DataTable({
                data: data,
                columns: [
                    {mRender:function(){
                       return r++;     
                    }},
                      {data: 'TRANSACTION_NO'},
                      {mRender:function(data,type,row){
                                        return (row.TRANS_DATE);
                                }},
                          {data: 'ITEMCODE'},
                             {data: 'ITEMNAME'},
                                {data: 'DESCRIPTION'},
                                   {data: 'SP'},
                                      {data: 'QTYSOLD'},
                                         {data: 'DISCOUNT'},
                                         {mRender: function(data,type,row){
                                             return ((row.VAT/100)*row.SP)*row.QTYSOLD;
                                             }}, 
                                          {mRender: function(data,type,row){
                                                  var vat = ((row.VAT/100)*row.SP)*row.QTYSOLD;
                                                  var subtotal= row.QTYSOLD * row.SP;
                                             return (subtotal+vat)- row.DISCOUNT;
                                             }},
                                          {mRender:function(data,type,row){
                                                  return row.FNAME+" "+row.LNAME;
                                          }}
                                          ],
                                 "pageLength":10,
                                  "bLengthChange": false,
                                  "bAutoWidth":false,
                                  "autoWidth": true
                         }); 
               $("#datatablesearchtxt").keyup(function(){
                 $("#salesitemstable").DataTable().search($(this).val()).draw();
                      });          
           
            }
        
});
     });
 });
}
/* SEARCH TABLE BY DATE  */
function searchSales(){ 
 $(document).ready(function(){
   // Extend dataTables search
$.fn.dataTable.ext.search.push(
  function(settings, data, dataIndex) {
    var min = $('#gensalesfromdate').val();
    var max = $('#gensalestodate').val();
    var createdAt = data[2] || 0; // Our date column in the table

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
  $("#salesitemstable").DataTable().draw();
});

$('#salesitemstable_filter').hide(); 
 
  
     });

}
/*END OF SEARCH TABLE BY DATE  */

 $(document).ready(function(){
     
      var todate, fromdate,staffname;
      
      $("#salesstaffname").on("change",function(){
                staffname = $("#salesstaffname option:selected").text().toLowerCase();
       
    $("#salesitemstable tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(staffname) > -1);
       
    });
      });
       $("#gensalesfromdate").on("change",function(){
           fromdate = $(this).val();
        console.log("selected from date: "+fromdate);
      });
      
      $("#gensalestodate").on("change",function(){
            todate = $(this).val();
            console.log("selected to date: "+todate);
            if(fromdate ===null){
             Alert.render("Select From date!","Alert",iconUrl);  
            }else{
                searchSales( );  
                }
          
            });
        
    
 });

