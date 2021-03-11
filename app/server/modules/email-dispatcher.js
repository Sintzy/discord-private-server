
var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect(
{
	host 	    : process.env.NL_EMAIL_HOST || 'smtp.gmail.com',
	user 	    : process.env.NL_EMAIL_USER || 'pedromaneldascouves@gmail.com',
	password    : process.env.NL_EMAIL_PASS || 'sintzy2020',
	ssl		    : true
});

EM.dispatchResetPasswordLink = function(account, callback)
{
	EM.server.send({
		from         : process.env.NL_EMAIL || 'pedromaneldascouves@gmail.com',
		to           : account.email,
		subject      : 'Password Reset',
		text         : 'something went wrong... :(',
		attachment   : EM.composeEmail(account)
	}, callback );
}

EM.composeEmail = function(o)
{
	let baseurl = process.env.NL_SITE_URL || 'http://localhost:3000';
	var html = "<html><body>";
		html += "Olá "+o.name+"!,<br><br>";
		html += "O seu nome é: <b>"+o.user+"</b><br><br>";
		html += "<a href='"+baseurl+'/reset-password?key='+o.passKey+"'>Clique aqui para resetar a sua password</a><br><br>";
		html += "Cheers,<br>";
		html += "</body></html>";
	return [{data:html, alternative:true}];
}