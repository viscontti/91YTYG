// ============================================================
// PART 1: MOUSE EVENT — mouseover on sticker cards
// Three ways to assign handlers + addEventListener + object handler
// ============================================================

// --- 1a. Handler function for mouseover (used in multiple ways) ---
function onCardMouseover(event) {
    event.currentTarget.style.boxShadow = "0 0 16px rgba(26,138,138,0.7)";
    event.currentTarget.style.borderColor = "#1a8a8a";
    event.currentTarget.style.transform = "scale(1.02)";
    event.currentTarget.style.transition = "all 0.2s";
}

function onCardMouseout(event) {
    event.currentTarget.style.boxShadow = "";
    event.currentTarget.style.borderColor = "";
    event.currentTarget.style.transform = "";
}

// --- 1b. Assign via HTML attribute (done in HTML: onmouseover="onCardMouseover(event)") ---
// (first sticker card gets the attribute in HTML)

// --- 1c. Assign via DOM property (second sticker card) ---
function assignViaProperty() {
    var cards = document.querySelectorAll(".sticker-card");
    if (cards.length >= 2) {
        cards[1].onmouseover = onCardMouseover;
        cards[1].onmouseout = onCardMouseout;
    }
}

// --- 1d. addEventListener — assign TWO handlers to same click event ---
// on the third sticker card — both run on click
function handlerA(event) {
    event.currentTarget.style.background = "#d4f5e9";
}

function handlerB(event) {
    var name = event.currentTarget.querySelector("h3");
    if (name) {
        name.style.color = "#ff6b6b";
        setTimeout(function() {
            name.style.color = "";
            event.currentTarget.style.background = "";
        }, 1500);
    }
}

function assignViaAddEventListener() {
    var cards = document.querySelectorAll(".sticker-card");
    if (cards.length >= 3) {
        // Two handlers on same event — both run
        cards[2].addEventListener("click", handlerA);
        cards[2].addEventListener("click", handlerB);
    }
}

// --- 1e. Object as handler with handleEvent + event.currentTarget ---
var cardObjectHandler = {
    handleEvent: function(event) {
        // event.currentTarget — element where handler is attached
        var card = event.currentTarget;
        var info = document.getElementById("event-info");
        if (info) {
            info.textContent =
                "handleEvent fired! " +
                "Event: " + event.type + " | " +
                "currentTarget: " + card.tagName +
                " #" + (card.id || card.className.split(" ")[0]);
            info.style.display = "block";
        }
        card.style.outline = "3px solid #ff6b6b";
        setTimeout(function() {
            card.style.outline = "";
        }, 1000);
    }
};

function assignObjectHandler() {
    var cards = document.querySelectorAll(".sticker-card");
    if (cards.length >= 4) {
        cards[3].addEventListener("click", cardObjectHandler);
    }
}

// --- 1f. removeEventListener — remove object handler from card 4 ---
function removeObjectHandler() {
    var cards = document.querySelectorAll(".sticker-card");
    if (cards.length >= 4) {
        cards[3].removeEventListener("click", cardObjectHandler);
        var info = document.getElementById("event-info");
        if (info) {
            info.textContent =
                "removeEventListener called — object handler removed from card 4. " +
                "Clicking card 4 now does nothing.";
            info.style.display = "block";
        }
    }
}

// ============================================================
// PART 2a: LIST DELEGATION — highlight list item on click
// ONE handler on <ul>, not on each <li>
// Uses event.target
// ============================================================

function initListDelegation() {
    var list = document.getElementById("sticker-type-list");
    if (!list) return;

    var lastSelected = null;

    // onclick on the LIST — not on each li
    list.onclick = function(event) {
        // event.target — the actual clicked element
        if (event.target.tagName !== "LI") return;

        // remove highlight from previous
        if (lastSelected) {
            lastSelected.style.background = "";
            lastSelected.style.fontWeight = "";
            lastSelected.style.color = "";
        }

        // highlight the clicked li
        event.target.style.background = "#c8f0f0";
        event.target.style.fontWeight = "bold";
        event.target.style.color = "#1a8a8a";
        lastSelected = event.target;

        // show which item was clicked
        var info = document.getElementById("list-info");
        if (info) {
            info.textContent =
                "Clicked: " + event.target.textContent +
                " | event.target.tagName = " + event.target.tagName;
        }
    };
}

// ============================================================
// PART 2b: MENU WITH data-action + SINGLE HANDLER (delegation)
// One handler for entire menu, data-action on each button
// ============================================================

function initStickerMenu() {
    var menu = document.getElementById("sticker-action-menu");
    if (!menu) return;

    menu.addEventListener("click", function(event) {
        var action = event.target.dataset.action;
        if (!action) return;

        var output = document.getElementById("menu-output");

        if (action === "show-common") {
            output.innerHTML =
                "<b>Common stickers:</b> Original (25%), Original with Glasses (20%)";
            output.style.borderColor = "#5cc8c8";
        } else if (action === "show-rare") {
            output.innerHTML =
                "<b>Rare stickers:</b> Spider-Iron (3%), Barbie (3%)";
            output.style.borderColor = "#be7562";
        } else if (action === "show-legendary") {
            output.innerHTML =
                "<b>Legendary stickers:</b> Demon Main (1%), Demon V1 & V2 (0.5%)";
            output.style.borderColor = "#c49e44";
        } else if (action === "show-all") {
            output.innerHTML =
                "<b>All 21 Iron stickers</b> — from Original to Santa. " +
                "Check the gallery below!";
            output.style.borderColor = "#1a8a8a";
        }
        output.style.display = "block";
    });
}

// ============================================================
// PART 2c: BEHAVIOR PATTERN — data-* attributes
// document-level handler reads data-behavior attribute
// Works for ANY element with data-behavior anywhere on page
// ============================================================

function initBehaviorPattern() {
    document.addEventListener("click", function(event) {
        // behavior: "toggle-info" — show/hide an element by id
        var toggleId = event.target.dataset.toggleId;
        if (toggleId) {
            var elem = document.getElementById(toggleId);
            if (elem) {
                elem.hidden = !elem.hidden;
                event.target.textContent = elem.hidden
                    ? "Show Info ▼"
                    : "Hide Info ▲";
            }
        }

        // behavior: "highlight-self" — highlights clicked element
        var highlight = event.target.dataset.highlight;
        if (highlight) {
            event.target.style.background === highlight
                ? event.target.style.background = ""
                : event.target.style.background = highlight;
        }

        // behavior: "show-rarity" — shows sticker rarity info
        var rarity = event.target.dataset.showRarity;
        if (rarity) {
            var output = document.getElementById("behavior-output");
            if (output) {
                output.textContent = "Rarity info: " + rarity;
                output.style.display = "block";
                output.style.color = "#1a8a8a";
            }
        }
    });
}

// ============================================================
// INIT — run all setup functions when DOM is ready
// ============================================================

document.addEventListener("DOMContentLoaded", function() {
    assignViaProperty();
    assignViaAddEventListener();
    assignObjectHandler();
    initListDelegation();
    initStickerMenu();
    initBehaviorPattern();
});
