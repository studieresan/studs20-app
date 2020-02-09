import {storeData, retrieveData, removeData} from 'studsapp/utils/storage';
import {updateGameState, fetchTopScores} from 'studsapp/utils/api';

export const GAME_SETTINGS = {
    localSaveInterval: 15 * 1000,
    backendSaveInterval: 30 * 1000,
    loading: -1,
};

export const load = async () => {
    const score = await retrieveData('score');
    const powerUps = await retrieveData('powerUps');
    if (score !== null && powerUps !== null) {
        return {
            score: parseInt(score),
            powerUps: JSON.parse(powerUps),
        };
    } else {
        // TODO: try from backend
        return {
            score: 0,
            powerUps: [0, 0, 0],
        };
    }
};

const localSave = async state => {
    await Promise.all([
        storeData('score', state.score.toString()),
        storeData('powerUps', JSON.stringify(state.powerUps)),
    ]).catch(error => console.error(error));
};

const backendSave = async state => {
    await updateGameState(state)
        .then(result => console.log(result))
        .catch(e => console.error(e));
};

export const createSaveTimers = stateFunc => {
    return [
        setInterval(
            () => localSave(stateFunc()),
            GAME_SETTINGS.localSaveInterval,
        ),
        setInterval(
            () => backendSave(stateFunc()),
            GAME_SETTINGS.backendSaveInterval,
        ),
    ];
};

export const getTopScores = () => fetchTopScores().catch(e => console.log(e));
