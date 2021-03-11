
$(document).ready(function(){

	var lv = new LoginValidator();
	var lc = new LoginController();



	$('#login').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{

				formData.push({name:'remember-me', value:$('#btn_remember').find('span').hasClass('fa-check-square')});
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
			lv.showLoginError('Falha no login', 'Reveja o nome ou a pass da conta');
		}
	}); 

	$("input:text:visible:first").focus();
	$('#btn_remember').click(function(){
		var span = $(this).find('span');
		if (span.hasClass('fa-minus-square')){
			span.removeClass('fa-minus-square');
			span.addClass('fa-check-square');
		}	else{
			span.addClass('fa-minus-square');
			span.removeClass('fa-check-square');
		}
	});


	
	var ev = new EmailValidator();
	
	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("Escreva um email valido");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			$('#cancel').html('OK');
			$('#retrieve-password-submit').hide();
			ev.showEmailSuccess("Um link para resetar a pass foi enviado para você");
		},
		error : function(e){
			if (e.responseText == 'email-not-found'){
				ev.showEmailAlert("Email não encontrado.");
			}	else{
				$('#cancel').html('OK');
				$('#retrieve-password-submit').hide();
				ev.showEmailAlert("Ops, serviço indisponiel temporariamente");
			}
		}
	});
	
});
