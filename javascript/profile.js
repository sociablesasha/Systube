function profileSetting() {
    var photoBriefTag = document.getElementById("Profile[photoBrief]");
    var photoTag = document.getElementById("Profile[photo]");
    var emailTag = document.getElementById("Profile[email]");
    var passwordTag = document.getElementById("Profile[password]");
    var nameTag = document.getElementById("Profile[name]");

    $.ajax({
        type: "GET",
        url: Url.Profile,
        headers: { "token": localStorage.systube },
        success: function (response) {
            photoBriefTag.src = "data:image/png;base64," + response.photo;
            emailTag.value = response.email;
            passwordTag.value = response.password;
            nameTag.value = response.name;
        },
        error: function (error) {
            localStorage.removeItem('systube');
            closeNav('ProfileForm');
            setTimeout(openNav('LoginForm'), 1000);
        }
    });
}