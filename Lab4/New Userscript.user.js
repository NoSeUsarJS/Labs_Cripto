// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instructure.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let texto = "";

    function countCipheredMessages() {
        // Obtén todos los elementos div en el documento
        const divElements = document.querySelectorAll("div");

        console.log("Los mensajes cifrados son: "+divElements.length);
    }

    //3DES con ECB
    function decipherMessage(des3Key) {
        const divElements = document.querySelectorAll("div");
        divElements.forEach((div) => {
            const id = div.id.toString();
            const descifrado = CryptoJS.TripleDES.decrypt(id, des3Key, { mode: CryptoJS.mode.ECB });
            const id_decrypt = descifrado.toString(CryptoJS.enc.Utf8);
            console.log(id+' '+id_decrypt);
            texto = texto + id_decrypt+"<br>";
        });

    }

    function concatFirstLetters(text) {
        text = text.replace(/\s/g, "");
        const sentences = text.split('.'); // Dividir el texto en oraciones
        let result = '';

        for (const sentence of sentences) {
            if (sentence.length > 0) {
                // Verificar si la oración no está vacía
                result += sentence.charAt(0); // Tomar la primera letra de la oración
            }
        }

        return result;
    }

    const inputText = document.querySelector('body > p:nth-child(1)');
    const concatenatedLetters = concatFirstLetters(inputText.textContent);
    console.log("La llave es: "+concatenatedLetters);
    countCipheredMessages();
    const des3Key = CryptoJS.enc.Utf8.parse(concatenatedLetters);
    decipherMessage(des3Key);
    inputText.insertAdjacentHTML("beforeend", "<br><br>"+texto);


})();