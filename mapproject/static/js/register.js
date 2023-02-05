const username = document.querySelector('#name');
const feedBackField = document.querySelector('.invalid_feedback');
const emailField = document.querySelector('#remail');
const emailfeedBackField = document.querySelector(".emailfeedBackField");
const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput")
const emailSuccessOutput = document.querySelector(".emailSuccessOutput")

emailField.addEventListener("keyup", (e) => {
    const emailVal = e.target.value;
    emailSuccessOutput.style.display = "block";
    emailSuccessOutput.textContent=`Checking ${emailVal}`;

    emailField.classList.remove("is-invalid");
    emailfeedBackField.style.display= "none";

    if(emailVal.length > 0){
    fetch("/authentication/validate-email",{
        body: JSON.stringify({ email: emailVal}),
        method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("data", data);
        emailSuccessOutput.style.display = "none";
        if (data.email_error) {
            emailField.classList.add("is-invalid");
            emailfeedBackField.style.display= "block";
            emailfeedBackField.innerHTML = `<p>${data.email_error}</p>`;
        }
    });
}

});

username.addEventListener("keyup", (e) => {
    const usernameVal = e.target.value;
    usernameSuccessOutput.style.display = "block";
    usernameSuccessOutput.textContent=`Checking ${usernameVal}`;

    username.classList.remove("is-invalid");
    feedBackField.style.display= "none";

    if(usernameVal.length > 0){
    fetch("/authentication/validate-username",{
        body: JSON.stringify({ username: usernameVal}),
        method: "POST",
})
    .then((res) => res.json())
    .then((data) => {
        console.log("data", data);
        usernameSuccessOutput.style.display = "none";
        if (data.username_error) {
            username.classList.add("is-invalid");
            feedBackField.style.display= "block";
            feedBackField.innerHTML = `<p>${data.username_error}</p>`;
        }
    });
}

});