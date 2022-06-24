if (window.location.pathname.includes(".htm")) {
    window.location.href = "/#!" + window.location.pathname.replace(".htm", '');
}

document.addEventListener("DOMContentLoaded", function () {
    document.title = "ViiiLabs";
    document.querySelector("body > style")?.remove();
    document.body.innerHTML = document.querySelector("#content").innerHTML;
    document.body.style = "margin:0;";
    document.body.removeAttribute("id");

    window.checkerAddons = function () {
        document.body.querySelector("#title")?.remove();
        document.querySelector("#selfpromotionOverlay")?.remove();
        document.querySelector("#extraDiv1")?.remove();
        document.querySelector("#extraDiv2")?.remove();
        document.querySelector("#extraDiv3")?.remove();
        document.querySelector("#extraDiv4")?.remove();
        document.querySelector("#extraDiv5")?.remove();
        document.querySelector("#extraDiv6")?.remove();

        if (document.querySelector("#content > #container"))
            if (document.querySelector("#content > #container #content"))
                document.querySelector("#content > #container").innerHTML = document.querySelector("#content > #container #content").innerHTML;
    }

    window.checkerAddons();
    var checkAddons = setInterval(window.checkerAddons, 5000);
});

class Form {
    constructor(form, formId) {
        this.log = (type, text) => (console[type] ? console[type] : console["log"])(`[+] ${text}`);

        if (!form) return this.log("error", "Form tanımlanmamış!");
        if (!formId) return this.log("error", "Form ID tanımlanmamış!");

        this._formId = formId;
        this._form = form;
        this._callback = null;
        this._result = null;

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var data = new FormData(event.target);
            fetch(`https://formspree.io/f/${this._formId}`, {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                console.log(response);

                if (response.ok) {
                    callback(null, result);
                    this._result ? .innerHTML = "Form başarıyla gönderildi!";
                } else {
                    response.json().then(data => {
                        callback(data.errors, result);
                        if (Object.hasOwn(data, 'errors')) {
                            this._result ? .innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            this._result ? .innerHTML = "Oops! İşlem yapılırken bir sorun oluştu!";
                        }
                    })
                }
            }).catch(error => {
                this._result ? .innerHTML = "Oops! İşlem yapılırken bir sorun oluştu!";
            });
        })
    }

    setResultElement(elem) {
        if (!this._result)
            this._result = elem;
        else
            this.log("error", "Cevap elementi zaten oluşturulmuş!");
    }

    deleteResultElement() {
        if (this._result)
            this._result = null;
        else
            this.log("error", "Cevap elementi ayarlanmamış!");
    }

    callback(func) {
        if (typeof func == "function")
            this._callback = func;
        else
            this.log("error", "Geri dönüş bir fonksiyon olmalı!");
    }
}


let c = init("canvas"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);
//initiation

class firefly {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.s = Math.random() * 2;
        this.ang = Math.random() * 2 * Math.PI;
        this.v = this.s * this.s / 4;
    }
    move() {
        this.x += this.v * Math.cos(this.ang);
        this.y += this.v * Math.sin(this.ang);
        this.ang += Math.random() * 20 * Math.PI / 180 - 10 * Math.PI / 180;
    }
    show() {
        c.beginPath();
        c.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
        c.fillStyle = "#fddba3";
        c.fill();
    }
}

let f = [];

function draw() {
    if (f.length < 100) {
        for (let j = 0; j < 10; j++) {
            f.push(new firefly());
        }
    }
    //animation
    for (let i = 0; i < f.length; i++) {
        f[i].move();
        f[i].show();
        if (f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h) {
            f.splice(i, 1);
        }
    }
}

let mouse = {};
let last_mouse = {};

canvas.addEventListener(
    "mousemove",
    function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    },
    false
);

function init(elemid) {
    let canvas = document.getElementById(elemid),
        c = canvas.getContext("2d"),
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight);
    c.fillStyle = "rgba(30,30,30,1)";
    c.fillRect(0, 0, w, h);
    return c;
}

window.requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback);
        }
    );
});

function loop() {
    window.requestAnimFrame(loop);
    c.clearRect(0, 0, w, h);
    draw();
}

window.addEventListener("resize", function () {
    (w = canvas.width = window.innerWidth),
        (h = canvas.height = window.innerHeight);
    loop();
});

loop();
setInterval(loop, 1000 / 60);
