<?php

class Homemodel extends CI_Model{
    
    function getclasses($schoolid){
        $query = $this->db->query("SELECT CLASSID, CLASSNAME,NUM_NAME FROM CLASSES WHERE SCHOOLID ='".$schoolid."'");
        $classdata = $query->result();
        
        return $classdata;
    }
    
   function getstreams($schoolid){
        $query2 = $this->db->query("SELECT STREAMS.STREAMID,STREAMS.STREAMNAME FROM STREAMS WHERE SCHOOLID='".$schoolid."'");
        $streamdata = $query2->result();
        return $streamdata;
   }
}
