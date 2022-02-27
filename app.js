
let inputImage = document.getElementById('inputImage');
let uploadBtn = document.getElementById('uploadBtn');
let gallery = document.getElementById('picture');
var fileData;
var Pictures = [];

$(".gallery").magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
        enable: true
    }
})

//Choose A file Button Feild Work
let fileName = document.getElementById('file-name');
inputImage.addEventListener('change', (event) => {
    let uploadedFileName = event.target.files[0].name;
    fileName.textContent = uploadedFileName;
});

//Upload to firebase Cloud Working
var storageRef = firebase.storage().ref("/Images/my-picture.png");

inputImage.addEventListener('change', (e) => {
    fileData = e.target.files[0];
    console.log(fileData);
});

uploadBtn.addEventListener('click', (e) => {
    uploadImage();
})

var uploadImage = async () => {
    try {

        document.getElementById('loaderForUpload').style.display = "block";

        let storageRef = firebase.storage().ref("/Images/" + parseInt(Math.random() * 10000000000000));
        var data = await storageRef.put(fileData);
        var URL = await data.ref.getDownloadURL();
        console.log(URL);

        Pictures.push(URL);

        document.getElementById('loaderForUpload').style.display = "none";

        updateGallery();

    } catch (error) {
        console.log(error);
        document.getElementById('loaderForUpload').style.display = "none";
    }
}


var updateGallery = () => {

    gallery.innerHTML = '';

    for (i = 0; i < Pictures.length; i++) {
        var string =`<a href="${Pictures[i]}" class="image">
                        <img src="${Pictures[i]}" alt="">
                    </a>`;

        
        gallery.innerHTML += string;
    }
}