console.log("Configuring Spatial Navigation");

import { Platform } from 'react-native';
import { BackwardsCompatibleKeyMap, init, setKeyMap } from '@noriginmedia/norigin-spatial-navigation';
import config from "../config";


const KEY_MAPS: { [key: string]: BackwardsCompatibleKeyMap } = {
    ArrowKeys: {
        left: 37, // or 'ArrowLeft'
        up: 38, // or 'ArrowUp'
        right: 39, // or 'ArrowRight'
        down: 40, // or 'ArrowDown'
        enter: 13, // or 'Enter'
    },
    Shared: {
        left: [37, 'A'.charCodeAt(0),], // or 'ArrowLeft'
        up: [38, 'W'.charCodeAt(0),], // or 'ArrowUp'
        right: [39, 'D'.charCodeAt(0),], // or 'ArrowRight'
        down: [40, 'S'.charCodeAt(0),], // or 'ArrowDown'
        enter: [13, ' '.charCodeAt(0),], // or 'Enter'
    },
    WASD: {
        left: 'A'.charCodeAt(0), // or 'ArrowLeft'
        up: 'W'.charCodeAt(0), // or 'ArrowUp'
        right: 'D'.charCodeAt(0), // or 'ArrowRight'
        down: 'S'.charCodeAt(0), // or 'ArrowDown'
        enter: ' '.charCodeAt(0), // or 'Enter'
    },
};

init({
    debug: config.debug,
    nativeMode: Platform.OS !== 'web',
    visualDebug: config.debug,
    shouldUseNativeEvents: Platform.OS !== 'web',
});

// setKeyMap( KEY_MAPS.Shared );