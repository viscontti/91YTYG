// ============================================================
// PART 1: mouseover / mouseout with event.target,
// event.relatedTarget, style changes
// ============================================================

function initHoverCards() {
    var container = document.getElementById("hover-demo-container");
    if (!container) return;

    // ONE handler for mouseover and mouseout on the container
    // Uses event.target and event.relatedTarget
    container.addEventListener("mouseover", function(event) {
        var card = event.target.closest(".hover-card");
        if (!card) return;

        // event.target — element cursor moved TO
        // event.relatedTarget — element cursor came FROM
        var fromEl = event.relatedTarget
            ? (event.relatedTarget.className || event.relatedTarget.tagName)
            : "outside window";

        // Style changes on mouseover:
        // 1. background color from data-color attribute
        card.style.backgroundColor = card.dataset.color;
        // 2. smooth text scale up
        card.style.transform = "scale(1.06)";
        card.style.transition = "all 0.25s ease";
        card.style.boxShadow = "0 4px 18px rgba(26,138,138,0.25)";
        card.style.zIndex = "10";
        // 3. show the hover label
        var label = card.querySelector(".hover-label");
        if (label) {
            label.style.opacity = "1";
            label.style.transform = "translateY(0)";
        }

        // Log the event with target and relatedTarget
        logMouseEvent(
            "mouseover",
            event.target.className || event.target.tagName,
            fromEl
        );
    });

    container.addEventListener("mouseout", function(event) {
        var card = event.target.closest(".hover-card");
        if (!card) return;

        var toEl = event.relatedTarget
            ? (event.relatedTarget.className || event.relatedTarget.tagName)
            : "outside window";

        // Restore styles on mouseout
        card.style.backgroundColor = "";
        card.style.transform = "";
        card.style.boxShadow = "";
        card.style.zIndex = "";
        var label = card.querySelector(".hover-label");
        if (label) {
            label.style.opacity = "0";
            label.style.transform = "translateY(8px)";
        }

        logMouseEvent(
            "mouseout",
            event.target.className || event.target.tagName,
            toEl
        );
    });
}

function logMouseEvent(type, target, related) {
    var log = document.getElementById("mouse-log");
    if (!log) return;
    var arrow = type === "mouseover" ? "→" : "←";
    log.value += type + ": target=" + target +
                 "  " + arrow + "  relatedTarget=" + related + "\n";
    log.scrollTop = log.scrollHeight;
}

function clearLog() {
    var log = document.getElementById("mouse-log");
    if (log) log.value = "";
}

// ============================================================
// PART 2: Drag and Drop using mousedown, mousemove, mouseup
// Drag Iron sticker images into rarity zones
// Uses: pageX/pageY, getBoundingClientRect, elementFromPoint,
//       shiftX/shiftY offset, currentDroppable, ondragstart
// ============================================================

var currentDroppable = null;

function initDragAndDrop() {
    var irons = document.querySelectorAll(".drag-iron");
    irons.forEach(function(iron) {
        makeDraggable(iron);
        // disable browser's default drag
        iron.ondragstart = function() { return false; };
    });
}

function makeDraggable(elem) {
    elem.onmousedown = function(event) {
        // only left mouse button
        if (event.button !== 0) return;

        // remember offset from cursor to top-left corner of element
        // so it doesn't jump when we start dragging
        var rect = elem.getBoundingClientRect();
        var shiftX = event.clientX - rect.left;
        var shiftY = event.clientY - rect.top;

        // prepare element for absolute positioning
        elem.style.position = "absolute";
        elem.style.zIndex = 1000;
        elem.style.cursor = "grabbing";
        elem.style.transform = "scale(1.1)";
        elem.style.transition = "transform 0.1s";
        elem.style.opacity = "0.85";
        // move to body so it's not clipped by parent
        document.body.append(elem);

        // initial position
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            elem.style.left = pageX - shiftX + "px";
            elem.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            // find droppable zone below the dragged element
            // must hide elem first so elementFromPoint
            // doesn't return elem itself
            elem.hidden = true;
            var elemBelow = document.elementFromPoint(
                event.clientX, event.clientY
            );
            elem.hidden = false;

            if (!elemBelow) return;

            var droppableBelow = elemBelow.closest(".droppable");

            // if we moved to a different droppable zone
            if (currentDroppable !== droppableBelow) {
                // leave old zone
                if (currentDroppable) {
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                // enter new zone
                if (currentDroppable) {
                    enterDroppable(currentDroppable);
                }
            }
        }

        // listen on document — not on elem
        // because mouse can move faster than the element
        document.addEventListener("mousemove", onMouseMove);

        elem.onmouseup = function() {
            document.removeEventListener("mousemove", onMouseMove);
            elem.onmouseup = null;
            elem.style.cursor = "grab";
            elem.style.transform = "";
            elem.style.opacity = "1";

            // check if dropped on a valid zone
            if (currentDroppable) {
                handleDrop(elem, currentDroppable);
                leaveDroppable(currentDroppable);
                currentDroppable = null;
            } else {
                // not dropped on zone — animate back is complex,
                // just reset position to static in source
                var source = document.getElementById("sticker-source");
                if (source) {
                    elem.style.position = "";
                    elem.style.left = "";
                    elem.style.top = "";
                    elem.style.zIndex = "";
                    source.append(elem);
                }
            }
        };
    };
}

function enterDroppable(zone) {
    // highlight zone when iron is dragged over it
    zone.style.borderColor = "#1a8a8a";
    zone.style.borderWidth = "3px";
    zone.style.background = "rgba(92,200,200,0.2)";
    zone.style.transform = "scale(1.03)";
    zone.style.transition = "all 0.2s";
}

function leaveDroppable(zone) {
    // remove highlight when iron leaves zone
    zone.style.borderColor = "";
    zone.style.borderWidth = "";
    zone.style.background = "";
    zone.style.transform = "";
}

function handleDrop(elem, zone) {
    var ironRarity = elem.dataset.rarity;
    var zoneName = zone.dataset.zone;
    var result = document.getElementById("drop-result");

    // place the image inside the zone
    elem.style.position = "relative";
    elem.style.left = "";
    elem.style.top = "";
    elem.style.zIndex = "";
    elem.style.width = "80px";
    elem.style.height = "80px";
    zone.appendChild(elem);

    if (!result) return;

    if (ironRarity === zoneName) {
        // correct drop
        result.textContent = "✅ " + elem.alt +
            " correctly placed in " + zoneName + " zone!";
        result.style.background = "#d4f5e9";
        result.style.borderColor = "#1a8a8a";
        result.style.color = "#0d6b6b";
        zone.style.background = "#d4f5e9";
    } else {
        // wrong zone
        result.textContent = "❌ " + elem.alt +
            " belongs in the " + ironRarity +
            " zone, not " + zoneName + "!";
        result.style.background = "#f6d0d8";
        result.style.borderColor = "#be7562";
        result.style.color = "#6b1430";
    }
    result.style.display = "block";
    result.style.padding = "10px 14px";
    result.style.borderRadius = "6px";
    result.style.border = "2px solid";
    result.style.margin = "10px 0";
}

document.addEventListener("DOMContentLoaded", function() {
    initHoverCards();
    initDragAndDrop();
});
