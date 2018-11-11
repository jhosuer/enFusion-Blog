$(init);

function init () {
    
    submitForm();
    changeFormToLogin();
    loginToBlog();
    toggleSidebar();
   
}

function submitForm() {
    
    $('.signupInput').on('focusout',function(){
        let userName = $('#uname').val();
        let password = $('#password').val();
        let cpassword = $('#cpassword').val();
        let passwordFormat = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
        let emailFormat = /^[a-z]+[0-9a-zA-Z_\.]*@[a-z_]+\.[a-z]+$/;
        let postData = {user: userName, pass: password};
        let validEmail = validateEmail(userName);
        
//        $.get('http://localhost:3000/users?user='+userName,function(data){alert(JSON.stringify(data))});

        
        if($.trim(userName).length == 0) {
            $("#signupErrorMessage").html(`username cannot be an empty field`);
            
        }
        if(!validEmail) {
            $("#signupErrorMessage").html(`username must be an email address`);
           }
        if ((password == '')) {
            
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
        
        // verify user starts here
            let count = 0;
            $.get('http://localhost:3000/users?user='+userName,function(data){
              $.each(data, function(index,element){
                 let verifyUser = JSON.stringify(data[index].user);
                  count++;
                  //alert(`${verifyUser} and ${count}`);
                  if(count >= 1){
                        $("#signupErrorMessage").html(`email already exists in database, please login`);
                        //alert("email already exists in database, please login");
                      $("#submit").unbind().bind('click', function(event){
                      return false;
                      });
                 }
                
              });   
            });
        
        if((password == cpassword) && (password != '') && ((password == password.match(passwordFormat)))){
             $("#signupErrorMessage").html('');
            $("#submit").unbind().bind('click', function(event){
                event.preventDefault();
                 $.post('http://localhost:3000/users',postData, function(){
                    $('#SignupSuccessMessage').html('form submitted successfully<br>please login below');
                 });

                $('#signup').trigger('reset');
            });
        }
    });
};

function changeFormToLogin() {
    $('#loginRedirect a').on('click', function(){
        $('#signup').css('display', 'none');
        $('#login').css('display', 'block');
    });
    $('#signupRedirect a').click(function(){
        $('#login').css('display', 'none');
        $('#signup').css('display', 'block');
    });
}



function loginToBlog() {
        submitForm();
        $('.loginInput').on('focusout',function(){
        let loginUserName = $('#loginname').val();
        let loginPassword = $('#loginpassword').val();
        
        if ((loginUserName == '' && loginPassword == '')) {
            
            $("#loginErrorMessage").html(`username or password incorrect. Try again`);
        }
        if ((loginUserName != '' && loginPassword == '')) {
            
            $("#loginErrorMessage").html(`All fields must be filled`);
        }
        if ((loginUserName == '' && loginPassword != '')) {
            
            $("#loginErrorMessage").html(`All fields must be filled`);
        }
        if ((loginUserName != '' && loginPassword != '')) {
            $("#loginErrorMessage").html(``);
            let userCount = 0;
            $("#loginSubmit").on('click', function(){
                $.get('http://localhost:3000/users?user='+loginUserName,function(data){
                $.each(data, function(index,element){
                    $.each(element, function(key,value){
                        if((userCount <= 1) && (element.user == loginUserName) && (element.pass == loginPassword)){
                           // alert(`${element.user} and ${key}`);
                            $.session.set('some key', loginUserName);
                            userCount++;
                            //function pageRedirect() {
                                window.location.replace("dashboard.html");
                            //}      
//                            //setTimeout("pageRedirect()", 10000);
                            //return alert(true);
                            
                        }
                        else {
                        return false;
                        }
//                        if(element.user == loginUserName) {
//                            return alert(true);
//                            
//                        }
                    });

                });   
            });
        });
        }
            //loginUserName = userName;
    });
}


// Function that validates email address through a regular expression.
function validateEmail(userName) {
    let emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (emailFilter.test(userName)) {
        return true;
    }
    else {
        return false;
    }
}

function toggleSidebar() {
    $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
}