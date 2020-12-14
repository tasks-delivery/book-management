$(document).ready(function() {

  $("#create-btn").click(function(e) {
    e.preventDefault();

    var helper = $( ".helper-text" );

    if(helper != null){
        helper.remove();
    }

    var fields = [];

    var firstName = $("#firstName");
    var lastName = $("#lastName");
    var login = $("#login");
    var password = $("#password");

    fields.push(firstName);
        fields.push(lastName);
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
			firstName:firstName.val(),
            lastName:lastName.val(),
            login:login.val(),
            password:password.val()
        }

    $.ajax({
         method: "POST",
         url: "registration",
         dataType: "json",
         contentType: 'application/json',
         data: JSON.stringify(userData),
         success: function(data) {
           console.log(data);
         },
         error: function(xhr, status, error){
            if(xhr.responseText == "User already exists"){
                login.parent().append('<span class="helper-text">User with this login already exists</span>');
            }
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