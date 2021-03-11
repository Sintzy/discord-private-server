
$(document).ready(function(){
	
	var av = new AccountValidator();
	var sc = new SignupController();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
				av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
				av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
	

	
	$('#account-form h2').text('Criar conta');
	$('#account-form #sub').text('Crie sua conta para entrar no nosso server');
	$('#account-form-btn1').html('Cancelar');
	$('#account-form-btn2').html('Enviar');
	$('#account-form-btn2').addClass('btn-primary');
	


	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('Account Created!');
	$('.modal-alert .modal-body p').html('A sua conta foi criada</br>Clica ok para iniciar sessão na sua nova conta!');

});