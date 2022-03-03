
let inputImage = document.getElementById('inputImage');
let uploadBtn = document.getElementById('uploadBtn');
let gallery = document.getElementById('picture');
var fileData;
var Pictures = [];

var db = firebase.firestore();

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

        loadSingleImage(URL);

        //database object ki soorat mn input leta hai is lia hmne direct array nh dia balkay usse object k andr dall k dedia
        await UpdateDocument({ images: Pictures })

    } catch (error) {
        console.log(error);
        document.getElementById('loaderForUpload').style.display = "none";
    }
}

// UI WORK
var updateGallery = () => {

    gallery.innerHTML = '';

    for (i = 0; i < Pictures.length; i++) {
        var string = `<a href="${Pictures[i]}" class="image">
                        <img src="${Pictures[i]}" alt="">
                    </a>`;


        gallery.innerHTML += string;
    }
}

var loadSingleImage = (URL) => {
    document.querySelector('.gallery');
    let aTag = document.createElement('a');
    element.classList.add('image');
    let imgTag = document.createElement('img');
    aTag.appendChildNode(imgTag);

    gallery.innerHTML = `<a href="${URL}" class="image">
                            <img src="${URL}" alt="">
                        </a>`
}


var UpdateDocument = async (data) => {
    try {
        var document = await db.collection("Images").doc("Pictures").set(data, { merge: true });
        // console.log(document);
        // return document;
    } catch (error) {
        console.error(error)
    }
}

var ReadDocumentByID = async () => {
    try {
        var document = await db.collection("Images").doc("Pictures").get();
        return document.data()
    } catch (error) {
        console.error(error)
    }
}

async function Start() {
    var data = await ReadDocumentByID()
    Pictures = data.images;
    updateGallery();
    console.log(data);
}

Start()