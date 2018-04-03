//-------------------------------------------------------------

	var table_build = [];

//-------------------------------------------------------------

	table_build["headline"] = function( obj , opt ){
			
		//---------------------------
		
			var func_api = window.snap_table_func_api;
		
		//---------------------------
			
			var table_hl_tr = document.createElement("TR");
		
		//-----------------------
		
			for( var prop in obj ){
			
			//---------------------
			
				var table_hl_th = document.createElement("TH");
					table_hl_th.style.textAlign = obj[prop].align;
					table_hl_th.style.width 	= obj[prop].width;
					console.log(obj[prop].width);
					table_hl_th.innerHTML		= obj[prop].hltxt;
					
				//---------------------
					
					table_hl_th.style.cursor	= "pointer";
					table_hl_th.setAttribute("col_name" , prop );
					
					table_hl_th.onclick = function(){
						
						var col_name = this.getAttribute("col_name");
						
						if( window.obj_to_sort == undefined ){
								
							window.obj_to_sort = [];
							window.obj_to_sort["direction"] = "ascending" ;
						}
						else{
							
							if( window.obj_to_sort["direction"] == "ascending" && window.obj_to_sort["val"] == col_name ){
									
								window.obj_to_sort["direction"] = "descending";
							}
							else{
								window.obj_to_sort["direction"] = "ascending";
							}
						}
							
						window.obj_to_sort["val"] = col_name ;
							
						view_call();
					}
					
				//---------------------
					
					table_hl_tr.appendChild(table_hl_th);
			
				//---------------------
			}
		
		//-----------------------
			
			if( opt == true ){
				
				var table_hl_th = document.createElement("TH");
					table_hl_th.style.textAlign = "center";
					table_hl_th.style.minWidth 	= "100px";				
					table_hl_th.innerHTML		= "Options";
					
				table_hl_tr.appendChild(table_hl_th);
			}
		
		//-----------------------
		
			return table_hl_tr;
		
		//-----------------------
	}
	
//-------------------------------------------------------------

	table_build[""] = function( cell_align , cell_width , cell_val , cell_ph , json_path , json_part , row_id , col_name , dd_ary ){
		
		//---------------------------
		
			var func_api = window.snap_table_func_api;
		
		//---------------------------
		
			var table_td = document.createElement("TD");
				table_td.style.textAlign 	= cell_align;
			
		//-----------------------
		
			return table_td;
		
		//-----------------------
	}
	
//-------------------------------------------------------------

	table_build["static"] = function( cell_align , cell_width , cell_val , cell_ph , json_path , json_part , row_id , col_name , dd_ary ){
		
		//-----------------------
		
		var table_td = document.createElement("TD");
			table_td.style.textAlign 	= cell_align;
			table_td.style.width 		= cell_width;	
			table_td.innerHTML			= cell_val;
			
		//-----------------------
		
			return table_td;
		
		//-----------------------
	}

//-------------------------------------------------------------

	table_build["input"] = function( cell_align , cell_width , cell_val , cell_ph , json_path , json_part , row_id , col_name , dd_ary ){
		
		//---------------------------
		
			var func_api = window.snap_table_func_api;
		
		//---------------------------
		
		var table_td = document.createElement("TD");
			table_td.style.width 		= cell_width;	
			
		//-----------------------
		
			var table_input = document.createElement("INPUT");
			table_td.appendChild(table_input);
				
				table_input.style.width		= "96%";
				table_input.style.textAlign	= cell_align;
				table_input.placeholder 	= cell_ph;
				
				table_input.value = cell_val;
				if( cell_val == "null" ){ table_input.value = "" };
				
				table_input.setAttribute( "json_path" , json_path );
				table_input.setAttribute( "json_part" , json_part );
				table_input.setAttribute( "row_id" , row_id );
				table_input.setAttribute( "col_name" , col_name );
		
		//-----------------------
				
				table_input.onchange = function(){
					
					var json_path 	= this.getAttribute( "json_path" );
					var json_part 	= this.getAttribute( "json_part" );
					var row_id 		= this.getAttribute( "row_id" );
					var col_name 	= this.getAttribute( "col_name" );
					
					var cell_val 	= this.value;
					if( this.value == "" ){ var cell_val = "null" };
					
					var formData = new FormData();
						formData.append("function", "json_change" );
						formData.append("json_path", json_path );
						formData.append("json_part", json_part );
						formData.append("row_id", row_id );
						formData.append("col_name", col_name );
						formData.append("cell_val", cell_val );

						form_post( func_api , formData );	
				}
			
		//-----------------------
		
			return table_td;
		
		//-----------------------
	}

//-------------------------------------------------------------

	table_build["checkbox"] = function( cell_align , cell_width , cell_val , cell_ph , json_path , json_part , row_id , col_name , dd_ary ){
		
		//---------------------------
		
			var func_api = window.snap_table_func_api;
		
		//---------------------------
		
			var table_td = document.createElement("TD");
				table_td.style.textAlign 	= cell_align;
				table_td.style.width 		= cell_width;	
		
		//-----------------------
			
			if( cell_val == "true" ){ var is_chk = true; } else{ var is_chk = false };
			
			var table_input = document.createElement("INPUT");
			table_td.appendChild(table_input);
				
				table_input.type	= "checkbox";
				table_input.checked = is_chk;
				
				table_input.setAttribute( "json_path" , json_path );
				table_input.setAttribute( "json_part" , json_part );
				table_input.setAttribute( "row_id" , row_id );
				table_input.setAttribute( "col_name" , col_name );
		
		//-----------------------
				
				table_input.onchange = function(){
					
					var json_path 	= this.getAttribute( "json_path" );
					var json_part 	= this.getAttribute( "json_part" );
					var row_id 		= this.getAttribute( "row_id" );
					var col_name 	= this.getAttribute( "col_name" );
					var cell_val 	= this.checked;
				
					var formData = new FormData();
						formData.append("function", "json_change" );
						formData.append("json_path", json_path );
						formData.append("json_part", json_part );
						formData.append("row_id", row_id );
						formData.append("col_name", col_name );
						formData.append("cell_val", cell_val );

						form_post( func_api , formData );	
				}
					
		//-----------------------
		
			return table_td;
		
		//-----------------------
	}

//-------------------------------------------------------------

	table_build["dd_fk"] = function( cell_align , cell_width , cell_val , cell_ph , json_path , json_part , row_id , col_name , dd_ary ){
		
		//---------------------------
		
			var func_api = window.snap_table_func_api;
		
		//---------------------------
		
		var table_td = document.createElement("TD");
			table_td.style.textAlign 	= cell_align;
			table_td.style.width 		= cell_width;				
			
		//-----------------------
		
			var table_select = document.createElement("SELECT");
			table_td.appendChild(table_select);
				
				table_select.style.width = "96%";
				
			//-----------------------
				
				for( prop in dd_ary ){
					
					var table_opt = document.createElement("OPTION");
						table_opt.value 	= prop;
						table_opt.innerHTML = dd_ary[prop];
						
					table_select.appendChild(table_opt);
				}
				
			//-----------------------
			
				table_select.value = cell_val;
				
				table_select.setAttribute( "json_path" , json_path );
				table_select.setAttribute( "json_part" , json_part );
				table_select.setAttribute( "row_id" , row_id );
				table_select.setAttribute( "col_name" , col_name );
		
		//-----------------------
				
				table_select.onchange = function(){
					
					var json_path 	= this.getAttribute( "json_path" );
					var json_part 	= this.getAttribute( "json_part" );
					var row_id 		= this.getAttribute( "row_id" );
					var col_name 	= this.getAttribute( "col_name" );
					var cell_val 	= this.value;
				
					var formData = new FormData();
						formData.append("function", "json_change" );
						formData.append("json_path", json_path );
						formData.append("json_part", json_part );
						formData.append("row_id", row_id );
						formData.append("col_name", col_name );
						formData.append("cell_val", cell_val );

						form_post( func_api , formData );	
				}
			
		//-----------------------
		
			return table_td;
		
		//-----------------------
	}

//-------------------------------------------------------------



	table_build["row_add"] = function( json_path , json_part , json_def_part ){
		
		//---------------------------
		
			var func_api = window.snap_table_func_api;
		
		//---------------------------
	
			var table_tr = document.createElement("TR");
			
		//------------------------
		
				var table_td = document.createElement("TD");
				table_tr.appendChild( table_td );
					table_td.style.background = "none";
					table_td.style.border = "none";
					table_td.style.textAlign = "left";
		
		//------------------------
		
					var table_btn = document.createElement("BUTTON");
					table_td.appendChild( table_btn );
						table_btn.innerHTML = "add";
						
						table_btn.setAttribute( "json_path" , json_path );
						table_btn.setAttribute( "json_part" , json_part );
						table_btn.setAttribute( "json_def_part" , json_def_part );
						
						table_btn.onclick = function(){
							
							var json_path 		= this.getAttribute( "json_path" );
							var json_part 		= this.getAttribute( "json_part" );
							var json_def_part 	= this.getAttribute( "json_def_part" );
							
							var formData = new FormData();
								formData.append("function", "json_row_add" );
								formData.append("json_path", json_path );
								formData.append("json_part", json_part );
								formData.append("json_def_part", json_def_part );

								form_post( func_api , formData , view_call );	
						}
						
		//------------------------
		
			return table_tr;
		
		//------------------------
	}


//---Sort Object and Return------------------------------------

	function sort_obj( content ){
		
		//-------------------
		
			if( window.obj_to_sort != undefined ){
			
				var to_sort = window.obj_to_sort["val"];
						
				var sort_ary 		= [];
				var obj_sort 		= [];
				var obj_sort_prep 	= [];
				
			//-------------------
				
				for( var prop in content ){
					
					if( typeof content[prop][to_sort] === 'string' ){
						
						var is_sort = content[prop][to_sort].toLowerCase();
					}
					
					sort_ary.push( is_sort );
					obj_sort_prep[ is_sort ] = content[prop];
				}
				
			//-------------------
					
					//alert( window.obj_to_sort["direction"] );
					
					sort_ary.sort();
					
					if( window.obj_to_sort["direction"] == "descending" ){
						
						sort_ary.reverse();
					}
					
			//-------------------
				
					var i = 1;
					
					for( sort_prop in sort_ary ){
						
						obj_sort["sort_"+i] = obj_sort_prep[ sort_ary[sort_prop] ];
						i ++;
					}
				
				//-------------------
				
					console.log( obj_sort );	
					return obj_sort;
				
				//-------------------
			}
			else{
				return content;
			}
			
		//-------------------
	}
//-------------------------------------------------------------





