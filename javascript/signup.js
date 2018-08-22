var photoBriefTag = document.getElementById("Signup[photoBrief]");
var photoTag = document.getElementById("Signup[photo]");

$(photoBriefTag).click(function () {
    $(photoTag).click();
});

$(photoTag).change(function () {
    var reader = new FileReader();
    reader.onload = function (blob) {
        $(photoBriefTag).attr('src', blob.target.result);
    };
    reader.readAsDataURL(this.files[0]);
});

$('#SignupButton').click(function () {
    var photoBriefTag = document.getElementById("Signup[photoBrief]");
    var photoTag = document.getElementById("Signup[photo]");
    var emailTag = document.getElementById("Signup[email]");
    var passwordTag = document.getElementById("Signup[password]");
    var nameTag = document.getElementById("Signup[name]");

    if (photoTag.value == null || photoTag.value == "") {
        photoTag.click();
        return;
    }

    if (emailTag.value == null || emailTag.value == "") {
        emailTag.focus();
        return;
    }

    if (passwordTag.value == null || passwordTag.value == "") {
        passwordTag.focus();
        return;
    }

    if (nameTag.value == null || nameTag.value == "") {
        nameTag.focus();
        return;
    }

    // AJAX
    var formData = new FormData();
    formData.append('photo', photoTag.files[0]);
    formData.append('email', emailTag.value);
    formData.append('password', passwordTag.value);
    formData.append('name', nameTag.value);

    $.ajax({
        type: "POST",
        url: Url.Signup,
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            GoForm('LoginForm');
        },
        error: function (error) {
            $(photoBriefTag).removeAttr('src');
            photoTag.value = "";
            photoTag.files = null;
            emailTag.value = "";
            passwordTag.value = "";
            nameTag.value = "";
        }
    });
});