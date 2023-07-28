let store = {
    _state: {

        timer: "0",
        hours: "hh",
        minutes: "mm",
        seconds: "ss",
    },

    mainButtonDisabled: false,

    mainButton() {
        this.mainButtonDisabled = true
        this.timerStart()
    },

    timerStart() {
        this.timeConverter(this._state.timer)
        this.container();
        this.timerOnGo(this._state.timer);
    },

    async timerOnGo() {
        for (let i = this._state.hours; i > -1; i--) {
            this._state.hours = i
            for (let i = this._state.minutes; i > -1; i--) {
                this._state.minutes = i
                for (let i = this._state.seconds; i > -1; i--) {
                    this._state.seconds = i
                    this.container()
                    await this.sleep(1000)
                }
                this._state.seconds = "59"
            }
            this._state.minutes = "59"
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