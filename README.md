# **REST API** with JWT, AJAX, JQuery
## Systube
### Purpose
1. Using JWT on the client.
2. ... AJAX.
3. ... JQuery.
4. ... Bootstrap.
5. ... Fontawesome.
6. ... Youtube Embed.
7. ... Responsive Design.

### Technical Stack
* JWT
* AJAX
* JQuery
* Bootstrap
* Fontawesome
* Infinite scroll
> ### Performance Issue.
> It was too slow to load many YouTube videos.
> ### Solution
> 1. In Youtube Option : https://www.youtube.com/embed/{code}?controls=2
> 2. In Logic : Paging and Infinite scroll
> 3. In Code : Use setTimeout() to take the task to the queue.
> ### Result
> 6s -> 1.7s


## JWT, AJAX, LocalStorage
### Sign Up
Register your account.
```javascript
$.ajax({
    type: "POST",
    url: Url.Signup,
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
        // Sign Up Success
    },
    error: function (error) {
    }
});
```

### Log In
Log In to your account.
```javascript
$.ajax({
    type: "POST",
    url: Url.Login,
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
        // Log In Success
        // Store LocalStorage JWT.
    },
    error: function (error) {
    }
});
```

### Profile
Get your account.
```javascript
$.ajax({
    type: "GET",
    url: Url.Profile,
    headers: { "token": localStorage.systube },
    success: function (response) {
        // JSON (your profile)
    },
    error: function (error) {      
    }
});
```

### Card List
Parse JSON and Make Cards.
```javascript
$.ajax({
    type: "GET",
    url: Url.Card,
    headers: { "token": localStorage.systube },
    processData: false,
    contentType: false,
    success: function (response) {
        // Cards Append
    },
    error: function (error) {}
});
```

### Card Write
Like or DisLike Event
```javascript
$.ajax({
    type: "POST",
    url: Url.Card
    headers: { "token": localStorage.systube },
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
        // Success your request.
    }
    error: function (error) {      
    }
});
```

### Like or DisLike
Like or DisLike Event
```javascript
$.ajax({
    type: "POST",
    url: Url.Card + "/" + cardForm.value,
    headers: { "token": localStorage.systube },
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
        // Success your request.
    }
    error: function (error) {      
    }
});
```


## Photo
### Mobile - List
<img width="1680" alt="2018-08-22 3 42 10" src="https://user-images.githubusercontent.com/31611484/44447306-8d07d600-a622-11e8-9551-127191d26243.png">

### Mobile - Log In
<img width="1680" alt="2018-08-22 3 42 17" src="https://user-images.githubusercontent.com/31611484/44447307-8da06c80-a622-11e8-8484-fec15883a7c1.png">

### Mobile - Sign Up
<img width="1680" alt="2018-08-22 3 42 26" src="https://user-images.githubusercontent.com/31611484/44447308-8da06c80-a622-11e8-9572-5abb482d0e58.png">

### Mobile - Modal For Youtube Link Before Seleted
<img width="1680" alt="2018-08-22 3 42 34" src="https://user-images.githubusercontent.com/31611484/44447310-8e390300-a622-11e8-8ce5-8dbd86527e7d.png">

### Pad - List
<img width="1680" alt="2018-08-22 3 41 46" src="https://user-images.githubusercontent.com/31611484/44447305-8d07d600-a622-11e8-948a-5b6d8d2b2c5e.png">

### PC - List Before Login
<img width="1680" alt="2018-08-22 3 39 31" src="https://user-images.githubusercontent.com/31611484/44447294-8bd6a900-a622-11e8-9fff-6def644c5691.png">

### PC - Log In
<img width="1680" alt="2018-08-22 3 39 50" src="https://user-images.githubusercontent.com/31611484/44447295-8bd6a900-a622-11e8-9c7a-d13769bcc9c1.png">

### PC - Sign Up
<img width="1680" alt="2018-08-22 3 39 53" src="https://user-images.githubusercontent.com/31611484/44447296-8bd6a900-a622-11e8-8138-598bb2dfedee.png">

### PC - Profile
<img width="1680" alt="2018-08-22 3 40 12" src="https://user-images.githubusercontent.com/31611484/44447297-8bd6a900-a622-11e8-89c5-7b189863ea62.png">

### PC - List After Login
<img width="1680" alt="2018-08-22 3 40 28" src="https://user-images.githubusercontent.com/31611484/44447298-8c6f3f80-a622-11e8-8262-1aa1e872df05.png">

### PC - Modal For Youtube Link Before Seleted
<img width="1680" alt="2018-08-22 3 40 34" src="https://user-images.githubusercontent.com/31611484/44447299-8c6f3f80-a622-11e8-8bc8-833adf7e3745.png">

### PC - Modal For Youtube Link After Selected
<img width="1680" alt="2018-08-22 3 41 00" src="https://user-images.githubusercontent.com/31611484/44447300-8c6f3f80-a622-11e8-81fa-7cd4f4068e4d.png">

### PC - Write Card
<img width="1680" alt="2018-08-22 3 41 19" src="https://user-images.githubusercontent.com/31611484/44447303-8d07d600-a622-11e8-98b2-e63a6101ac3b.png">


## Histories
    2018.08.15. Design
    2018.08.16. Top-Nav, Side-Nav, Youtube-Modal, File-Input-Snipper.
    2018.08.17. AJAX(Log-In, Sign-Up, Profile) with JWT.
    2018.08.18. AJAX(Write-Card, Get-Cards).
    2018.08.19. AJAX(Like-Card, DisLike-Card).
    2018.08.20. Problems during load. (Performance - Low Loading Speed).
    2018.08.21. Solve Performance Issues. (Youtube-Embed-Options, Infinite scroll)
