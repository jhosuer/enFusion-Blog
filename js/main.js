$(init);
function init() {
    // if(!localStorage.setItem('items', loginUserName)) {
    //     windows.location.replace('index.html');
    // } else {

    submitForm();
    changeFormToLogin();
    loginToBlog();
    toggleSidebar();
    savePostData();
    getBlogData();
    whatTheLoginShows();
    logout();
//}

}

function submitForm() {
    $('.signupInput').on('focusout', function () {
        let userName = $('#uname').val();
        let password = $('#password').val();
        let cpassword = $('#cpassword').val();
        let passwordFormat = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
        let postData = { user: userName, pass: password };
        let validEmail = validateEmail(userName);

        //        $.get('http://localhost:3000/users?user='+userName,function(data){alert(JSON.stringify(data))});


        if ($.trim(userName).length == 0) {
            $("#signupErrorMessage").html(`username cannot be an empty field`);

        }
        if (!validEmail) {
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
        if (password != cpassword) {
            $("#signupErrorMessage").html(`passwords not equal`);
        }

        // verify user starts here
        let count = 0;
        $.get('http://localhost:3000/users?user=' + userName, function (data) {
            $.each(data, function (index, element) {
                let verifyUser = JSON.stringify(data[index].user);
                count++;
                //alert(`${verifyUser} and ${count}`);
                if (count >= 1) {
                    $("#signupErrorMessage").html(`email already exists in database, please login`);
                    //alert("email already exists in database, please login");
                    $("#submit").unbind().bind('click', function (event) {
                        return false;
                    });
                }

            });
        });

        if ((password == cpassword) && (password != '') && ((password == password.match(passwordFormat)))) {
            $("#signupErrorMessage").html('');
            $("#submit").unbind().bind('click', function (event) {
                event.preventDefault();
                $.post('http://localhost:3000/users', postData, function () {
                    $('#SignupSuccessMessage').html('form submitted successfully<br>please login below');
                });

                $('#signup').trigger('reset');
            });
        }
    });

};

function changeFormToLogin() {
    $('#loginRedirect a').on('click', function () {
        $('#signup').css('display', 'none');
        $('#login').css('display', 'block');
    });
    $('#signupRedirect a').click(function () {
        $('#login').css('display', 'none');
        $('#signup').css('display', 'block');
    });
}


function loginToBlog() {
    submitForm();
    $('.loginInput').on('focusout', function () {
        let loginUserName = $('#loginname').val();
        let loginPassword = $('#loginpassword').val();
        sessionStorage.setItem('userLogin',loginUserName);

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
            $("#loginSubmit").on('click', function () {
                $.get('http://localhost:3000/users?user=' + loginUserName, function (data) {
                    $.each(data, function (index, element) {
                        $.each(element, function (key, value) {
                            if ((userCount <= 1) && (element.user == loginUserName) && (element.pass == loginPassword)) {
                                // alert(`${element.user} and ${key}`);
                                //Cookies.set('name', loginUserName);
                                localStorage.setItem('items', loginUserName);
                                userCount++;
                                //function pageRedirect() {
                                window.location.replace("dashboard.html");
                                /* sweet alert starts here */
                                const toast = swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000
                                });

                                toast({
                                    type: 'success',
                                    title: 'Signed in successfully'
                                })
                                /* sweet alert ends here */

                            }
                            else {
                                return false;
                            }
                        });

                    });
                });
            });
        }
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


/* WYSIWYG TEXT EDITOR */

$('.toolbar a').click(function () {
    var command = $(this).data('command');
    if (command == 'p' || command == 'h1' || command == 'h2' || command == 'h3' || command == 'h4' || command == 'h5' || command == 'h6') {
        document.execCommand('formatBlock', false, command);
    }
    if (command == 'createlink' || command == 'insertimage') {
        url = prompt('Enter the link here: ', 'http:\/\/');
        document.execCommand($(this).data('command'), false, url);
    } else document.execCommand($(this).data('command'), false, null);
});
$('#heading').click(function () {
    $('.hidethem').toggle();
    $('.hiddenheading').toggle();
});

$('#counter').on('input', function () {
    var text = this.textContent,
        count = text.trim().replace(/\s+/g, ' ').split(' ').length;
    $('#count').text(count);
})

/* end of editor */


/* Login Functionalities */
function whatTheLoginShows() {
    //let currentUserOnline = Cookies.get('name');
    let existingUser = localStorage.getItem('items')
    $('#userTag').append(existingUser);
}


/* saving post data to db.json */
function savePostData() {
    loginToBlog();
    let id; let title; let message; let image; let blogData;
    $('#saveDraft').on('click', function savedraft() {
        title = $('#postTitle').val();
        message = $('.card-body').val();
        image = 'https://picsum.photos/200/300/?random';
        blogData = { postTitle: title, postMessage: message, postImage: image,userId:localStorage.getItem('items') };
        //event.preventDefault();
        $.post('http://localhost:3000/posts', blogData, function () {
            /* sweet alert starts here */
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Your post has been made',
                showConfirmButton: false,
                timer: 1500
            })
            /* sweet alert ends here */
        });

        $('#signup').trigger('reset');
    });

    /* view post */
    let currentdate = new Date();

    $.ajax({
        type: "GET",
        url: `http://localhost:3000/posts?userId=${localStorage.getItem('items')}`,
        dataType: "JSON",
        success: function (response) {
            let newResponse = response.reverse();

            $.each(newResponse, function (index, value) {
                //alert(value.postTitle)
                let title = value.postTitle;
                let blogMessage = value.postMessage;
                let blogImage = value.postImage;
                id = value.id;
                let blogList = `${blogImage} ${title} ${blogMessage}`;
               // Cookies.set('id', loginUserName);
                let postList = `<tr>
                    <td>
                        <input type="checkbox" class="chk" value='${title}'></td>
                    <td><a href='createpost.html?id=${id}'>${title}</a></td>
                    <td>
                        ${localStorage.getItem('items')}</td><td>blog</td><td>blog,style,fashion,trends</td><td><button class="postDelete" id="${id}">del</button><i class="far fa-trash-alt"><a href='createpost.html?id=${id}'></i><button id="${id}" class="postEdit">edit</button></a></td><td> ${currentdate.getDate()} 
                        ${currentdate.getMonth() + 1} ${currentdate.getFullYear()}
                    </td>
                    </tr>
                    `;
                $('.postTable table tbody').append(postList);
                /* Append Blog List */
                $('#publish').on('click', function () {
                    $('.blogPost .blogTopRow div').append(blogList);
                    //alert('hell yea');
                    //alert(blogList);
                });
            });
            $('.postDelete').on('click', function () {
                $.ajax({

                    url: `http://localhost:3000/posts/${this.id}`,
                    method: 'delete',
                    success: function () {
                        /* sweet alert starts here */
                        swal({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                        }).then((newResponse) => {
                            if (newResponse.value) {
                                // swal(
                                // 'Deleted!',
                                // 'Your file has been deleted.',
                                // 'success'
                                // )
                            }
                            else {
                                swal("Your imaginary file is safe!");
                            }
                        }).then(() => {
                            window.location.replace("dashboard.html");
                        });
                        /* sweet alert ends here */
                        //alert(`delete successful`);

                    }
                });
                return false;
            });
        }
    });
}


// function edit(id){
//     $.ajax({
//         url: `http://localhost:3000/posts/id`,
//         method: 'get',
//         success: function (response) {
//             let EditTitle = value.postTitle;
//             let updateMessage = value.postMessage;
//             let blogTitle = $('#postTitle').val(EditTitle);
//             let blogMessage = $('.card-body').val(updateMessage);


//              /* sweet alert starts here */
//                         swal({
//                             position: 'top-end',
//                             type: 'success',
//                             title: 'You can now update',
//                             showConfirmButton: false,
//                             timer: 1500
//                         })
//                         /* sweet alert ends here */
//             $.ajax({
//                 url: `http://localhost:3000/posts`,
//                 method: 'put',
//                 success: function (response) {
                   
//                     // blogData = { postTitle: title, postMessage: message};

//                     // $('#saveDraft').on('click', function savedraft() {

//                     //     /* sweet alert starts here */
//                     //     swal({
//                     //         position: 'top-end',
//                     //         type: 'success',
//                     //         title: 'Your post has been made',
//                     //         showConfirmButton: false,
//                     //         timer: 1500
//                     //     })
//                     //     /* sweet alert ends here */
//                     // }


                    
//                 }
//             })
//         }
//     });
// };

function logout() {
    $('#logout').on('click',function(){
        localStorage.clear();
        window.location.replace("index.html");
    });
}

function getBlogData() {
    $('#inputSearch').on('keyup',function(){
        let value = $(this).val().toLowerCase();
        $('.postTable table tbody').filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

}

