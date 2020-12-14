 $(document).ready(function() {

 function removeCookies(){

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
 }

  $("#login-btn").click(function(e) {
    e.preventDefault();

    var helper = $( ".helper-text" );

    if(helper != null){
        helper.remove();
    }

    var fields = [];

    var login = $("#login");
    var password = $("#password");

    fields.push(login);
    fields.push(password);

    var formIsValida = true;

    for(i = 0; i < fields.length; i ++){

        if(fields[i].val().length == 0){
             fields[i].parent().append('<span class="helper-text">Field is required</span>');
             formIsValida = false;
        }

    }

    if(formIsValida == false){
        throw new Error('All fields are required');
    }

	var userData = {
                 login:login.val(),
                 password:password.val()
        }

    $.ajax({
         method: "POST",
         url: "login",
         dataType: "json",
         contentType: 'application/json',
         data: JSON.stringify(userData),
         success: function(data) {
			document.cookie = "Authorization=" + data.token;
         },

         error: function(xhr, status, error){
            if(xhr.responseText.includes('Invalid password')){
                password.parent().append('<span class="helper-text">Wrong password</span>');
            }

            if(xhr.responseText.includes('User does not exist')){
                login.parent().append('<span class="helper-text">User with this login does not exist</span>');
            }

         },
         statusCode: {
            200: function() {
              location.href='/search';
            },
            400: function() {
              removeCookies();
              throw new Error('User cannot login');
            },
            500: function() {
              removeCookies();
              throw new Error('User cannot login');
            }
         }
       });

  })
});