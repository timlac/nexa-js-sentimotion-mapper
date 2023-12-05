import definitions from '../data/nexa-sentimotion-definitions/sentimotion_definitions.json';

const emotionAbrToEmotion = invertObject(definitions.emotion_to_emotion_abr);
const emotionIdToEmotion = invertObject(definitions.emotion_to_emotion_id);
const emotionSweToEng = invertObject(definitions.emotion_eng_to_swe);


function invertObject(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[obj[key]] = key;
        return acc;
    }, {});
}

function translateValues(mapping, inputValues) {
    if (Array.isArray(inputValues)) {
        return inputValues.map(value => mapping[value] || null);
    } else {
        return mapping[inputValues] || null;
    }
}

function getEmotionAbrFromEmotion(emotion) {
    return translateValues(definitions.emotion_to_emotion_abr, emotion);
}

function getEmotionFromEmotionAbr(emotionAbr) {
    return translateValues(emotionAbrToEmotion, emotionAbr);
}

function getEmotionIdFromEmotion(emotion) {
    return translateValues(definitions.emotion_to_emotion_id, emotion);
}

function getEmotionFromId(emotionId) {
    return translateValues(emotionIdToEmotion, emotionId);
}

function getValenceFromEmotion(emotion) {
    return translateValues(definitions.emotion_to_valence, emotion);
}

function getSweTranslationFromEng(emotionEng) {
    return translateValues(definitions.emotion_eng_to_swe, emotionEng);
}

function getEngTranslationFromSwe(emotionSwe) {
    return translateValues(emotionSweToEng, emotionSwe);
}

function getEmotionInSweFromId(emotionId) {
    const emotionEng = translateValues(emotionIdToEmotion, emotionId);
    return translateValues(definitions.emotion_eng_to_swe, emotionEng);
}

function getEmotionIdFromSwe(emotionSwe) {
    const emotionEng = translateValues(emotionSweToEng, emotionSwe);
    return translateValues(definitions.emotion_to_emotion_id, emotionEng);
}

export {
    emotionIdToEmotion,
    getEmotionInSweFromId,
    getEmotionIdFromSwe,
    getEmotionFromId,
    getEmotionFromEmotionAbr,
    getEmotionIdFromEmotion,
    getEngTranslationFromSwe,
    getValenceFromEmotion,
    getSweTranslationFromEng,
    getEmotionAbrFromEmotion,
}