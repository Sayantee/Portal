/*
	*Sayan Pandey *15/IT/21*
*/
$(document).ready(function(){
	var count=1;
	$( ".drop_box3, .drop_box4, .drop_box5, .drop_box6, .drop_box7, .drop_box8" ).sortable({
		items: "> div"
	});
	$( ".drop_box3, .drop_box4, .drop_box5, .drop_box6, .drop_box7, .drop_box8").disableSelection();
	$(".clear").click(function(){
		
		$( ".drop_box3, .drop_box4, .drop_box5, .drop_box6, .drop_box7, .drop_box8").slideUp(function(){
			$(this).empty();
			$(this).slideDown();
		});
		$("table").find("button").removeAttr("disabled","disabled");
	});
	
});

//Ajax function Sayan Pandey*(15/IT/21)*
function setTable(x,y){
	$file="/students/subject/IT/itsem"+x;
	$output="#sem_tab"+x;
	$.ajax({
	   url: $file,
	   dataType:"text",
	   success:function(data)
	   {
		var sub_data = data.split(/\r?\n|\r/);
		var table_data = '<table class="table table-bordered table-hover table-striped">';
		for(var count = 0; count<sub_data.length-1; count++)
		{
			 var cell_data = sub_data[count].split(",");
			 table_data += '<tr>';
			 for(var cell_count=0; cell_count<cell_data.length; cell_count++)
			 {
				  if(count === 0)
				  {
				   table_data += '<th>'+cell_data[cell_count]+'</th>';
				  }
				  else if(count === sub_data.length-2 ){
					  table_data += '<th>'+cell_data[cell_count]+'</th>';
				  }
				  else if(cell_count%3===1){
					  table_data += '<td>'+cell_data[cell_count]+'<button class="drop btn btn-info" style="float:right;" onclick="accept(this,'+x+')">'+cell_data[cell_count]+'</button>'+'</td>';
				  }
				  else
				  {
				   table_data += '<td>'+cell_data[cell_count]+'</td>';
				  }
			 }
			 table_data += '</tr>';
			}
		table_data += '</table>';
		$($output).html(table_data);
		//No Live Change
		$(y).attr("onclick","NULL");
	}
  });
}
var id_count = 0;
function accept(x,y){
	$('<div id="'+id_count+'"class="drop btn btn-danger btn-lg" style="display:block">'+$(x).text()+'</div>').appendTo('.drop_box'+y).hide().slideDown("fast");
	$(x).attr("disabled","disabled");
	id_count++;
}
function submit(x){
	event.preventDefault();
	var choices = $(".drop_box"+x).sortable( "toArray" );
	if(choices.length==0){
		return false;
	}
	$("#sem_tab"+x).slideUp("slow");
	form_data="<form id="+x+" class='alert alert-info'><h3>Your Choices in order</h3>";
		for(i=0;i<choices.length;i++){
			form_data+='<div class="alert alert-warning">'+(i+1)+'.  '+$("#"+choices[i]).text()+'</div>';
		}
	form_data+="<button id='submit"+x+"' type='submit' style='min-width:20%' class='btn btn-success btn-lg'>Final Submit</button>";
	form_data+="<button id='reset"+x+"' onclick=_reset("+x+") style='min-width:20%;float:right' class='btn btn-warning btn-lg'>Reset</button>";
	form_data+="</form>";
	$("#sem_tab"+x).after(form_data);
	$("a[onclick='submit("+x+")']").attr("disabled","disabled").attr("onclick",x);
	return false;
}
function _reset(x){
	event.preventDefault();
	$("a[onclick="+x+"]").removeAttr("disabled").attr("onclick","submit("+x+")");
	$("form[id="+x+"]").fadeOut(function(){
		$(this).remove();
		$("#sem_tab"+x).slideDown();
	})
}
