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
	
	initPage(1);
	pageLoad()
	
	function initPage(page){
		$.ajax({
		    		headers: {		            	    	        
		    	        "Content-Type":'application/x-www-form-urlencoded'
		    	    },
		    		url:'api/resources/get',	    		
		    		data:{page:1,number:10,type:'',text:'',value:''},
		    		async:false,
		    		success:function(ajaxData){
		    			console.log(ajaxData);
		    			data=ajaxData;
		    		}
		    	});    
	}	

	function pageLoad(){
	 	dg.datagrid({  
	                title:"资源管理",  
	                rownumbers:true,  
	                fitColumns:true,  
	                pagination:true,  
	                data:data.resource
	            });  
	} 
	
	
 	var pager = dg.datagrid("getPager");
 	pager.pagination({
 		showPageList:false,
 		displayMsg:'当前显示从 [{from}] 到 [{to}] 共[{total}]条记录',
        total:data.count,
        onSelectPage:function (pageNo, pageSize) {                                  

    		var search=formToJson($("#search").serialize());
    		
    		search=JSON.parse(search);
    				
    		console.log(_.defaults({page:1,number:10},search));
        	
	   		$.ajax({
	    		headers: {
	    	        "Content-Type":'application/x-www-form-urlencoded'
	    	    },
	    		url:'api/resources/get',	    		
	    		data:_.defaults({page:pageNo,number:10},search),	    		
	    		success:function(ajaxData){
	    			 dg.datagrid('loadData', {rows:ajaxData.resource,total:ajaxData.count});
	    		}
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
    
    
	function addTab(subtitle,url,icon){
		if(!tab.tabs('exists',subtitle)){			
			tab.tabs('add',{
				title:subtitle,
				content:createFrame('../tree/checkbox.html'),
				closable:true,
				icon:icon
			});
		}else{
			tab.tabs('select',subtitle);
			$('#mm-tabupdate').click();
		}
	}

	var url;
	
	function newRole(){
		$('#dlg').dialog('open').dialog('setTitle','新增资源');
		$('#fm').form('clear');
		url = 'api/resources/add';
	}
	
	function editRole(){
		var selected = dg.datagrid('getSelected');
		if (selected){
			$("#id").val(selected.id);
			$("#type").val(selected.type);
			$("#value").val(selected.value);
			$("#text").val(selected.text);
			$("#parentId").val(selected.parentId);
		}else{
			alert("先选择一个");
			return;
		}
		$('#dlg').dialog('open').dialog('setTitle','修改资源');
		url = 'api/resources/update';
	}

	function saveRole(){
		console.log(formToJson($("#fm").serialize()));
    	$.ajax({		
			url:url,
			data: formToJson($("#fm").serialize()),
			success:function(data){
				location.reload();
			}
		}); 						
	}
	
	function removeRole(){	
		var r=confirm("确认删除吗?");
		if(r){
			var selected = dg.datagrid('getSelected');
	    	$.ajax({		
	    		headers: {		            	    	        
	    	        "Content-Type":'application/x-www-form-urlencoded'
	    	    },
				url:'api/resources/delete',			
				data: {resourceId:selected.id},
				success:function(data){
					console.log(data);	
					location.reload();
				}
			}); 
		}
	}		
	
	
	function doSearch(){
// 		alert('You input: ' + value);
		
		var search=formToJson($("#search").serialize());
		
		search=JSON.parse(search);
				
		console.log(_.defaults({page:1,number:10},search));
		
   		$.ajax({
    		headers: {
    	        "Content-Type":'application/x-www-form-urlencoded'
    	    },
    		url:'api/resources/get',	    		
    		data:_.defaults({page:1,number:10},search),  		
    		success:function(ajaxData){
    			 dg.datagrid('loadData', {rows:ajaxData.resource,total:ajaxData.count});
    		}
    	}); 
	}
	
	//data:{page:pageNo,number:10,type:'',text:'',value:''},	 
