const RegExRegister = [
    /^[A-Za-z' ']{1,30}$/,
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    /^[A-Za-z0-9]{1,30}$/,
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
];


function mainRegister() {
    console.log("Register");
}

