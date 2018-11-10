$(init);

function init () {
    
    submitForm();
    changeFormToLogin();
    loginToBlog();
   
}

function submitForm() {
    
    $('.signupInput').on('focusout',function(){
        let userName = $('#uname').val();
        let password = $('#password').val();
        let cpassword = $('#cpassword').val();
        let passwordFormat = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
        let emailFormat = /^[a-z]+[0-9a-zA-Z_\.]*@[a-z_]+\.[a-z]+$/;
        let postData = {user: userName, pass: password};
        
//        $.get('http://localhost:3000/users?user='+userName,function(data){alert(JSON.stringify(data))});
          $.get('http://localhost:3000/users?user='+$(this),function(data){
              //alert(JSON.stringify(data))
              let text = data[0];
              alert(text);
          });
        
        if(userName != userName.match(emailFormat)) {
            $("#signupErrorMessage").html(`username must be an email address`);
        }
        if ((userName = '' || password == '')) {
            
            $("#signupErrorMessage").html(`password must be at least 8 letters long,"
                                "must contain a number, capital letter and a small letter`);
        }
        if ((password != password.match(passwordFormat))) {
            
            $("#signupErrorMessage").html(`password must be at least 8 letters long,"
                                "must contain a number, capital letter and a small letter`);
        }
       if(password != cpassword) {
            $("#signupErrorMessage").html(`passwords not equal`);
        }
        else if((password != '') && ((password == password.match(passwordFormat)))) {
             
            $("#signupErrorMessage").html('');
            
            $("#submit").click(function(event){
                  
                if($.get('http://localhost:3000/users?user='+userName,function(data){JSON.stringify(data)})){
                    $("#signupErrorMessage").fadeIn().html(`email already exists in database, please login`);
                    setTimeOut(function (){
                        $('#signupErrorMessage').fadeOut('slow')
                        }, 2000);
                } 
                else if (!$.get('http://localhost:3000/users?user='+userName,function(data){JSON.stringify(data)})){
                    $.post('http://localhost:3000/users',postData, function(){
                        $('#signupSuccessMessage').fadeIn().html('form submitted successfully');
                        setTimeOut(function (){
                        $('#signupSuccessMessage').fadeOut('slow')
                        }, 2000);
                    });
                    
                    $('#signup').trigger('reset');

                }
         });
        
        };
    });
};

function changeFormToLogin() {
    $('#loginRedirect a').on('click', function(){
        $('#signup').css({'display': 'none', 'transition': 'display 2s ease'});
        $('#login').css({'display': 'block', 'transition': 'display 2s ease'});
    });
    $('#signupRedirect a').click(function(){
        $('#login').css({'display': 'none', 'transition': 'display 2s ease'});
        $('#signup').css({'display': 'block', 'transition': 'display 2s ease'});
    });
}



function loginToBlog() {
        submitForm();
        $('.loginInput').on('focusout',function(){
        let loginUserName = $('#loginname').val();
        let loginPassword = $('#loginpassword').val();
        
        if ((loginUserName = '' || loginPassword == '')) {
            
            $("#loginErrorMessage").html(`username or password incorrect. Try again`);
        }
        
        $("loginSubmit").on('click', function(){
            
        });
    });
}