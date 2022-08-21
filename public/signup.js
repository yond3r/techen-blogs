const signupForm = document.getElementById("signupForm");

const signupMoniker = async (event) => {
    event.preventDefault();

    const username = document.getElementById("usernameSignup").value.trim();
    const password = document.getElementById("passwordSignup").value.trim();

//inputs
if (!username || !password){
    alert("A username and password need to be entered in order to create an account.");
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
})

if(response.ok){
    document.location.replace("/dashboard");
} else {
    alert(response.statusText);
}};

signupForm.addEventListener("submit", signupMoniker);