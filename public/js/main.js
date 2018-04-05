<script>
var sGradeCheck = 0,
		aGradeCheck = 0,
		bGradeCheck = 0,
		cGradeCheck = 0,
		dGradeCheck = 0,
		eGradeCheck = 0,
		uGradeCheck = 0,
		avgPassPercentage = 0,
		totalStd = 0;
$(document).ready(function(){
	$('input[type=text]').each(function(){
		totalStd++;
	    var checkGrade = $(this).val();
	    // alert(checkGrade);
	    if(checkGrade == "S"){
	    	// alert(sGradeCheck);
	    	sGradeCheck++;
	    }else if(checkGrade == "A"){
	    	aGradeCheck++;
	    }else if(checkGrade == "B"){
	    	bGradeCheck++;
	    }else if(checkGrade == "C"){
	    	cGradeCheck++;
	    }else if(checkGrade == "D"){
	    	dGradeCheck++;
	    }else if(checkGrade == "E"){
	    	eGradeCheck++;
	    }else if(checkGrade == "U"){
	    	uGradeCheck++;
	    }else{

	    }

	});
	avgPassPercentage = (sGradeCheck + aGradeCheck + bGradeCheck + cGradeCheck + dGradeCheck + eGradeCheck)/totalStd;
	avgPassPercentage = avgPassPercentage * 100;
	readySet();
	$('#graphBtn').removeAttr("disabled");
});


</script>
