let store = {
    _state: {

        timer: "0",
        hours: "hh",
        minutes: "mm",
        seconds: "ss",
        expiringAt: "",
        startAt: "",
    },

    mainButtonDisabled: false,

    mainButton() {
        this.mainButtonDisabled = true
        this.timerStart()
    },

    timerStart() {
        debugger
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://worldtimeapi.org/api/timezone/Europe/London', false); // Делаем запрос по Лондону
        xhr.send() // отправляем

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText); // Если статус не равен 200, то выводим ошибку.
        } else {
            let time = xhr.responseText; // получаем текст ответа
            console.log(time)
            let z = JSON.parse(time).utc_datetime; // Получаем время utc
            console.log(z)
            this._state.startAt = new Date(z).getTime(); // Переводим в timestamp
            console.log("TImestamp: " + this._state.startAt)
            this._state.expiringAt = this._state.startAt + Number(this._state.timer*1000)
        }
        this.container()
        this.timerOnGo()
    },

    async timerOnGo() {
        let T = this._state.startAt

        while (this._state.expiringAt > T)  {
            var xhr = new XMLHttpRequest();
            
            xhr.open('GET', 'http://worldtimeapi.org/api/timezone/Europe/London', false); // Делаем запрос по Лондону
            xhr.send(); // отправляем
            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText); // Если статус не равен 200, то выводим ошибку.
            } else {
                let time = xhr.responseText; // получаем текст ответа
                console.log(time)
                let z = JSON.parse(time).utc_datetime; // Получаем время utc
                console.log(z)
                T = new Date(z).getTime(); // Переводим в timestamp
                console.log("Curent Timestamp: " + T)
                console.log("Expiring at ____: " + this._state.expiringAt)
                let timer = Math.ceil((this._state.expiringAt - T) /  1000)
                console.log("Seconds     ____: " + timer)
                this.timeConverter(timer)
                this.container()
                await this.sleep(100)
            }
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