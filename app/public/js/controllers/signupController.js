
function SignupController()
{

	$('#account-form-btn1').click(function(){ window.location.href = '/';});


	$('.modal-alert #ok').click(function(){ setTimeout(function(){window.location.href = '/';}, 300)});
}