import React, { useRef, useEffect, useCallback } from "react";
import { View, Panel, Div, IconButton, SimpleCell, Image } from '@vkontakte/vkui'
import { Icon16MoreVertical } from '@vkontakte/icons';
import { observer } from "mobx-react-lite";
import classes from "./Music.module.css"

 function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
}

const Music = observer(({musicPlayer}) => {
    const notActiveIcon = <Image src={'/media/img/icon.png'} widthSize={'40px'} heightSize={'40px'} alt="название альбома" />
    const activeIcon = <Image src={'/media/img/icon_progress.png'} widthSize={'40px'} heightSize={'40px'} alt="название альбома" />
    const audioRef = useRef();

    const handlePlay = () => {
        audioRef.current.play();
        musicPlayer.setPlaying(true);
    }

    const handlePause = () => {
        audioRef.current.pause();
        musicPlayer.setPlaying(false);
    }

    const handleTimeUpdate = useCallback(() => {
        musicPlayer.setCurrentTime(audioRef.current.currentTime);
        musicPlayer.setDuration(audioRef.current.duration);
    }, [musicPlayer]);


    useEffect(() => {
        const audioEl = audioRef.current;

        if (audioEl) {
            audioEl.addEventListener("timeupdate", handleTimeUpdate);
        }

        return () => {
            audioEl.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [handleTimeUpdate]);

    const handlePlayPause = () => {
        if (musicPlayer.isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    return (
        <View activePanel="div" style={{ width: '392px' }}>
            <Panel  id="div">
                <Div style={{backgroundColor: 'white'}}>
                        <SimpleCell
                            after={<IconButton label='Дополнительные функции'><Icon16MoreVertical /></IconButton>}
                            before={musicPlayer.isPlaying ? activeIcon : notActiveIcon}
                            subtitle="3FORCE"
                            indicator={<span className={classes.duration}>{formatDuration(musicPlayer.currentTime) === formatDuration(musicPlayer.duration) ? '0:00' : formatDuration(musicPlayer.currentTime)}</span>}
                            onClick={handlePlayPause}
                        >
                        <span className={classes.title}>Unleash</span>
                        </SimpleCell>
                        <audio src="/media/music/3force.mp3" ref={audioRef} />
                </Div>
            </Panel>
        </View>
    )
})

export default Music;
