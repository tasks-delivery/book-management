 $(document).ready(function() {
  $("#create-btn").click(function(e) {
    e.preventDefault();

    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var login = $("#login").val();
    var password = $("#password").val();

	var userData = {
			firstName:firstName,
            lastName:lastName,
            login:login,
            password:password
        }

    console.log(userData);

    $.ajax({
         method: "POST",
         url: "registration",
         dataType: "json",
         contentType: 'application/json',
         data: JSON.stringify(userData),
         success: function(data) {
           console.log(data);
         },
         error: function(er) {
           console.log(er);
         },
          statusCode: {
             200: function() {
               location.href='/';
             },
             400: function() {
               throw new Error('User cannot be created');
             }
           }
       });

  })
});