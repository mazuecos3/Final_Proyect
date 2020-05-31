export { getCookieValue };



//FUNCTION THATS REPEATS IN SOME JS, SO PREFER STAY HERE THAN REPEAT THE SAME CODE
function getCookieValue(cookieName) {

    // SPLIT AND SUBSTRING TO TAKE ONLY THE TEXT THAT WE WANT BECAUSE ALL IS A STRING
    let splitCookie = document.cookie.split(cookieName + "=")[1];
    let cookie;
    // console.log("SPLITTTTTT", splitCookie);


    //if doesn't exist ";" is because we only have the userToken cookie, so take all the lenght of the value, but 
    // if we have more than 1 cookie they are going to concatenate the strings separating by ";" so if we have more than 1 cookie
    // we are going to take the lenght until ";" not all the cookie lenght.
    if (splitCookie.indexOf(';') !== -1) {
        //  console.log("if");
        cookie = splitCookie.substring(splitCookie, splitCookie.indexOf(';'));
    } else {
        // console.log("else");
        cookie = splitCookie.substring(splitCookie, splitCookie.length);
    }
    // console.log("RETURN", cookie)
    return cookie;


}