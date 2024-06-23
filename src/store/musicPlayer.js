import { makeAutoObservable } from "mobx"

class MusicPlayer {
    isPlaying = false;
    currentTime = 0;
    duration = 0;

    constructor() {
        makeAutoObservable(this)
    }

    setPlaying = (playing) => {
        this.isPlaying = playing;
    };

    setCurrentTime = (time) => {
        this.currentTime = time;
    };

    setDuration = (duration) => {
        this.duration = duration;
    };
}

export default MusicPlayer
