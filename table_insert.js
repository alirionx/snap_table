
//-------------------------------------------------------------

	function snap_table_call( table_id , target_domid ){
		
		//---------------------------
		
			window.snap_table_func_api = table_func_api;
		
		//---------------------------
		
			window.location.hash = hash_handler['set']( "snap_table_view" , "insert" );
			//window.location.hash = hash_handler['set']( "snap_table_id" , table_id );
		
		//---------------------------
		
			window.snap_table_id = table_id; 
			window.snap_table_target_domid = target_domid; 
		
		//---------------------------
		
		view_call_fw['insert']();
	}

//---------------------------------------------------------------

	view_call_fw['insert'] = function (){
		
		//---------------------------
		
			var table_insert_api = window.snap_table_func_api ;
		
		//---------------------------
		
		var table_id 		= window.snap_table_id;
		var target_domid 	= window.snap_table_target_domid;
		
		var formData = new FormData();
			formData.append("function", "snap_table_call" );
			formData.append("table_id", table_id );
			formData.append("target_domid", target_domid );

			form_post( table_insert_api , formData , view_build["insert"] );
	}
	
//-------------------------------------------------------------
	
	if( view_build == undefined ){ var view_build = [];  }
	
	view_build["insert"] = function( obj ){
		
		//---------------------------
		
			var table_insert_api = window.snap_table_func_api ;
		
		//---------------------------
			
			var json_path 		= obj.json_path;
			var json_part 		= "content";
			var json_def_part 	= "def";
			
		//---------------------------
		
			var content = sort_obj( obj.content );
			
		//---------------------------
		
			var target_domel = document.getElementById( obj.target_domid );
				target_domel.innerHTML = "";
		
		//---------------------------
			
			var def_table = document.createElement("TABLE");
				def_table.classList.add("snap_table");
		
		//---------------------------
			
			var def = obj.def;
			var table_hl = table_build["headline"]( def , true );
			def_table.appendChild( table_hl );
			
		//---------------------------
			
			for( var prop in content ){
				
				//---------------
					var table_tr = document.createElement("TR");
					def_table.appendChild( table_tr );
				//---------------
					
					for( var def_val in def ){
						
						//---------------
						
							var cell_type 	= def[def_val].type;
							var cell_align 	= def[def_val].align;
							var cell_width 	= def[def_val].width;
							var cell_val 	= content[prop][def_val];
							var cell_ph 	= def[def_val].placeholder;
							var row_id 		= content[prop].id;
							var col_name 	= def_val;
							
							var dd_ary		= "";
							
							if( cell_type == "dd_cus" ){ dd_ary = obj.dd_cus[def_val]; }
							
							var table_td = table_build[ cell_type ]( cell_align , cell_width , cell_val , cell_ph , json_path , json_part , row_id , col_name , dd_ary );
							table_tr.appendChild(table_td);
						
						//---------------
					}
			
		//---------------------------
			
					var table_td = document.createElement("TD");
					table_tr.appendChild(table_td);
						table_td.style.textAlign = "center";
						
				//-------------------------
				
						var table_btn = document.createElement("BUTTON");
						table_td.appendChild( table_btn );
							table_btn.innerHTML = "delete";
									
							table_btn.setAttribute( "json_path" , json_path );
							table_btn.setAttribute( "json_part" , json_part );
							table_btn.setAttribute( "row_id" , row_id );
								
							table_btn.onclick = function(){
								
								var chk_ok = confirm("Do you really want to delete this row?");
								if (chk_ok == true) {
								
									var json_path 	= this.getAttribute( "json_path" );
									var json_part 	= this.getAttribute( "json_part" );
									var row_id 		= this.getAttribute( "row_id" );
											
									var formData = new FormData();
										formData.append("function", "json_row_del" );
										formData.append("json_path", json_path );
										formData.append("row_id", row_id );

										form_post( table_insert_api , formData , view_call);	
								
								//-----------------
								
									var formData = new FormData();
										formData.append("function", "mgmt_json_file_del" );
										formData.append("json_path", json_path );
										formData.append("json_part", json_part );
										formData.append("row_id", row_id );
										
										form_post( table_insert_api , formData );	
								}
							}
			}
			
		//---------------------------
				
			var row_add = table_build["row_add"]( json_path , json_part , json_def_part );
			def_table.appendChild( row_add );
			
		//---------------------------
		
		
		//---------------------------
		
			target_domel.appendChild(def_table);
			
		//---------------------------
		
	}
	
//-------------------------------------------------------------
	
