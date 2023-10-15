class Sketchpad {
    constructor(container, size, actions) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.context = this.canvas.getContext("2d");
        container.appendChild(this.canvas);

        this.undoButton = actions[0];
        this.clearButton = actions[1];
        this.submitButton = actions[2];

        this.reset();

        this.#addEventListeners()
    }

    reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
    }

    #addEventListeners() {
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouse(evt);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }
        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                this.#redraw();
            }
        }
        document.onmouseup = () => {
            this.isDrawing = false;
        }
        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }
        document.ontouchend = () => {
            document.onmouseup();
        }

        this.undoButton.onclick = () => {
            this.paths.pop();
            this.#redraw();
        }

        this.clearButton.onclick = () => {
            this.paths = [];
            this.#redraw();
        }
        this.submitButton.addEventListener("click", () => {
            this.paths = [];
            this.#redraw();
        })
    }

    #redraw() {
        this.context.clearRect(0, 0,
            this.canvas.width, this.canvas.height);
        draw.paths(this.context, this.paths);
        if (this.paths.length > 0) {
            this.undoButton.disabled = false;
            this.submitButton.disabled = false;
            this.clearButton.disabled = false;
        } else {
            this.undoButton.disabled = true;
            this.submitButton.disabled = true;
            this.clearButton.disabled = true;
        }
    }

    #getMouse(event) {
        var rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(event.clientX - rect.left),
            Math.round(event.clientY - rect.top)
        ];
    }

}

