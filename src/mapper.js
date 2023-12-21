import definitions from '../data/nexa-sentimotion-definitions/sentimotion_definitions.json';

const emotionAbrToEmotion = invertObject(definitions.emotion_to_emotion_abr);
const emotionIdToEmotion = invertObject(definitions.emotion_to_emotion_id);
const emotionSweToEng = invertObject(definitions.emotion_eng_to_swe);


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function prettifySwe(inputValues) {
    const formatMapSwe = {
        "tillfredsställelse_belåtenhet": "Tillfredsställelse/Belåtenhet",
        "exalterad_förväntansfull": "Exalterad/Förväntansfull",
        "intresse_nyfikenhet": "Intresse/Nyfikenhet",
        "sexuell_lust": "Sexuell lust",
        "att_bli_rörd": "Att bli rörd",
        "sinnlig_njutning": "Sinnlig njutning",
        "positiv_förvåning": "Positiv förvåning",
        "triumf_prestation": "Triumf/Prestation",
        "oro_ängslan": "Oro/Ängslan",
        "nöd_smärta": "Nöd/Smärta",
        "att_bli_avvisad": "Att bli avvisad",
        "negativ_förvåning": "Negativ förvåning",
    }

    if (Array.isArray(inputValues)) {
        return inputValues.map(value => formatMapSwe[value] || capitalizeFirstLetter(value));
    } else {
        return formatMapSwe[inputValues] || capitalizeFirstLetter(inputValues);
    }
}


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

function getEmotionFromId(emotionId, pretty = false) {
    return translateValues(emotionIdToEmotion, emotionId);
}

function getValenceFromEmotion(emotion) {
    return translateValues(definitions.emotion_to_valence, emotion);
}

function getValenceFromEmotionId(emotionId) {
    const emotion = translateValues(emotionIdToEmotion, emotionId)
    return translateValues(definitions.emotion_to_valence, emotion)
}


function getSweTranslationFromEng(emotionEng) {
    return translateValues(definitions.emotion_eng_to_swe, emotionEng);
}

function getEngTranslationFromSwe(emotionSwe) {
    return translateValues(emotionSweToEng, emotionSwe);
}

function getEmotionInSweFromId(emotionId, pretty=false) {
    const emotionEng = translateValues(emotionIdToEmotion, emotionId);
    const ret = translateValues(definitions.emotion_eng_to_swe, emotionEng);
    if (pretty){
        return prettifySwe(ret)
    } else {
        return ret
    }
}

function getEmotionIdFromSwe(emotionSwe) {
    const emotionEng = translateValues(emotionSweToEng, emotionSwe);
    return translateValues(definitions.emotion_to_emotion_id, emotionEng);
}

function getEmotionDescInSweFromId(emotionId) {
    const emotionSwe = getEmotionInSweFromId(emotionId)
    return translateValues(definitions.emotion_swe_to_desc, emotionSwe)
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
    getValenceFromEmotionId,
    getSweTranslationFromEng,
    getEmotionAbrFromEmotion,
    getEmotionDescInSweFromId
}