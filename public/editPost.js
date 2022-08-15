const deleteBtn = document.getElementById("remove")
const updateForm = document.getElementById("updateForm")
const post = document.getElementById("post")

const removePost = async (event) => {
    event.preventDefault();
    const id = post.getAttribute("dataPostId");

    const response = await fetch (`/dashboard/${id}`, {
        method: "DELETE"
    })

    if(response.ok){
        //replaces one resource w/ current provided
        document.location.replace('/dashboard');
    } else {
        alert("Try again later! the post did not delete! womp womp")
    }
}

const updatePost = async (event) => {
    const titleEl = document.getElementById("titleText")
    const contentEl = document.getElementById("contentText")
    const title = titleEl.value;
    const content = contentEl.vale;
    const id = post.getAttribute("dataPostId")


    const response = await fetch(`/dashboard/singlepost/${id}`, {
        method: "PUT",
        body: JSON.stringify({title, content}),
        headers: {'content-type': 'application/json'}
    })

    if(response.ok){
        //replaces one resource w/ current provided
        document.location.replace('/dashboard');
    } else {
        alert("*a song on the world's smallest violin* post did not update")
    }
}

deleteBtn.addEventListener("click", removePost)
updateForm.addEventListener("submit", updatePost)