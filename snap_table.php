<?php
	
//-----------Work with Sessions---------------------------
	//if (session_status() == PHP_SESSION_NONE) {
		
	//	ini_set('session.gc_maxlifetime', 180);
	//	session_start();
	//}
//--------------------------------------------------------


//-------Global Vars--------------------------------------
	
	$cur_dir = str_replace( "snap_table.php" , "" , realpath("snap_table.php") );
	

//--------------------------------------------------------


//-------Usefull Functions--------------------------------

	function echo_json_json($json_in){
		print_r($json_in);
	}
	function echo_json_print($json_in){
		echo '<pre>';
		print_r($json_in);
		echo '</pre>';
	}

//--------------------------------------------------------




//---Check and create JSON MGMT Files---------------------
	
	//$json_dir 	= $cur_dir . 'json/';
	$json_dir 		= 'json/';
	$mgmt_file_name = 'mgmt_table.json';
	$mgmt_file_path = $json_dir . $mgmt_file_name;
	
	//echo $json_dir;
	
	if( !is_dir( $json_dir ) ){
		
		mkdir($json_dir);
	}
	
	if( !file_exists( $mgmt_file_path ) ){
		
		//---Management Table Definition------------------------
			
			$obj_in['table'] 		= "mgmt_table";
			$obj_in['json_path'] 	= $json_dir."mgmt_table.json";
			$obj_in['content'] 		= array();
		
		//------------------------------------------------------
		
			$obj_in['def']['id']['type']		= 'static';
			$obj_in['def']['id']['align']		= 'center';
			$obj_in['def']['id']['width']		= '60px';
			$obj_in['def']['id']['hltxt']		= 'ID';
			
			$obj_in['def']['name']['type']		= 'input';
			$obj_in['def']['name']['align']		= 'left';
			$obj_in['def']['name']['width']		= '';
			$obj_in['def']['name']['hltxt']		= 'Table Name';
			
			$obj_in['def']['app']['type']		= 'input';
			$obj_in['def']['app']['align']		= 'left';
			$obj_in['def']['app']['width']		= '';
			$obj_in['def']['app']['hltxt']		= 'Assigned App';
			
			$obj_in['def']['owner']['type']		= 'input';
			$obj_in['def']['owner']['align']	= 'left';
			$obj_in['def']['owner']['width']	= '';
			$obj_in['def']['owner']['hltxt']	= 'Owner';
			
		//------------------------------------------------------
		
		
		//---Write Empty MGMT JSON------------------------------
		
			$json_out = json_encode($obj_in, JSON_PRETTY_PRINT);
		
			$file_edit = 	fopen( $mgmt_file_path , "w") or die("Unable to open file!");
							fwrite($file_edit, $json_out);
							fclose($file_edit);
		
		//------------------------------------------------------
	}
	
//--------------------------------------------------------	


//---Init MGMT Table Call---------------------------------

	function mgmt_table_call( $POST ){
		
		$json_dir = $GLOBALS['json_dir'];
		
		$post_ary['target_domid'] 	= $POST['target_domid']; 
		$post_ary['table_path'] 	= $json_dir . 'mgmt_table.json' ;
		snap_table_do( $post_ary );
	}
	
//--------------------------------------------------------	


//---Init Preview Table Call------------------------------

	function snap_table_call( $POST ){
		
		$table_id 			= $POST['table_id'];
		$target_domid 		= $POST['target_domid'];
		$json_dir 			= $GLOBALS['json_dir'];
		$target_filepath 	= $json_dir . 'table_' . $table_id . '.json';
		
		$post_ary['table_path'] 	= $target_filepath;
		$post_ary['target_domid'] 	= $target_domid;
		snap_table_do( $post_ary );
	}
	
//--------------------------------------------------------	



//---Call Snap Table JSON---------------------------------

	function snap_table_do( $POST ){
		
		//---Check Output Format-------------
		
			if( isset( $POST['output'] ) ){
				
				$output = $POST['output'];
			}
			else{
				$output = 'json';
			}
		
		//-----------------------------------
			
			$target_domid = $POST['target_domid'];
			
		//---Open JSON File------------------
			
			$table_path = $POST['table_path'];
			$json_in = file_get_contents( $table_path );
		
		//-----------------------------------
		
		
		//---Check JSON Consistence----------
			
			if( !json_decode($json_in) ){
				
				header("HTTP/1.1 404 Not Found");
				echo 'JSON File not found or corrupt.';
				exit;
			}
			
		//-----------------------------------
			
			$obj_in = json_decode($json_in , true);
			
			$obj_in['target_domid'] = $target_domid;
			
			$json_out = json_encode($obj_in, JSON_PRETTY_PRINT);
		
		//---Print Output--------------------
			
			$output_function = 'echo_json_'.$output;
			$output_function($json_out);
			
		//-----------------------------------
		
	}
//--------------------------------------------------------




//--------Change Value in JSON--------------------------------------------------
		
	function json_change( $POST ){
		
		print_r( $POST );
		
		//---Put POST Array in Vars----------
			
			$json_path 	= $POST['json_path'];
			$json_part	= $POST['json_part'];
			$row_id 	= $POST['row_id'];
			$col_name 	= $POST['col_name'];
			$cell_val 	= $POST['cell_val'];
	
		//-----------------------------------
		
		
		//---Open JSON File and Parse--------
			
			$json_in 	= file_get_contents( $json_path );
			$obj_in 	= json_decode( $json_in , true );
			
		//-----------------------------------
		
		//---Change Value in Object----------
			
			if( $obj_in[$json_part][$row_id][$col_name] = $cell_val ){
				
				$json_out = json_encode($obj_in, JSON_PRETTY_PRINT);
		
				$file_edit = 	fopen( $json_path , "w") or die("Unable to open file!");
								fwrite($file_edit, $json_out);
								fclose($file_edit);
		
		//------------------------------------------------------
			}
			else{
				header("HTTP/1.1 400 Bad Request");
				echo 'Fail to write into object.';
				//exit;
			}
			
		//-----------------------------------
	}	
	
//-----------------------------------------------------------------------------


//--------Add Row in JSON------------------------------------------------------
		
	function json_row_add( $POST ){
		
		print_r( $POST );
		
		//---Put POST Array in Vars----------
			
			$json_path 		= $POST['json_path'];
			$json_part 		= $POST['json_part'];
			$json_def_part 	= $POST['json_def_part'];
	
		//-----------------------------------
		
		
		//---Open JSON File and Parse--------
			
			$json_in 	= file_get_contents( $json_path );
			$obj_in 	= json_decode( $json_in , true );
			
		//-----------------------------------
		
		
		//---Find Free ID--------------------
			
			$id_ary = array();
			
			foreach( $obj_in[$json_part] as $id => $val ){
				
				array_push( $id_ary , $id );
			}
			
			$new_id = max( $id_ary ) + 1;
			echo $new_id;
		//-----------------------------------
		
		
		//---Change Value in Object----------
				
			foreach( $obj_in[$json_def_part] as $col_name => $val ){
					
				$obj_in[$json_part][$new_id][$col_name] = "";
			}
			
			if( $obj_in[$json_part][$new_id]['id'] = $new_id ){

				$json_out = json_encode($obj_in, JSON_PRETTY_PRINT);
		
				$file_edit = 	fopen( $json_path , "w") or die("Unable to open file!");
								fwrite($file_edit, $json_out);
								fclose($file_edit);
		
		//------------------------------------------------------
			}
			else{
				header("HTTP/1.1 400 Bad Request");
				echo 'Fail to write into object.';
				//exit;
			}
			
		//-----------------------------------
	}	
//-----------------------------------------------------------------------------



//--------Delete Row in JSON---------------------------------------------------
		
	function json_row_del( $POST ){
		
		print_r( $POST );
		
		//---Put POST Array in Vars----------
			
			$json_path 	= $POST['json_path'];
			$row_id 	= $POST['row_id'];
	
		//-----------------------------------
		
		
		//---Open JSON File and Parse--------
			
			$json_in 	= file_get_contents( $json_path );
			$obj_in 	= json_decode( $json_in , true );
			
		//-----------------------------------
		
		
		//---Delete Row via ID---------------
				
			unset( $obj_in['content'][$row_id] );

			if( $json_out = json_encode($obj_in, JSON_PRETTY_PRINT) ){
		
				$file_edit = 	fopen( $json_path , "w") or die("Unable to open file!");
								fwrite($file_edit, $json_out);
								fclose($file_edit);
		
		//------------------------------------------------------
			}
			else{
				header("HTTP/1.1 400 Bad Request");
				echo 'Fail to write into object.';
				//exit;
			}
			
		//-----------------------------------
	}	
//-----------------------------------------------------------------------------


//--------Delete JSON Table File-----------------------------------------------
		
	function mgmt_json_file_del( $POST ){
		
		print_r( $POST );
		
		//---Put POST Array in Vars----------
			
			$json_path 	= $POST['json_path'];
			$row_id 	= $POST['row_id'];
	
		//-----------------------------------
		
			
		//---Delete JSON FIle and Check------
			
			$json_dir = $GLOBALS['json_dir'];
			$filepath = $json_dir . 'table_' . $row_id . '.json';
			
			unlink( $filepath );

			if( file_exists( $filepath ) ) {

				header("HTTP/1.1 400 Bad Request");
				echo 'Fail to write into object.';
				//exit;
			}
			
		//-----------------------------------
	}	
	
//-----------------------------------------------------------------------------



//--------Create and Edit a Table Definition-----------------------------------
		
	function table_edit( $POST ){
		
		//---Get and define needed Vars-----------------------------
		
			$table_id 			= $POST['table_id'];
			$target_domid		= $POST['target_domid']; 
			
			$json_dir 			= $GLOBALS['json_dir'];
			$def_filepath 		= $json_dir . 'def_' . $table_id . '.json';
			$target_filepath 	= $json_dir . 'table_' . $table_id . '.json';
		
		//----------------------------------------------------------
		
		
		//---Open MGMT JSON File and Parse Table Name via ID--------
			
			$mgmt_file_path = $GLOBALS['mgmt_file_path'];
			
			$json_in 		= file_get_contents( $mgmt_file_path );
			$mgmt_obj_in 	= json_decode( $json_in , true );
			
			$table_name		= $mgmt_obj_in['content'][$table_id]['name'];
			
		//----------------------------------------------------------
		
		
		
		//--check if files exists and create if not-----------------
		
			if( !file_exists( $def_filepath ) ) {
			
			//-----------------------------
			
				$obj_in['table'] 		= $table_name;
				$obj_in['json_path'] 	= $def_filepath;
				$obj_in['content'] 		= array();
				
				$obj_in['def'] = array();
				
				$obj_in['def']['name'] = array();
				$obj_in['def']['name']['type'] 					= 'input';
				$obj_in['def']['name']['align'] 				= 'left';
				$obj_in['def']['name']['width'] 				= '';
				$obj_in['def']['name']['hltxt'] 				= 'Column Name';
				$obj_in['def']['name']['placeholder'] 			= '';
				
				$obj_in['def']['type'] = array();
				$obj_in['def']['type']['type'] 					= 'dd_cus';
				$obj_in['def']['type']['align'] 				= 'center';
				$obj_in['def']['type']['width'] 				= '';
				$obj_in['def']['type']['hltxt'] 				= 'Field Type';
				$obj_in['def']['type']['placeholder'] 			= '';
				
				$obj_in['def']['align'] = array();
				$obj_in['def']['align']['type'] 				= 'dd_cus';
				$obj_in['def']['align']['align'] 				= 'center';
				$obj_in['def']['align']['width'] 				= '';
				$obj_in['def']['align']['hltxt'] 				= 'Column Align';
				$obj_in['def']['align']['placeholder'] 			= '';
				
				$obj_in['def']['width'] = array();
				$obj_in['def']['width']['type'] 				= 'input';
				$obj_in['def']['width']['align'] 				= 'center';
				$obj_in['def']['width']['width'] 				= '100px';
				$obj_in['def']['width']['hltxt'] 				= 'Column Width';
				$obj_in['def']['width']['placeholder'] 			= 'e.g. 100px';
				
				$obj_in['def']['hltxt'] = array();
				$obj_in['def']['hltxt']['type'] 				= 'input';
				$obj_in['def']['hltxt']['align'] 				= 'center';
				$obj_in['def']['hltxt']['width'] 				= '';
				$obj_in['def']['hltxt']['hltxt'] 				= 'Column Headline Text';
				$obj_in['def']['hltxt']['placeholder'] 			= '';
				
				$obj_in['def']['placeholder'] = array();
				$obj_in['def']['placeholder']['type'] 			= 'input';
				$obj_in['def']['placeholder']['align'] 			= 'center';
				$obj_in['def']['placeholder']['width'] 			= '';
				$obj_in['def']['placeholder']['hltxt'] 			= 'Field Placeholder';
				$obj_in['def']['placeholder']['placeholder'] 	= '';
				
			//-----------------------------
				
				$obj_in['dd_cus'] = array();
				
				$obj_in['dd_cus']['type'] = array();
				$obj_in['dd_cus']['type'][""] 			= 'please select';
				$obj_in['dd_cus']['type']['static'] 	= 'static';
				$obj_in['dd_cus']['type']['input'] 		= 'text input';
				$obj_in['dd_cus']['type']['checkbox'] 	= 'checkbox';
				$obj_in['dd_cus']['type']['dd_cus'] 	= 'Custom Dropdown';
				$obj_in['dd_cus']['type']['dd_fk'] 		= 'Foreign Key Dropdown';
				
				$obj_in['dd_cus']['align'] = array();
				$obj_in['dd_cus']['align'][""] 			= 'please select';
				$obj_in['dd_cus']['align']['left'] 		= 'left';
				$obj_in['dd_cus']['align']['center'] 	= 'center';
				$obj_in['dd_cus']['align']['right'] 	= 'right';
				
			//-----------------------------
				
				$obj_in['dd_def'] = array();
				
				$obj_in['dd_cols'] = array();
				$obj_in['dd_cols']['name'] 	= 'Column Name';
				$obj_in['dd_cols']['key'] 	= 'Dropdown Key';
				$obj_in['dd_cols']['val'] 	= 'Dropdown Value';
				
				$obj_in['dd_def'] = array();
				
			//-----------------------------
				
				//---Write to new DEF JSON------------------------------
		
					$json_out = json_encode($obj_in, JSON_PRETTY_PRINT);
				
					$file_edit = 	fopen( $def_filepath , "w") or die("Unable to open file!");
									fwrite($file_edit, $json_out);
									fclose($file_edit);
				
				//------------------------------------------------------
				
				$obj_in = array();
			}
			
		//------------------------
			
			if( !file_exists( $target_filepath ) ) {

				$obj_in['table'] 		= $table_name;
				$obj_in['json_path'] 	= $target_filepath;
				$obj_in['content'] 		= array();
				$obj_in['def'] 			= array();
			
				//---Write to new Target JSON------------------------------
		
					$json_out = json_encode($obj_in, JSON_PRETTY_PRINT);
				
					$file_edit = 	fopen( $target_filepath , "w") or die("Unable to open file!");
									fwrite($file_edit, $json_out);
									fclose($file_edit);
				
				//------------------------------------------------------
				
				$obj_in = array();
			}
			
		//----------------------------------------------------------
		
		//--Call def Table via Function-----------------------------
			
			$post_ary['table_path'] 	= $def_filepath;
			$post_ary['target_domid'] 	= $target_domid;
			snap_table_do( $post_ary );
		
		//----------------------------------------------------------
		
	}

//-----------------------------------------------------------------------------



//--------Create and Edit a Table Definition-----------------------------------
		
	function def_apply( $POST ){
		
		//---Get and define needed Vars-----------------------------
		
			$table_id = $POST['table_id'];
			
			$json_dir 			= $GLOBALS['json_dir'];
			$def_filepath 		= $json_dir . 'def_' . $table_id . '.json';
			$target_filepath 	= $json_dir . 'table_' . $table_id . '.json';
		
		//----------------------------------------------------------
		
		
		//---Open DEF and Tatget JSON and get + define Params-------
			
			//------------------
			
				$def_json_in 	= file_get_contents( $def_filepath );
				$def_obj_in 	= json_decode( $def_json_in , true );
			
			//------------------
		
				$target_json_in = file_get_contents( $target_filepath );
				$target_obj_in 	= json_decode( $target_json_in , true );
			
			//------------------
			
				$target_obj_in['def'] = array();
			
				foreach( $def_obj_in['content'] as $val_ary ){
					
					$target_obj_in['def'][ $val_ary['name'] ] = $val_ary;
					unset( $target_obj_in['def'][ $val_ary['name'] ]['name'] );
					unset( $target_obj_in['def'][ $val_ary['name'] ]['id'] );
				}
			
			//------------------
				
				if( isset( $def_obj_in['dd_def'] )){
				
					$target_obj_in['dd_cus'] = array();
				
					foreach( $def_obj_in['dd_def'] as $val_ary ){
						
						$target_obj_in['dd_cus'][ $val_ary['name'] ] [ $val_ary['key'] ] = $val_ary['val'];
					}
				}
			
			//------------------
			
			
			//---Write to Target JSON----------------------------
		
				$json_out = json_encode($target_obj_in, JSON_PRETTY_PRINT);
				
				$file_edit = 	fopen( $target_filepath , "w") or die("Unable to open file!");
								fwrite($file_edit, $json_out);
								fclose($file_edit);
				
			//-----------------------------------------------
			
		//----------------------------------------------------------
	}
	
//-----------------------------------------------------------------------------



//--------Call Content from File-----------------------------------------------
		
	function content_call( $POST ){
		
		$file_path = $POST['file_path'];
		
		if( $file_content = file_get_contents( $file_path ) ){
			
			echo $file_content;
		}
		else{
			header("HTTP/1.1 404 Not Found");
			echo 'File not found or corrupt.';
			exit;
			
		}
	}	
	
//-----------------------------------------------------------------------------






	
//--------Function Caller-----------------------------------------------------
		
	if( isset( $_POST["function"] ) ) {
		$_POST["function"]( $_POST );	
	}	
	
	if( isset( $_GET["function"] ) ) {
		$_GET["function"]( $_GET );	
	}	
	
//-----------------------------------------------------------------------------






?>




