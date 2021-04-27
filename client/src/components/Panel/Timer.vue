<template>
    <div class="timer">
        <p id="stopwatch">
            {{timer}}
        </p>
        <ul id="buttons">
            <li><button @click="startTimer()">Start</button></li>
            <li><button @click="stopTimer()">Stop</button></li>
            <li><button @click="resetTimer()">Reset</button></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Timer",
    data() {
        return {
            timer: '00:00:00',
            hr: 0,
            min: 0,
            sec: 0,
            stoptime: true
        }
    },
    methods: {
        startTimer() {
            if (this.stoptime === true) {
                    this.stoptime = false;
                    this.timerCycle();
                }
        },
        stopTimer() {
            if (this.stoptime === false) {
                this.stoptime = true;
            }
        },
        timerCycle() {
            if (this.stoptime === false) {
                this.sec = parseInt(this.sec);
                this.min = parseInt(this.min);
                this.hr = parseInt(this.hr);

                this.sec = this.sec + 1;

                if (this.sec === 60) {
                this.min = this.min + 1;
                this.sec = 0;
                }
                if (this.min === 60) {
                this.hr = this.hr + 1;
                this.min = 0;
                this.sec = 0;
                }

                if (this.sec < 10 || this.sec === 0) {
                this.sec = '0' + this.sec;
                }
                if (this.min < 10 || this.min === 0) {
                this.min = '0' + this.min;
                }
                if (this.hr < 10 || this.hr === 0) {
                this.hr = '0' + this.hr;
                }

                this.timer = this.hr + ':' + this.min + ':' + this.sec;

                setTimeout(this.timerCycle, 1000);
            }
        },
        resetTimer() {
            this.timer = '00:00:00'
            this.hr = 0
            this.min = 0
            this.sec = 0
        }
    }
}
</script>

<style scoped>

.timer {
    margin: 40px auto;
    max-width: 100%;
    display: flex;
    flex-direction: column;
}
button {
    width: 60px;
    height: 30px;
    border: 3px white;
    border-radius: 50px;
    background: #202020;
    color: white;
    cursor: pointer;
    outline: none;
}

#stopwatch {
    text-align: center;
    font-size: 20px;
}
#buttons {
    display: flex;
    justify-content: space-evenly;
    padding: 0;
}
#buttons li {
    display: inline;
}
</style>
