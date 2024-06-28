const baseurl = "https://tarmeezacademy.com/api/v1"
axios.get(`${baseurl}/posts?limit=10`)
    .then((response) => {
        const posts = response.data.data;
        document.getElementById("posts").innerHTML = ""
        for (post of posts) {
            console.log(post)

            const author = post.author;
            const titlenull = ""
            if (post.title != null) {
                post.title = titlenull
            }

            let content = `
                <div class="card mt-5 shadow">
                    <div class="card-header">
                        <img src="${author.profile_image}" alt="#" style="width: 45px; height: 45px;"
                            class="rounded-circle border border-3">
                        <b>${author.username}</b>
                    </div>
                    <div class="card-body">
                        <img class="w-100" src="${post.image}" alt="#">
                        <h6 class="mt-1" style="color: rgb(152, 152, 152);">${post.created_at}</h6>
                        <h5>${post.title}</h5>
                        <p>
                            ${post.body}
                        </p>
                        <hr>

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chat-dots" viewBox="0 0 16 16">
                                <path
                                    d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                <path
                                    d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                            </svg>
                            <span>(${post.comments_count}) comments</span>
                        </div>
                    </div>
                </div>
                `
            document.getElementById("posts").innerHTML += content;
        }
    })
setupUI();
function loginbtnclicked() {
    const username = document.getElementById("username-input").value
    const passowrd = document.getElementById("password-input").value

    const params = {
        "username": username,
        "password": passowrd
    }
    const url = `${baseurl}/login`
    axios.post(url, params)
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            const modal = document.getElementById("login-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showloginalert();
            setupUI();
        })
}

function signupbtnclicked() {
    const name = document.getElementById("signup-name-input").value
    const username = document.getElementById("signup-username-input").value
    const passowrd = document.getElementById("signup-password-input").value

    console.log(name, username, passowrd)

    const params = {
        "username": username,
        "password": passowrd,
        "name": name,
    }
    const url = `${baseurl}/register`
    axios.post(url, params)
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            const modal = document.getElementById("signup-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showsignupalert();
            setupUI();
        }).catch((error) => {
            var alertpara = document.getElementById("alertpara").textContent;
            var newalertpara = document.createTextNode("This just got added");
            alertpara.appendChild(newalertpara);
        })
}

function logout() {
    showlogoutalert();
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setupUI();
}




// log out alert========================
function showlogoutalert() {

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    appendAlert('log out succsessfully', 'danger')
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert('#liveAlertPlaceholder')
        bsAlert.close()
    }, 3000);
}
// log out alert end========================

// sign up alert========================
function showsignupalert() {

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    appendAlert('sign up succsessfully', 'success')
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert('#liveAlertPlaceholder')
        bsAlert.close()
    }, 2000);
}
// sign up alert end========================
// ==================login alert
function showloginalert() {

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    appendAlert('Loged in succsessfully', 'success')
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert('#liveAlertPlaceholder')
        bsAlert.close()
    }, 2000);
}
//login alert==========================end

function setupUI() {
    const token = localStorage.getItem("token")
    const logindiv = document.getElementById("loggedin-div")
    const logoutdiv = document.getElementById("logout-div")
    if (token == null) { //the user is not loged in 
        logindiv.style.setProperty("display", "flex", "important")
        logoutdiv.style.setProperty("display", "none", "important")
    } else {
        logindiv.style.setProperty("display", "none", "important")
        logoutdiv.style.setProperty("display", "flex", "important")
    }
}
