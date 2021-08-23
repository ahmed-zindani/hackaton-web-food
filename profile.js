firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        firebase.database().ref(`users/${uid}`)
            .once('value', (data) => {
                console.log(data.val())
                
                let username = document.getElementById('username');
                let useremail = document.getElementById("useremail")
                let phone = document.getElementById('userphone');
                let userprofile = document.getElementById("userimage")
                console.log(data.val().profile)
                 username.innerHTML =("name" +"="+ (data.val().Name))
                 useremail.innerHTML = ("email" + "="+(data.val().email))
                 phone.innerHTML = (  "phone number" + "=" + (data.val().number))
                 userprofile.setAttribute('src', data.val().profile)
            })
        
    } else {
        window.location.href = "login.html"
    }
});






function update() {
    let name = document.getElementById("name");
    let phones = document.getElementById("numbers");
    let username = document.getElementById('username');
    let phone = document.getElementById('userphone')
    console.log(name.value);
    console.log(phones.value);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`users/${user.uid}`).update({
                Name: name.value,

            })
                .then(() => {
                    username.innerHTML =( "name" + "=" +( name.value));
                    phone.innerHTML =  ( "phone" + "=" +( phones.value));
                })
        }

    })
}

let logout = () => {
    firebase.auth().signOut()
    .then(() =>{
        window.location.href = "login.html"
    })
}