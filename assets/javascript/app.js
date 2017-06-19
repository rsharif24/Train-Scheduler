$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyBn0GKgliQXh158x4AwR9okB-lbTeqP5lY",
        authDomain: "train-schedular-dfb49.firebaseapp.com",
        databaseURL: "https://train-schedular-dfb49.firebaseio.com",
        projectId: "train-schedular-dfb49",
        storageBucket: "",
        messagingSenderId: "463179035205"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";
    var tFrequency = "";
    var firstTrainTime = "";
    var firstTimeConverted = "";
    var currentTime = "";
    var timeDiff = "";
    var remainder = "";
    var minutesUntilTrain = "";
    var nextTrain = "";


    $("#submit").on('click', function() {
        event.preventDefault();

        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();

        var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var timeDiff = currentTime.diff(moment(firstTimeConverted), "minutes");
        var remainder = timeDiff % frequency;
        var minutesUntilTrain = frequency - remainder;
        var nextTrain = currentTime.add(minutesUntilTrain, "minutes");
        var arrivalTime = moment(nextTrain).format("hh:mm");

        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            arrivalTime: arrivalTime,
            minutesUntilTrain: minutesUntilTrain
        });

        $("#name").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

    });


    database.ref().on('child_added', function(snapshot) {

        $("#table").append(
            "<tr><td>" + snapshot.val().name +
            "</td><td>" + snapshot.val().destination +
            "</td><td>" + snapshot.val().frequency +
            "</td><td>" + snapshot.val().arrivalTime +
            "</td><td>" + snapshot.val().minutesUntilTrain +
            "</td></tr>");

    });

});
