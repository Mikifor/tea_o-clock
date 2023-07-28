let store = {
    _state: {

        timer: "0",
        hours: "hh",
        minutes: "mm",
        seconds: "ss",
        timePath: []
    },

    mainButtonDisabled: false,

    mainButton() {
        this.mainButtonDisabled = true
        this.timerStart()
    },

    timerStart() {
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j++) {
                for (let k = 0; k < 60; k++) {
                    if ((i * 3600 + j * 60 + k) <= this._state.timer) {
                        this._state.timePath.push([i, j, k])
                    }
                }

            }
        }
        console.log(this._state.timePath)
        this._state.timePath.reverse()
        this.timerOnGo()

    },

    async timerOnGo() {
        let length = this._state.timePath.length
        for (let i = 0; i < length; i++) {

            let cell = this._state.timePath.shift()
            this._state.hours = cell[0]
            this._state.minutes = cell[1]
            this._state.seconds = cell[2]
            this.container()
            await this.sleep(1000)
            console.log(cell)
            console.log(this._state.timePath)
        }
        this.timerFinnish()
    },

    timerFinnish() {
        this.mainButtonDisabled = false
        this.container()
        this._state.hours = "hh"
        this._state.minutes = "mm"
        this._state.seconds = "ss"
    },

    timeConverter(time) {
        this._state.hours = Math.floor(time / 3600)
        this._state.minutes = Math.floor((time - this._state.hours * 3600) / 60)
        this._state.seconds = time - this._state.hours * 3600 - this._state.minutes * 60
        this.container()
    },

    changeNumber(newValue) {
        this._state.timer = newValue;
    },

    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },

    container() { },

    observer(props) {
        this.container = props;
    },

}

export default store;