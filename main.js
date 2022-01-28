Webcam.set({
    width : 350,
    height : 300,
    img_format : 'png',
    jpeg_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera')

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("image").innerHTML = '<img id = "capture_image"src = "'+data_uri+'">';
    });
}

console.log('ml5 version: ' , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/K0by_OS6L/model.json',modeLoaded);

function modeLoaded(){
    console.log("model is loaded");
}

function recognizeObject(){
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_objectName").innerHTML = result[0].label;
        document.getElementById("result_objectAccuracy").innerHTML = result[0].confidence.toFixed(3);
    }
}