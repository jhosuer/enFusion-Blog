$(document).ready(function (){
    let id = getId();
    

    $.ajax({
        url: `http://localhost:3000/posts/${id}`,
        method: 'get',
        success: function (data) {
            //console.log(data.postImage);
            $('#postID').val(id)
            let dataDisplay = `<div class='col-md-4'><img src='${data.postImage}'<br><h4>${data.postTitle}</h4><p>${data.postMessage}</p></div>`

            $('.fullBlogPost .fullBlogTopRow').append(dataDisplay);
            loadComment();
        }
    });

    function loadComment() {
        $.ajax({
            url: `http://localhost:3000/comments?postid=${getId()}`,
            method: 'get',
            success: function(data) {
                //console.log(data[0].title);
                let commentRes =  `<div class='col-md-12'>${data[0].title}<br>${data[0].message}</div>`
                $('#commentResult span').append(commentRes);
            },
            error: function(data) {
                console.log(data);
            }
        });     
    }

    function getId(){
        let url = new URL(document.location.href);
        let id = url.searchParams.get('postid');
        return id;
    }

    $('#comment').click(function(){
        //alert($('#postID').val());
        let postId = $('#postID').val();
        let commentCaption = $('#commentCaption').val();
        let commentMessage = $('#commentMessage').val();
        let user = localStorage.getItem('items');
        let commenter = '';
        if(user === null) {
            commenter = 'anonymous';
        } else {
            commenter = user;
        }
        let commentData = {
            title: commentCaption,
            message: commentMessage,
            postid: postId,
            user: user
        }
        $.post('http://localhost:3000/comments', commentData, function () {
                    alert('your post has clicked!');
                    loadComment();
        });
    });
});