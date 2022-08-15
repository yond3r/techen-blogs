const newPostForm = document.getElementById("newPost");

const newPost = async (event) =>{
    event.preventDefault();

    const titleEl = document.getElementById("postTitle");
    const contentEl = document.getElementById("postTitle");
    const title = titleEl.value;
    const content = contentEl.value;

    if(!title || !content){
        alert ("Hey buddy, you should enter in a title and/or text for your post. that's pretty critical.")
    } else {
        const response = await fetch ("/dashboard", {
            method: "POST",
            body: JSON.stringify({title, content}),
            headers: {"content-type": "application/json"}
        })

        if(response.ok){
            location.reload()
        } else {
            alert("whoops, the post did not create. Pls try again at a later time.")
        }
    }
}

newPostForm.addEventListener("submit", newPost);