<?php

class Studentsmodel extends CI_Model{
    function register($regdata){
        $status="";
   
        foreach($regdata as $row){
            $studentdata = array("ADMNDATE"=>$row->ADMNDATE,"ADMN"=>$row->ADMNO,"FNAME"=>$row->FNAME,"MNAME"=>$row->MNAME,"LNAME"=>$row->LNAME,
                "GENDER"=>$row->GENDER,"DISABILITY"=>$row->DISABILITY,"MEDCON"=>$row->MEDCON,"ADMCLASS"=>$row->ADMCLASS,"ADMSTREAM"=>$row->ADMSTREAM,
                "GUARDID"=>$row->GUARDID);            
           $this->db->insert("student",$studentdata);  
        }
        
        if($this->db->affected_rows()>0){
        foreach($regdata as $row){
             $guardiandata = array("GUARDID"=>$row->GUARDID,"GFNAME"=>$row->GFNAME,"GLNAME"=>$row->GLNAME,"AGE"=>$regdata[0]->AGE,"RELATIONSHIP"=>$regdata[0]->RELATIONSHIP,
             "OCCUP"=>$row->OCCUP,"PHONE"=>$row->PHONE,"ALTPHONE"=>$row->ALTPHONE,"EMAIL"=>$row->EMAIL,"ALTEMAIL"=>$row->ALTEMAIL,"RESIDENCE"=>$row->RESIDENCE,
             "STREET"=>$row->STREET,"ADDRESS"=>$row->ADDRESS,"CITY"=>$row->CITY); 
         $query =  $this->db->query("SELECT GUARDID FROM GUARDIAN WHERE GUARDID='".$row->GUARDID."'"); 
          $guardianidstate = $query->num_rows();
          if($guardianidstate<1){$this->db->insert("guardian",$guardiandata);$status="successfull";}else{$status="successfull";}
        }
        }
          else{$status="failed";}
         
        return $status;
    }
}

