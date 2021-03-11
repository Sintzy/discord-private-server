
$(document).ready(function(){

	var hc = new HomeController();
	var av = new AccountValidator();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (av.validateForm() == false){
				return false;
			} 	else{

				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') hc.onUpdateSuccess();
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

// customize the account settings form //
	
	$('#account-form h2').text('Configuração ');
	$('#account-form #sub').text('Invite: https://discord.gg/C8zry2FGgD');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Apagar conta');
	$('#account-form-btn1').removeClass('btn-outline-dark');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Update');

// setup the confirm window that displays when the user chooses to delete their account //

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h4').text('Apagar conta?');
	$('.modal-confirm .modal-body p').html('Você quer mesmo apagar sua conta<br>Será expulso do nosso server.');
	$('.modal-confirm .cancel').html('Cancelar');
	$('.modal-confirm .submit').html('Apagar');
	$('.modal-confirm .submit').addClass('btn-danger');

});