var events=0;
$(document).ready(function(){
	if(events ==0){
		var $a=$('#a');
		var $b=$('#b');
		var $c=$('#c'); 
		$a.show(10);
		$b.hide(10);
		$c.hide(10); 
		events++;		
	}
	var $a=$('#a');
	var $b=$('#b');
	var $c=$('#c');
	$('.buta').click(function() {
		$a.show(10);
		$b.hide(10);
		$c.hide(10);
	});
	$('.butb').click(function() {
		$a.hide(10);
		$b.show(10);
		$c.hide(10);		
	});
	$('.butc').click(function() {
		$a.hide(10);
		$b.hide(10);
		$c.show(10);		
	});
});