$('#LoginButton').click(function () {
    var emailTag = document.getElementById("Login[email]");
    var passwordTag = document.getElementById("Login[password]");

    if (emailTag.value == null || emailTag.value == "") {
        emailTag.focus();
        return;
    }

    if (passwordTag.value == null || passwordTag.value == "") {
        passwordTag.focus();
        return;
    }

    // AJAX
    var formData = new FormData();
    formData.append('email', emailTag.value);
    formData.append('password', passwordTag.value);

    $.ajax({
        type: "POST",
        url: Url.Login,
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            localStorage.setItem('systube', response);
            GoForm('ProfileForm');
        },
        error: function (error) {
            emailTag.value = "";
            passwordTag.value = "";
        }
    });
});