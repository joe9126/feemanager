<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Loginmodel extends CI_Model{
    function __construct() {
        parent::__construct();
        
    }
    
 function authenticate($username,$password){
 $query = $this->db->query("SELECT USER.USERID,USER.USERNAME, USER.PASSWORD, USER.ROLE, STAFF.FNAME,STAFF.LNAME, STAFF.TITLE,"
         . "SCHOOL.OUTLETNAME,SCHOOL.ID FROM USER LEFT JOIN STAFF ON USER.USERID=STAFF.STAFFID LEFT JOIN SCHOOL ON USER.STATION = SCHOOL.ID "
                . " WHERE USER.USERNAME='".$username."' AND USER.PASSWORD='".md5($password)."'");
           
       $staffname='';   $userid =''; $role='';$title='';$outlet=''; $username1=''; $password1=''; $schoolid='';
foreach($query->result() as $row){
		$userid .=''.$row->USERID.'';
                $role.=''.$row->ROLE.'';
                $username1.=''.$row->USERNAME.'';
                $password1.=''.$row->PASSWORD.'';
		$staffname .=''.$row->FNAME.' '.$row->LNAME.'';
                 $title .=''.$row->TITLE.'';
                $outlet .=''.$row->OUTLETNAME.'';
                $schoolid .=''.$row->ID.'';
	 }
         
$userinfo = array('userid'=>$userid, 'username'=>$username1,'password'=>$password1,'staffname'=>$staffname,'role'=>$role,
    'title'=>$title,'institution'=>$outlet,'schoolid'=>$schoolid);
	return $userinfo;
    }
}