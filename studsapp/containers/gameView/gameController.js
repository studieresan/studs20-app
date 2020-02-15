import {storeData, retrieveData, removeData} from 'studsapp/utils/storage';
import {updateGameState, fetchTopScores} from 'studsapp/utils/api';
import getStore from 'studsapp/store/createStore';

export const ONE_SECOND_IN_MILLIS = 1000;

export const GAME_SETTINGS = {
    localSaveInterval: 15 * ONE_SECOND_IN_MILLIS,
    backendSaveInterval: 30 * ONE_SECOND_IN_MILLIS,
    loading: -1,
};

const isOfflineMode = () => getStore().getState().global.settings.offlineMode;

export const load = async () => {
    const offlineMode = isOfflineMode();
    console.log(offlineMode);
    const score = await retrieveData('score');
    const powerUps = await retrieveData('powerUps');
    if (score !== null && powerUps !== null) {
        return {
            score: parseInt(score),
            powerUps: JSON.parse(powerUps),
        };
    } else {
        // TODO: try from backend only if online!
        return {
            score: 0,
            powerUps: [0, 0, 0],
        };
    }
};

const localSave = state =>
    Promise.all([
        storeData('score', state.score.toString()),
        storeData('powerUps', JSON.stringify(state.powerUps)),
    ]).catch(error => console.error(error));

const backendSave = ({score, powerUps}) =>
    !isOfflineMode() && updateGameState({score, powerUps}).catch(() => {});

export const createSaveTimers = stateFunc => [
    setInterval(() => localSave(stateFunc()), GAME_SETTINGS.localSaveInterval),
    setInterval(
        () => backendSave(stateFunc()),
        GAME_SETTINGS.backendSaveInterval,
    ),
];

export const getTopScores = () =>
    isOfflineMode() ? Promise.reject() : fetchTopScores();
