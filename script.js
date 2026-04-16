// 1. DIALOG WITH USER — uses alert, prompt, confirm, variables,
//    if/else, for loop
function dialogWithUser() {
    alert("Let's get acquainted!")
    var name = prompt("What's your name, Iron fan?", "");
    if (!name || name.trim() === "") {
        alert("No name entered. Welcome, anonymous fan!");
        return;
    }

    var count = parseInt(prompt("How many stickers do you have? (0-21)", "0"), 10);
    var message = "";

    if (isNaN(count)) {
        message = "That's not a number!";
    } else if (count === 0) {
        message = name + ", you have no stickers yet. Start collecting!";
    } else if (count < 7) {
        message = name + " has " + count + " stickers. Common tier.";
    } else if (count < 15) {
        message = name + " has " + count + " stickers. Uncommon tier!";
    } else if (count < 21) {
        message = name + " has " + count + " stickers. Rare collector!";
    } else {
        message = name + " has ALL 21 stickers! Legendary status!";
    }

    // loop — show sticker numbers owned
    var list = "";
    for (var i = 1; i <= count && i <= 21; i++) {
        list += "Sticker #" + i + "\n";
    }

    alert(message + (list ? "\n\nYour stickers:\n" + list : ""));
}

// 2. DEVELOPER INFO FUNCTION — with parameters, default value
function showDeveloper(lastName, firstName, role) {
   
    alert(
        "Page Developer Info:\n" +
        "Name: " + firstName + " " + lastName + "\n" +
        "Role: " + role + "\n" +
        "Site: 91YTYG Meme Community"
    );
}

// 3. STRING COMPARISON — compare two strings, show bigger one
function compareStrings() {
    alert("Write two sentences for comparing")
    var str1 = prompt("Enter first string:", "");
    var str2 = prompt("Enter second string:", "");
    if (str1 === null || str2 === null) {
        return;
    }

    if (str1 > str2) {
        alert('Bigger string: "' + str1 + '"');
    } else if (str2 > str1) {
        alert('Bigger string: "' + str2 + '"');
    } else {
        alert("Strings are equal!");
    }
}

// 4. CHANGE BACKGROUND FOR 30 SECONDS using document object
function changeBackground() {
    var confirmed = confirm("Change page background to lavander for 30 seconds?");
    if (!confirmed) {
        return;
    }

    var originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#e4e9ff";

    // Show countdown using DOM
    var counter = document.getElementById("bg-counter");
    if (!counter) {
        alert("Counter element not found on this page.");
        return;
    }

    var seconds = 30;
    counter.textContent = "Background resets in: " + seconds + "s";
    counter.style.display = "block";

    var interval = setInterval(function () {
        seconds -= 1;
        counter.textContent = "Background resets in: " + seconds + "s";
        if (seconds <= 0) {
            clearInterval(interval);
            document.body.style.backgroundColor = originalBg;
            counter.style.display = "none";
        }
    }, 1000);
}

// 5. REDIRECT using location object
function goToTravels() {
    var confirmed = confirm("Go to Iron Around the World page?");
    if (confirmed) {
        location.href = "travels.html";
    }
}

// 6. getElementById — change title color on click
function highlightTitle() {
    var title = document.getElementById("main-title");
    if (!title) {
        alert("Title with id 'main-title' not found.");
        return;
    }

    if (title.style.color === "rgb(255, 107, 107)") {
   
    } else {
        title.style.color = "#02574c";
        title.style.transform = "scale(1.03)";
    }
}

// 7. querySelectorAll — highlight all sticker cards
function highlightAllCards() {
    var cards = document.querySelectorAll(".sticker-card");
    cards.forEach(function (card, index) {
        setTimeout(function () {
            card.style.borderColor = "#1a8a8a";
            card.style.borderWidth = "7px";
            card.style.boxShadow = "0 0 8px rgba(26,138,138,0.4)";
        }, index * 80);
    });
    alert("Found " + cards.length + " sticker cards! All highlighted.");
}

// 8. innerHTML, textContent, outerHTML, nodeValue/data demo
function domPropertiesDemo() {
    var demo = document.getElementById("dom-demo");
    if (!demo) {
        alert("DOM demo block not found.");
        return;
    }

    demo.innerHTML = "<b>Iron</b> became the <span style='color:#1a8a8a;'>main mascot in 2020</span>.";

    setTimeout(function () {
        demo.textContent = "We will have a new special collection for you very soon!";

        setTimeout(function () {
            if (demo.firstChild) {
                demo.firstChild.nodeValue = "The Iron has visited a new European country! You can press the 'Go to Travels' button";
                demo.style.color = "#057146";
            }

            setTimeout(function () {
                demo.outerHTML =
                    "<div id='dom-demo' style='background:#e8fafa; border:1px solid #5cc8c8; padding:12px 16px; border-radius:6px; margin:10px 0; min-height:50px;'>" +
                    "<b>91Ytyg</b>: was created a long time ago by students of the IK-91 group" +
                    "</div>";
            }, 2000);
        }, 2000);
    }, 2000);
}
// 9. document.createElement + append/prepend/after/replaceWith + remove
function domManipulation() {
    var grid = document.querySelector(".variations-grid");
    if (!grid) {
        alert("Variations grid not found on this page.");
        return;
    }

    var newCard = document.createElement("div");
    newCard.id = "js-created-card";
    newCard.className = "sticker-card";
    newCard.style.border = "2px solid #ff6b6b";
    newCard.style.background = "#fff5f5";

    var heading = document.createElement("h3");
    heading.textContent = "⚡ Special Sticker!";
    newCard.appendChild(heading);

    var image = document.createElement("img");
    image.src = "mascots/20_special.png";
    image.alt = "Special Iron";
    image.width = 170;
    image.height = 200;
    newCard.appendChild(image);

    var text = document.createElement("p");
    text.appendChild(document.createTextNode("This card was created by our special creator."));
    newCard.appendChild(text);

    grid.prepend(newCard);

    var note = document.createElement("p");
    note.style.margin = "8px 0";
    note.style.color = "#0d6d6d";
    note.textContent = "Special Iron appeared for a moment...";
    newCard.after(note);

    setTimeout(function () {
        var replacementCard = document.createElement("div");
        replacementCard.className = "sticker-card";
        replacementCard.style.border = "2px solid #5cc8c8";
        replacementCard.style.background = "#f0fafa";

        var replacementHeading = document.createElement("h3");
        replacementHeading.textContent = "Oops";
        replacementCard.appendChild(replacementHeading);

        var replacementImage = document.createElement("img");
        replacementImage.src = "mascots/1_orignial.png";
        replacementImage.alt = "Original Iron";
        replacementImage.width = 200;
        replacementImage.height = 200;
        replacementCard.appendChild(replacementImage);

        var replacementText = document.createElement("p");
        replacementText.textContent = "You did not manage to see the special sticker.";
        replacementCard.appendChild(replacementText);

        newCard.replaceWith(replacementCard);

        setTimeout(function () {
            replacementCard.remove();
            note.remove();
        }, 6000);
    }, 4000);

    alert("Special sticker was added temporarily.");
}