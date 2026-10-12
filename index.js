const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeToggleCheckbox = document.getElementById("themeToggleCheckbox");
const themeStylesheet = document.getElementById("themeStylesheet");

let jsEnabled = true;

const btnHtml = document.getElementById("btnHtml");
const btnCss = document.getElementById("btnCss");
const btnJs = document.getElementById("btnJs");
const styleTag = document.querySelector("style");

function setActiveBtn(activeBtn) {
    [btnHtml, btnCss, btnJs].forEach(btn => {
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.style.boxShadow = "";
    });
    activeBtn.style.backgroundColor = "#fbff00";
    activeBtn.style.color = "#000";
    activeBtn.style.boxShadow = "0 0 10px #fff700";
}

setActiveBtn(btnJs);

btnHtml.addEventListener("click", () => {
    themeStylesheet.disabled = true;
    if (styleTag) styleTag.disabled = true; 
    jsEnabled = false;
    setActiveBtn(btnHtml);
});

btnCss.addEventListener("click", () => {
    themeStylesheet.disabled = false;
    if (styleTag) styleTag.disabled = false;
    jsEnabled = false;
    setActiveBtn(btnCss);
});

btnJs.addEventListener("click", () => {
    themeStylesheet.disabled = false;
    if (styleTag) styleTag.disabled = false;
    jsEnabled = true;
    setActiveBtn(btnJs);
});

// Set initial checkbox state based on current stylesheet
if (themeStylesheet.getAttribute("href") === "index2.css") {
    themeToggleCheckbox.checked = true;
}

addBtn.addEventListener("click", function () {
    if (!jsEnabled) return;

    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    // Create a new list item
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>

        <div>
            <button class="done">✓</button>
            <button class="delete">🗑</button>
        </div>
    `;

    // Add task to the page
    taskList.appendChild(li);

    // Clear input
    input.value = "";
});


taskList.addEventListener("click", function (event) {
    if (!jsEnabled) return;

    // Delete task
    if (event.target.classList.contains("delete")) {

        event.target.closest("li").remove();
    }

    // Complete task
    if (event.target.classList.contains("done")) {

        const task = event.target.closest("li");

        task.style.textDecoration = "line-through";
        task.style.opacity = "0.5";
    }

});

themeToggleCheckbox.addEventListener("change", (e) => {
    if (!jsEnabled) {
        e.preventDefault();
        return;
    }
    if (e.target.checked) {
        themeStylesheet.setAttribute("href", "index2.css");
    } else {
        themeStylesheet.setAttribute("href", "index.css");
    }
});
