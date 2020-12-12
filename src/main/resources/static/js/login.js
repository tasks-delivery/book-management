 $(document).ready(function() {
  $("#login-btn").click(function(e) {
    e.preventDefault();

    var login = $("#login").val();
    var password = $("#password").val();

	var userData = {
                 login:login,
                 password:password
        }

    console.log(userData);

    $.ajax({
         method: "POST",
         url: "login",
         dataType: "json",
         contentType: 'application/json',
         data: JSON.stringify(userData),
         success: function(data) {

            console.log("token is " + data.token);
			document.cookie = "Authorization=" + data.token;

         },
         error: function(er) {
           console.log(er);
         },
          statusCode: {
             200: function() {
               location.href='/search';
             },
             400: function() {
              var cookies = document.cookie.split(";");

                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = cookies[i];
                     var eqPos = cookie.indexOf("=");
                     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                 }

               throw new Error('User cannot login');
             },
             500: function() {
              var cookies = document.cookie.split(";");

                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = cookies[i];
                     var eqPos = cookie.indexOf("=");
                     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                 }
               throw new Error('User cannot login');
             }
           }
       });

  })
});