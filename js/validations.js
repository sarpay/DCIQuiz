function checkFullNameValidation(name) {

    var isAlpha = /^[a-zA-ZĞÜŞİÖÇüğşöçı ]+$/.test(name);/*allows for whitespace*/
    if (isAlpha) {
        var names = name.split(' ');
        if (names.length > 1) {
            for (var i = 0; i < names.length; i++) {
                if (names[i].length < 2) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;

}


function checkEmailValidation(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}


function checkNumericValidation(d) {

    //var isNumeric = /^[0-9]+$/.test(d);
    var isNumeric = /^\d{10}$/.test(d);
    return isNumeric;

}


function validateInput(inputType, inputVal) {
    var valid = true;
    switch (inputType) {
        case 'user':
            if (inputVal !== 'dc1') { valid = false; }
            break;
        case 'pwd':
            if (inputVal !== 'meta1') { valid = false; }
            break;
        case 'name':
            //if (inputVal.length <= 5 || !checkFullNameValidation(inputVal)) { valid = false; }
            if (inputVal.length < 1) { valid = false; }
            break;
        case 'email':
            if (!checkEmailValidation(inputVal)) { valid = false; }
            break;
        case 'company':
            if (inputVal.length < 3) { valid = false; }
            break;
        case 'phone':
            if (inputVal.length >= 1 && !checkNumericValidation(inputVal)) { valid = false; }
            break;
        case 'address':
            if (inputVal.length <= 10) { valid = false; }
            break;
    }
    return valid;
}