$("#loginButton").click(function() {
    console.log("clicked")
    const form = new FormData();
    form.append('email', $("#email").val());
    form.append('password', $("#pw").val());

    axios.post('http://15.165.177.142/user', form)
    .then(function (response) {
        // alert(response.data.message)
        
        let token = response.data.data.token
        console.log('로그인응답', token)

        $.cookie('loginUserToken', token)

        console.log('쿠키값', $.cookie('loginUserToken'))

        $(location).attr('href', 'main.html')

        // $(location).attr('href', 'main.html')
    })
    .catch(function (error) {
        console.log(error)
        // alert(error.response.data.message)
    });

})

$('#signUpButton').click(function() {

    $(location).attr('href', 'signup_practice.html');

})