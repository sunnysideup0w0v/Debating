if ($.cookie('loginUserToken')) {
    // axios로 main_info 정보 가져오기.
    
            const instance = axios.create({
                baseURL: 'http://15.165.177.142',
                timeout: 1000,
                headers: {'X-Http-Token': $.cookie('loginUserToken')}
            });
    
            instance.get('/main_info', {
                params: {
                    device_token: '웹브라우저',
                    os: 'etc'
                }
            })
            .then(function (response) {
                console.log(response);
    
                // 제목을 따서 텍스트에 반영
                let title = response.data.data.topic.title
                $('#thisWeekTitle').text(title)
    
                $('#thisWeekImg').attr('src', response.data.data.topic.img_url)
    
                // 댓글 배열을 따서
                let replyArr = response.data.data.replies
    
                // 배열 내부의 하나하나를 forEach로 뽑아봄
                replyArr.forEach(element => {
                    
                    // element안에 댓글 정보가 모두 담겨있다. => content / user.nick_name 활용
                    // <p>내용(닉네임)</p> 의 양식을 div안에 추가
                    let content = element.content
                    let writerNick = element.user.nick_name
                    $('#replies').append(`<li><p>${content}(${writerNick})</p></li>`)
    
                });
    
                let email = response.data.data.user.email
                $('#loginUserEmail').text(email)
    
                let nickName = response.data.data.user.nick_name
                $('#loginUserNickName').text(nickName)
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        else {
            alert('잘못된 접근입니다. 다시 로그인 해주세요.')
            $(location).attr('href', 'login_practice.html');
        }
$('#logoutBtn').click(function() {
    $.removeCookie('loginUserToken')
    $(location).attr('href', 'login_practice.html');
})