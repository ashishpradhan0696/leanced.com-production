
//var userFlag, emailFlag, passwordFlag, matchpasswordFlag = false;


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


export const passwordValidator = (password) => {
    let regex = /^(?=.{8,20}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    let passwordFlag = false;

    if (regex.test(password)) {
        document.getElementById("passwordvalidationError").style.display = "none";
        passwordFlag = true;
    }
    else {
        document.getElementById("passwordvalidationError").style.display = "block";
        passwordFlag = false;
    }

    return passwordFlag
}


export const confirmPasswordValidator = (confirmpassword, password) => {
    let matchpasswordFlag = false;

    if (confirmpassword === password) {
        document.getElementById("confirmpasswordvalidationError").style.display = "none";
        matchpasswordFlag = true;
    }
    else {
        document.getElementById("confirmpasswordvalidationError").style.display = "block";
        matchpasswordFlag = false;
    }

    return matchpasswordFlag
}

