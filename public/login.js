const loginForm = document.getElementById("loginForm");

//y'all ready for this? I've been waiting to use 'Moniker' for so long now. that word is so silly. if a word had a top-hat and a monocle, it would be moniker.
const loginFormMoniker = async (event) => {
    event.preventDefault();

    const username = document.getElementById("usernameLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();


//input values
if (!username || !password){
    alert("Hey, just wanted to let you know that you're missing a username and password from the field. You should definitely add what you need.")
    return;
}

if(password.length < 10){
    alert("Hey, we only allow moderately-ish strong passwords here. Pls add one w/ more than 10 characters");
    return;
}

const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({username, password}),
    headers: {"content-type": "application/json"}
});

if(response.ok){
    document.location.replace("/dashboard");
} else {
    alert(response.statusText);
    }
}

loginForm.addEventListener("submit", loginFormMoniker);