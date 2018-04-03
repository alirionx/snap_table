
//---------------------------------------------------------------
	
	view_call_fw['mgmt_table'] = function (){
		
		var formData = new FormData();
			formData.append("function", 'mgmt_table_call' );
			formData.append("target_domid", 'mainres' );
			
			form_post( table_mgmt_api , formData , view_build[ 'mgmt_table' ] );	
	}
	
//-------------------------------------------------------------

	view_build["mgmt_table"] = function( obj ){
		
		//---------------------------
		
			window.snap_table_func_api = table_mgmt_api;
		
		//---------------------------
		
			//var content = obj.content;
		
		//---------------------------
		
			var content = sort_obj( obj.content );
			
		//---------------------------
		
			var json_path 		= obj.json_path;
			var json_part 		= "content";
			var json_def_part 	= "def";
			
		//---------------------------
		
			var target_domel = document.getElementById( obj.target_domid );
				target_domel.innerHTML = "";
		
		//---------------------------
			
			var mgmt_table = document.createElement("TABLE");
				mgmt_table.classList.add("mgmt_table");
		
		//---------------------------
			
			var def = obj.def;
			var table_hl = table_build["headline"]( def , true );
			mgmt_table.appendChild( table_hl );
			
		//---------------------------
			
			for( var prop in content ){
				
				//---------------
					var table_tr = document.createElement("TR");
					mgmt_table.appendChild( table_tr );
				//---------------
					
					for( var def_val in def ){
						
						//---------------
						
							var cell_type 	= def[def_val].type;
							var cell_align 	= def[def_val].align;
							var cell_width 	= def[def_val].width;
							var cell_val 	= content[prop][def_val];
							var cell_ph		= def[def_val].placeholder;
							var row_id 		= content[prop].id;
							var col_name 	= def_val;
							
							var dd_ary		= "";
							
							if( cell_type == "dd_cus" || cell_type == "dd_fk"  ){ dd_ary = obj.dd_fk[def_val]; }
							
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
										formData.append("json_part", json_part );
										formData.append("row_id", row_id );

										form_post( table_mgmt_api , formData , view_call);	
								
								//-----------------
								
									var formData = new FormData();
										formData.append("function", "mgmt_json_file_del" );
										formData.append("json_path", json_path );
										formData.append("row_id", row_id );
										
										form_post( table_mgmt_api , formData );	
								}
							}
				
				//-------------------------
				
						var table_btn = document.createElement("BUTTON");
						table_td.appendChild( table_btn );
							table_btn.innerHTML = "edit";
									
							table_btn.setAttribute( "json_path" , json_path );
							table_btn.setAttribute( "row_id" , row_id );
								
							table_btn.onclick = function(){
								
								var row_id = this.getAttribute( "row_id" );
								
								window.location.hash = hash_handler['set']( "snap_table_view" , "table_edit" );
								window.location.hash = hash_handler['set']( "snap_table_id" , row_id );
								
								//view_call();
								location.reload();
							}
				
				//-------------------------
				
						var table_btn = document.createElement("BUTTON");
						table_td.appendChild( table_btn );
							table_btn.innerHTML = "preview";
									
							table_btn.setAttribute( "json_path" , json_path );
							table_btn.setAttribute( "row_id" , row_id );
								
							table_btn.onclick = function(){
								
								var row_id = this.getAttribute( "row_id" );
								
								window.location.hash = hash_handler['set']( "snap_table_view" , "preview" );
								window.location.hash = hash_handler['set']( "snap_table_id" , row_id );
								
								//view_call();
								location.reload();
							}
				
				//-------------------------
			}
			
		//---------------------------
				
			var row_add = table_build["row_add"]( json_path , json_part , json_def_part );
			mgmt_table.appendChild( row_add );
			
		//---------------------------
		
		
		//---------------------------
		
			target_domel.appendChild(mgmt_table);
			
		//---------------------------
		
	}

	
//-------------------------------------------------------------

	
	
	
	
	