export const emailValidator = (useremail) => {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let emailFlag = false;
    console.log(useremail)
    if (regex.test(useremail)) {
        document.getElementById("emailvalidationError").style.display = "none";
        emailFlag = true;
    }
    else {
        document.getElementById("emailvalidationError").style.display = "block";
        emailFlag = false;
    }

    return emailFlag
}