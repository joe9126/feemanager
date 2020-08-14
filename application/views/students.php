<?php include 'navbar.php';?>

<div class="main_container">
    <div class="tabcontroller">
         <button class="tabhead active" onclick="openTab(event,'studentregtab')"> Registration</button>
        <button class="tabhead" onclick="openTab(event,'promotiontab')">Promotion</button>
        <button class="tabhead" onclick="openTab(event,'archivestab')">Archives</button>
    </div>
    
    <div class="tabcontainer" id="studentregtab">
        <div id="studentinfodiv">
            <form id="studregform" name="studregform" action="" method="post">
                <fieldset class="fieldset">
                <legend>Student Details</legend>
                <div id="leftdiv">
                    <label>Passport</label>
                    <input type="file" id="passport" name="passport" contenteditable="false" placeholder="No Image Selected"/>
                    <div id="passportpreviewdiv"></div>
                   
                </div>
                <div id="centerdiv">
                    <fieldset class="controlset">
                     <label>Admn. Date *</label>
                     <input type="text" placeholder="Admission Date" id="admndate" name="admndate" class="datepicker"/>
                     </fieldset>
                    
                     <fieldset class="controlset">
                    <label>Adm. No *</label>
                    <input type="text" placeholder="Admission number" id="admno" name="admno"/>
                     </fieldset>
                     <fieldset class="controlset">
                    <label>First Name*</label>
                    <input type="text" placeholder="First name" id="fname" name="fname"/>
                     </fieldset>
                     <fieldset class="controlset">
                    <label>Middle Name*</label>
                    <input type="text" placeholder="Middle name" id="mname" name="mname"/>
                     </fieldset>
                    
                     <fieldset class="controlset">
                    <label>Last Name</label>
                    <input type="text" placeholder="Last name" id="lname" name="lname"/>
                     </fieldset>
                     <fieldset class="controlset">
                    <label>Gender*</label>
                    <div class="radiobtndiv">
                        <input type="radio" value="Male" id="male" name="gender"><span class="radiotext">Male</span>
                         <input type="radio" value="Female" id="female" name="gender"><span class="radiotext">Female</span>
                         <input type="radio" value="Other" id="other" name="gender"><span class="radiotext">Other</span><br>
                    </div>
                    
                     </fieldset>                
                </div>
                
                <div id="rightdiv">
                    <fieldset class="controlset">
                    <label>Disability*</label>
                     <input type="radio" value="No" id="disability" name="disability"><span class="radiotext">No</span>
                     <input type="radio" value="Yes" id="disability" name="disability"><span class="radiotext">Yes</span><br>
                     <input type="text" id="disability_name" name="disability_name" placeholder="If yes, specify" style="display: none"/>
                    </fieldset>
                    
                    <fieldset class="controlset">
                     <label>Conditions*</label>
                     <input type="radio" value="No" id="medicalcondition" name="medicalcondition"><span class="radiotext">No</span>
                     <input type="radio" value="Yes" id="medicalcondition" name="medicalcondition"><span class="radiotext">Yes</span>
                     <input type="text" id="medicalconditionname" name="medicalconditionname" placeholder="If yes, specify"style="display: none"/>
                    </fieldset>
                    
                    <fieldset class="controlset">
                     <label>Admn. Class*</label>
                     <select id="admissionclass" name="admissionclass">
                        <option value="">Select Class</option>
                    </select>
                    </fieldset>
                    
                    <fieldset class="controlset">
                    <label>Admn. Stream</label>
                    <select id="admissionstream" name="admissionstream">
                        <option value="">Select Stream</option>
                    </select>
                    </fieldset>
                </div>
                
            </fieldset>
            
            
            <fieldset class="fieldset">
                <legend>Parent/Guardian's Details</legend>
                <div id="guard_left">
                    <fieldset class="controlset">
                    <label>ID Number*</label>
                    <input type="text" placeholder="ID Number" name="idno" id="idno"/>
                    </fieldset>
                    
                    <fieldset class="controlset">
                    <label>First Name*</label>
                    <input type="text" placeholder="First Name" name="gfname" id="gfname"/>
                    </fieldset>
                    
                    <fieldset class="controlset">
                    <label>Last Name*</label>
                    <input type="text" placeholder="Last Name" name="glname" id="glname"/>
                    </fieldset>
                    
                    <fieldset class="controlset">
                    <label>Age</label>
                    <input type="text" placeholder="Age" name="age" id="age"/>
                    </fieldset>
                    
                    <fieldset class="controlset">
                     <label>Relationship*</label>
                     <select id="relationship" name="relationship">
                         <option value="">Select Relationship</option>
                         <option value="Father">Father</option>
                         <option value="Mother">Mother</option>
                         <option value="Relative">Relative</option>
                         <option value="Sponsor">Sponsor</option>
                      </select>
                    </fieldset>
                     
                    <fieldset class="controlset">
                     <label>Occupation</label>
                    <input type="text" placeholder="Occupation" name="occupation" id="occupation"/>
                    </fieldset>
                </div>
                <div id="guard_center">
                    <fieldset class="controlset">
                     <label>Phone No*</label>
                    <input type="text" placeholder="07xx xxx xxx" name="phoneno" id="phoneno"/>
                    </fieldset>
                    <fieldset class="controlset">
                    <label>Alt. Phone</label>
                    <input type="text" placeholder="07xx xxx xxx" name="altphoneno" id="altphoneno"/>
                    </fieldset>
                    <fieldset class="controlset">
                    <label>Email</label>
                    <input type="text" placeholder="johndoe@abc.com" name="email" id="email"/>
                    </fieldset>
                    <fieldset class="controlset">
                     <label>Alt. Email</label>
                    <input type="text" placeholder="johndoe@abc.com" name="altemail" id="altemail"/>
                    </fieldset>
                    
                    <fieldset class="controlset">
                     <label>Residence*</label>
                    <input type="text" placeholder="e.g Westlands" name="residence" id="residence"/>
                    </fieldset>
                    
                    <fieldset class="controlset">
                     <label>Street*</label>
                    <input type="text" placeholder="e.g Muthangari Drive" name="street" id="street"/>
                    </fieldset>
                </div>
                <div id="guard_right">
                     <fieldset class="controlset">
                      <label>Address</label>
                      <input type="text" placeholder="e.g 1234-00100" name="address" id="address"/>
                     </fieldset>
                     <fieldset class="controlset">
                    <label>City*</label>
                    <input type="text" placeholder="e.g Nairobi" name="city" id="city"/>
                     </fieldset>
                    
                    <input type="submit" value="Register" id="registerbtn"/>
                    <input type="button" value="Update" id="updatebtn" name="updatebtn" class="updatebutton"/>
                    <label class="nottext">Note: Items with asterisk (*) are required</label>
                </div>
            </fieldset>
           </form>
        </div>
    </div>
    
    <div class="tabcontainer" id="promotiontab">
        <p>promotion</p>
    </div>
    
    <div class="tabcontainer" id="archivestab">
        <p>Archives</p>
    </div>
</div>


<div id="dialogoverlay"></div>

<div id="alertdialogbox">
  <div>
    <div id="alertdialogboxhead"></div>
    <div id="alertdialogboxbody"></div>
    <div id="alertdialogboxfoot"></div>
  </div>
</div>

<div id="dialogbox">
  <div>
    <div id="dialogboxhead"></div>
    <div id="dialogboxbody"></div>
    <div id="dialogboxfoot"></div>
  </div>
</div>

<?php include 'footer.php';