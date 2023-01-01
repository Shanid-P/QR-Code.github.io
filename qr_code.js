let generateBtn = document.querySelector(".generate");
let downloadBtn = document.querySelector(".download");
let input = document.querySelector(".input");
let outputPart = document.querySelector(".output");
let check = document.querySelector(".check");
let AO = document.querySelector(".advanced-options");
let size = document.querySelector(".size");
let format = document.querySelector(".format");
let SizeValue;
let formatValue;

size.addEventListener("change", ()=>{
    if (size.value > 300) {
        size.value = 300;
    }else if(size.value < 100){
        size.value = 100;
    }else{
        size.value = size.value;
    }
})

check.addEventListener("change", ()=>{
    if (check.checked) {
        AO.classList.add("active");
    }else {
        AO.classList.remove("active");
    }
})
generateBtn.addEventListener("click", ()=>{
    let inputValue  = input.value;
    const ifEmpty =  inputValue=> !inputValue.trim().length;

    if (ifEmpty(inputValue)) {
        alert("Enter URL or text to generate QR Code.")
        return;
    }
    if (check.checked) {
        formatValue = format.value;
        SizeValue = size.value;
        console.log(SizeValue)
        if (SizeValue > 300) {
            SizeValue = 300;
        }else if(ifEmpty(SizeValue)){
            SizeValue = 150;
        }else if(SizeValue < 100){
            SizeValue = 100;
        }else{
            SizeValue = size.value;
        }
    }else{
        SizeValue = 150;
        formatValue = "png";
    }
    console.log(formatValue)
    createOutput(inputValue, SizeValue, formatValue);
})
function createOutput(inputValue){
    console.log(SizeValue, formatValue)
    let QRImg = outputPart.querySelector("img");
    generateBtn.innerHTML = "Generating..."
    QRImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${SizeValue}x${SizeValue}&data=${inputValue}&format=${formatValue}`;
    // QRImg.src = ` http://localhost:5501/qrcodegen/api/qrcode/generate?data=${inputValue}&foreColor=&bgColor=&ecc=&size=150x150&format=`;

    QRImg.addEventListener("load", ()=>{
        outputPart.classList.add("active");
        generateBtn.innerHTML = `Generate QR Code <i class="fa-solid fa-rotate"></i>`
        input.value = "";
    })

    console.log(outputPart)
}
downloadBtn.addEventListener("click", function() {
    let url = outputPart.querySelector("img").src;
    fetch(url).then(response => response.blob()).then(file =>{
        let tempURL = URL.createObjectURL(file);
        console.log(file)
        let aTag = document.createElement("a");
        aTag.href = tempURL;
        aTag.download = "QR code";
        document.body.appendChild(aTag);

        aTag.click();
        aTag.remove();
    })
});




