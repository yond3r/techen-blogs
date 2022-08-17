const newCommentPosting = async (event) => {
    event.preventDefault();
}

const commentTextEl = document.querySelector("#commentText");
const content = commentTextEl.value.trim()
const post_id = window.location.pathname.replace('/single/', "");

if(!content) {
    alert("Hey, there needs to be text for your comment, friend.")
} else {
    const response = await fetch('/commentRoutes', {
        method: 'POST',
        body: JSON.stringify({content, post_id}),
        headers: {"contentType": "application/json"}
    })

    if(response.ok){
        location.reload()
    } else {
        alert("Try again. We made an oopsie and the comment won't create.")
    }
}

const form = document.querySelector("#commentForm");

form.addEventListener("submit", newCommentPosting)