var editIndex = undefined;
	var dg=$('#dg');
	
	function endEditing(){
		if (editIndex == undefined){return true}
		if (dg.datagrid('validateRow', editIndex)){
			var ed = dg.datagrid('getEditor', {index:editIndex,field:'productid'});
			var productname = $(ed.target).combobox('getText');
			dg.datagrid('getRows')[editIndex]['productname'] = productname;
			dg.datagrid('endEdit', editIndex);
			editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}		
	
	function onClickRow(index){
		if (editIndex != index){
			if (endEditing()){
				dg.datagrid('selectRow', index)
						.datagrid('beginEdit', index);
				editIndex = index;
			} else {
				dg.datagrid('selectRow', editIndex);
			}
		}
}
	

var data;

$(function(){	
	
	initPage();
	
	function initPage(){	
		$.ajax({    		
    		url:'api/role/all',
    		async:false,
    		success:function(ajaxData){
    			data=ajaxData
//	    			dg.datagrid('loadData', data);		
    		}
    	});
	}	    				
	
 	dg.datagrid({  
                title:"角色管理",  
                rownumbers:true,  
                fitColumns:true,  
                pagination:true,  
                data:data.slice(0,10) 
            });  
 	
 	var pager = dg.datagrid("getPager");
 	 	
 	pager.pagination({  
 		displayMsg:'当前显示从 [{from}] 到 [{to}] 共[{total}]条记录',
        total:data.length,
        onRefresh:function(){
        	dg.datagrid('reload');	
        },
        onSelectPage:function (pageNo, pageSize) {
            var start = (pageNo - 1) * pageSize;  
            var end = start + pageSize;            
            console.log(data.slice(start, end));            
            dg.datagrid("loadData", data.slice(start, end));  
            pager.pagination('refresh', {
                total:data.length,  
                pageNumber:pageNo
            });  
        }  
    });  
		
})	

	

	var tab=$('#tab');
	var tt=$('#tt');
	
    tt.tree({
        onClick: function (node) {        
	        if(tt.tree('isLeaf', node.target)){
	        	addTab(node.text,node.attributes.url,'111');	
	        };

        }
    });	    
        
	
	 function createFrame(url)
	 {
	 	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	 	return s;
	 }
    

	var url;
	
	function newRole(){
		$('#dlg').dialog('open').dialog('setTitle','新增角色');
		$('#fm').form('clear');
		url = 'api/role/add';
	}
	
	function editRole(){
		var selected = dg.datagrid('getSelected');
		if (selected){			
			$("#roleId").val(selected.roleId);
			$("#name").val(selected.name);
			$("#roleName").val(selected.roleName);
			$("#description").val(selected.description);
		}else{
			alert("先选择一个");
			return;
		}
		$('#dlg').dialog('open').dialog('setTitle','修改角色');
		url = 'api/role/update';
	}

	function saveRole(){
	//	alert(decodeURIComponent($("#fm").serialize(),true));
		console.log(formToJson($("#fm").serialize()));		
    	$.ajax({		
			url:url,			
			data: formToJson($("#fm").serialize()),
			success:function(data){		
				$('#dlg').dialog('close');
				
				$.ajax({    		
		    		url:'api/role/all',		    		
		    		success:function(ajaxData){
		    			data=ajaxData;
			    		dg.datagrid('loadData', {rows:ajaxData,total:ajaxData.length});		
		    		}
		    	});
				
			}
		});     	    	    	    	    
	}
	
	function removeRole(){
		dg.datagrid('reload');
		console.log(_.pluck(dg.datagrid('getSelections'), 'roleId'));
		var r=confirm("确认删除吗?");
		if(r){
			var selected = dg.datagrid('getSelected');
	    	$.ajax({	
	    		headers: {		            	    	        
	    	        "Content-Type":'application/x-www-form-urlencoded'
	    	    },
				url:'api/role/delete',
				data: {roleId:selected.roleId},
				success:function(data){
					console.log(data);	
					
					$.ajax({    		
			    		url:'api/role/all',		    		
			    		success:function(ajaxData){
			    			data=ajaxData;
				    		dg.datagrid('loadData', {rows:ajaxData,total:ajaxData.length});		
			    		}
			    	});
					
				}
			}); 	
		}		
	}		
			
	function doSearch(value){
		alert('You input: ' + value);
	}
	
	function rowformater(value,row,index){
		console.log(row);
	 	return "<a href='checkbox.html?roleId="+row.roleId+"'>操作</a>";
	 } 
	