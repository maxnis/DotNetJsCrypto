
function showKey(key) {
    $("#serverKey").text(key);
}

function generateKeys(passphrase) {
    // The passphrase used to repeatably generate this RSA key.
    // The length of the RSA key, in bits.
    var Bits = 1024; 
    var RSAkey = cryptico.generateRSAKey(passphrase, Bits);
    //var publicKeyString = cryptico.publicKeyString(RSAkey);

    return RSAkey;
}

function encrypt(key, value) {
    return cryptico.encrypt(value, key).cipher;
}

function decrypt(key, value) {
    return cryptico.decrypt(value, key).plaintext;
}