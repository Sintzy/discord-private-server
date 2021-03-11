
function HomeController()
{

	var that = this;


	$('#btn-logout').click(function(){ that.attemptLogout(); });


	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});


	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

	this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			success: function(data){
	 			that.showLockedAlert('A sua conta foi apagada corretamente<br>Redirecionando para a pagina principal...');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: '/logout',
			type: 'POST',
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('Você foi logado<br>Redirecionando para a pagina principal...');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h4').text('Sucesso!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
}

HomeController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Sucesso!');
	$('.modal-alert .modal-body p').html('A sua conta foi atualizada');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
