// 1. DIALOG WITH USER — uses alert, prompt, confirm, variables,
//    if/else, for loop
function dialogWithUser() {
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
    var firstName = "Veronika"
    var lastName = "Ostapchenko"
    if (role === undefined) {
        role = "Front-end Developer";
    }

    alert(
        "Page Developer Info:\n" +
        "Name: " + firstName + " " + lastName + "\n" +
        "Role: " + role + "\n" +
        "Site: 91YTYG Meme Community"
    );
}

// 3. STRING COMPARISON — compare two strings, show bigger one
function compareStrings() {
    var str1 = prompt("Enter first string:", "Iron");
    var str2 = prompt("Enter second string:", "Sticker");
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
    var confirmed = confirm("Change page background to mint green for 30 seconds?");
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
        title.style.color = "#36d5c0";
        title.style.transform = "";
    } else {
        title.style.color = "#36d5c0";
        title.style.transform = "scale(1.03)";
    }
}

// 7. querySelectorAll — highlight all sticker cards
function highlightAllCards() {
    var cards = document.querySelectorAll(".sticker-card");
    cards.forEach(function (card, index) {
        setTimeout(function () {
            card.style.borderColor = "#1a8a8a";
            card.style.borderWidth = "7 px";
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

    // innerHTML — inserts actual HTML tags
    demo.innerHTML =
        "<strong>innerHTML</strong>: This is <em>HTML</em> content. " +
        "<br><span style='color:#1a8a8a'>Tags are rendered.</span>";

    setTimeout(function () {
        // textContent — plain text only, no tags rendered
        demo.textContent = "textContent: <strong>tags</strong> shown as plain text.";

        setTimeout(function () {
            // nodeValue/data — modify the first text node directly
            if (demo.firstChild) {
                demo.firstChild.nodeValue = "nodeValue/data: text node was changed directly.";
            } else {
                demo.textContent = "nodeValue/data: text node was changed directly.";
            }

            setTimeout(function () {
                // outerHTML — replace whole demo element, then restore with new block
                demo.outerHTML =
                    "<div id='dom-demo' style='background:#e8fafa; border:1px solid #5cc8c8; " +
                    "padding:12px 16px; border-radius:6px; margin:10px 0; min-height:50px;'>" +
                    "<strong>outerHTML</strong>: The entire block was replaced and recreated." +
                    "</div>";

                setTimeout(function () {
                    var restored = document.getElementById("dom-demo");
                    if (restored) {
                        restored.textContent =
                            "Click buttons below to see JavaScript features in action.";
                    }
                }, 2500);
            }, 2500);
        }, 2500);
    }, 2500);
}

// 9. document.createElement + append/prepend/after/replaceWith + remove
function domManipulation() {
    var grid = document.querySelector(".variations-grid");
    if (!grid) {
        alert("Variations grid not found on this page.");
        return;
    }

    // createElement + append
    var newCard = document.createElement("div");
    newCard.id = "js-created-card";
    newCard.className = "sticker-card";
    newCard.style.border = "2px solid #ff6b6b";
    newCard.style.background = "#fff5f5";

    // createTextNode
    var textNode = document.createTextNode("Dynamically Added Sticker!");
    var heading = document.createElement("h3");
    heading.append("⚡ ");
    heading.appendChild(textNode);
    newCard.appendChild(heading);
    newCard.innerHTML +=
        "<p><i>This card was created by JavaScript using createElement, " +
        "createTextNode, and append.</i></p>";

    // prepend — at start
    grid.prepend(newCard);

    // after — add an info note right after the created card
    var note = document.createElement("p");
    note.style.margin = "8px 0";
    note.style.color = "#0d6d6d";
    note.textContent = "Inserted with after(): helper note under the new dynamic card.";
    newCard.after(note);

    // replace and remove sequence
    setTimeout(function () {
        var replacement = document.createElement("div");
        replacement.className = "sticker-card";
        replacement.style.border = "2px solid #5cc8c8";
        replacement.innerHTML =
            "<h3>🔄 Replaced Card</h3>" +
            "<p><i>This replaced the previous dynamic card using replaceWith().</i></p>";
        newCard.replaceWith(replacement);

        setTimeout(function () {
            replacement.remove();
            note.remove();
        }, 3000);
    }, 4000);

    alert("Dynamic card added to top of variations! It will be replaced in 4s, then removed in 3s more.");
}
