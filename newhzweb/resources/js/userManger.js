
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
	$.ajax({

	    		url:'api/user/getAll',
	    		async:false,
	    		success:function(ajaxData){
	    			data=ajaxData
// 	    			dg.datagrid('loadData', data);		
	    		}
	    	});    
	
	console.log(data);
	
 	dg.datagrid({  
                title:"用户管理",  
                rownumbers:true,  
                fitColumns:true,  
                pagination:true,  
                data:data.slice(0,10) 
            });  
 	
 	var pager = dg.datagrid("getPager");
 	pager.pagination({  
 		displayMsg:'当前显示从 [{from}] 到 [{to}] 共[{total}]条记录',
        total:data.length,
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
		$('#dlg').dialog('open').dialog('setTitle','新增用户');
		$('#fm').form('clear');
		url = 'api/user/add';
	}
	
	function editRole(){
		var selected = dg.datagrid('getSelected');
		if (selected){			
			$("#userId").val(selected.userId);
			$("#userName").val(selected.userName);
			$("#roleName").val(selected.roleName);
			$("#description").val(selected.description);
		}else{
			alert("先选择一个");
			return;
		}
		$('#dlg').dialog('open').dialog('setTitle','修改用户');
		url = 'api/user/update';
	}

	function saveRole(){
		console.log(formToJson($("#fm").serialize()));
    	$.ajax({		
			url:url,
			data: formToJson($("#fm").serialize()),
			success:function(data){
				console.log(data);				
			}
		}); 						
	}
	
	function removeRole(){	
		var selected = dg.datagrid('getSelected');
    	$.ajax({		
			url:'api/user/delete',			
			data: {roleId:selected.roleId},
			success:function(data){
				console.log(data);				
			}
		}); 
	}		
	
	function rowformater(value,row,index){
		console.log(row);
	 	return "<a href='userRole.html?userId="+row.userId+"'>操作</a>";
	 } 
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
// 	$('#dg').datagrid('reload');
	
	
	
	(function($){
		function getCacheContainer(t){
			var view = $(t).closest('div.datagrid-view');
			var c = view.children('div.datagrid-editor-cache');
			if (!c.length){
				c = $('<div class="datagrid-editor-cache" style="position:absolute;display:none"></div>').appendTo(view);
			}
			return c;
		}
		function getCacheEditor(t, field){
			var c = getCacheContainer(t);
			return c.children('div.datagrid-editor-cache-' + field);
		}
		function setCacheEditor(t, field, editor){
			var c = getCacheContainer(t);
			c.children('div.datagrid-editor-cache-' + field).remove();
			var e = $('<div class="datagrid-editor-cache-' + field + '"></div>').appendTo(c);
			e.append(editor);
		}
		
		var editors = $.fn.datagrid.defaults.editors;
		for(var editor in editors){
			var opts = editors[editor];
			(function(){
				var init = opts.init;
				opts.init = function(container, options){
					var field = $(container).closest('td[field]').attr('field');
					var ed = getCacheEditor(container, field);
					if (ed.length){
						ed.appendTo(container);
						return ed.find('.datagrid-editable-input');
					} else {
						return init(container, options);
					}
				}
			})();
			(function(){
				var destroy = opts.destroy;
				opts.destroy = function(target){
					if ($(target).hasClass('datagrid-editable-input')){
						var field = $(target).closest('td[field]').attr('field');
						setCacheEditor(target, field, $(target).parent().children());
					} else if (destroy){
						destroy(target);
					}
				}
			})();
		}
	})(jQuery);