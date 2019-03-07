let questions = [
    "You have a hard time introducing yourself in new places.",
    "You keep you home and work environments clean and organized.",
    "You enjoy being the center of attention",
    "You find yourself day dreaming quite often.",
    "You are a person that is lively and full of energy",
    "You frequently misplace your things.",
    "You try to impress everyone around you",
    "You avoid confrontation as much as you can",
    "You feel pressure under strict deadlines.",
    "You often take initiative in social situations."
];

// setting global variables
let questIndex = 0,
    answers = [],
    person = {};

const showQuestion = (index) => {
    // render the questions one by one from the quesrtions array
    if (answers.length < questions.length) {
        $(".questions").fadeIn("fast");
        $(".question").html(questions[index]); // display current question
        $(".answer button").removeAttr("disabled");
    }
    else {
        person.scores = answers;
        // console.log(person);

        // handle api call here for comparison
        $.post("/api/friends", person).done(function(data) {
            console.log("response:" + JSON.stringify(data));
            let {name, photo} = data;
                photo = photo.includes("http") ? photo : "https://via.placeholder.com/300";

            // call modal box and show best match
            let friendHTML = `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-7"><img class="img-fluid img-thumbnail mt-2 mb-2" src="${photo}"></div>
                        <div class="col-md-5">
                            <p class="mt-2">Name:</p>
                            <h4>${name}</h4>
                        </div>
                    </div>
                </div>`;
            $('#friend-match .modal-body').html(friendHTML);

            $('#friend-match').modal('show');

            // clear person data and reinitialize the survey
            questIndex = 0;
            answers = [];
            person = {};
            console.log("Reinitialized survey...")
            $("#name").val(""),
            $("#photo").val("");
            $(".personal-info").fadeIn("fast");
        });
    }
};

$(".personal-info").on("click", ".take-survey", function(e) {
    e.preventDefault();
    let name = $("#name").val(),
        photo = $("#photo").val();

    if (name != "" && photo != "") {
        $(".personal-info").fadeOut("fast", function() {
            showQuestion(questIndex);
        });

        // setting the person's info
        person.name = name;
        person.photo = photo;
        // console.log(person)

        $("#name").removeClass("is-invalid").attr("placeholder", "");
        $("#photo").removeClass("is-invalid").attr("placeholder", "");
        $(".personal-info .error-msg").remove();
    }
    else {
        $("#name").addClass("is-invalid").attr("placeholder", "Please enter name");
        $("#photo").addClass("is-invalid").attr("placeholder", "Please enter url");
        $(".personal-info .take-survey").after("<p class='error-msg text-center text-danger mt-3 mb-0'>Please fill out the form</p>");
    }
});

$(".answer").on("click", "button", function(e) {
    e.preventDefault();
    $(this).attr("disabled", "disabled");
    let answer = $(this).text();
    if (questIndex < questions.length) {
        answers.push(answer);
        questIndex++;
        // console.log(answers);
        // console.log(questionIndex);
        $(".questions").fadeOut(400, function() {
            showQuestion(questIndex);
        });
    }
});