
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(camera);
function takesnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img src="+data_uri+" id='captured_img'>";
})

}
console.log("ml5 version: ",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2-mbULgGP/model.json",modelloaded);

function modelloaded(){
    console.log("model loaded");

}
var prediction1="";
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first prediction is "+prediction1;
    var utterThis=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}
function check(){
    image=document.getElementById("captured_img");
    classifier.classify(image,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emotionname").innerHTML=results[0].label;
        

        prediction1=results[0].label;
      

        speak();
        if(results[0].label=="victory"){
            document.getElementById("emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="amazing"){
            document.getElementById("emoji").innerHTML="&#9996;";
        }
        if(results[0].label=="best"){
            document.getElementById("emoji").innerHTML="&#128077;";
        }
    }
}