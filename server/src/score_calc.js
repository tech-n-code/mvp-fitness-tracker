import { scoringScales } from "./acft_tables.js";

//console.log(scoreNumBased("F", 43, "hrp", 3));

export function scoreNumBased(gender, age, event, num) {
    const ageStr = ageToStrBracket(age);
    const eventVerbose = eventToVerbose(event);
    const genderStr = gender === "M" ? "male" : "female";
    const eventArray = scoringScales[genderStr][ageStr][eventVerbose];
    //console.log(eventArray)
    let counter = 0;
    const highestRawScore = eventArray[eventArray.length-1].rawScore;
    //console.log(highestRawScore);
    const lowestRawScore = eventArray[0].rawScore;
    //console.log(lowestRawScore);
    if (num >= highestRawScore) {
        return 100;
    }
    if (num <= lowestRawScore) {
        return 0;
    }
    for (let i = 0; i < eventArray.length; i++) {
        if (num === eventArray[i].rawScore) {
            return eventArray[i].score;
        } else if (eventArray[i].rawScore === "---") {
            counter++;
            continue;
        } else if (num > eventArray[i].rawScore) {
            counter = 0;
            continue;
        } else {
            return eventArray[i - (counter + 1)].score;
        }
    }
}

//console.log(scoreTimeBased("M", 38, "sdc", 2, 45));
//console.log(scoreTimeBased("M", 40, "run", 13, 50));
//console.log(scoreTimeBased("F", 22, "plk", 0, 55));

export function scoreTimeBased(gender, age, event, min, sec) {
    const ageStr = ageToStrBracket(age);
    const eventVerbose = eventToVerbose(event);
    const timeInSeconds = (min * 60) + sec;
    const genderStr = gender === "M" ? "male" : "female";
    const eventArray = scoringScales[genderStr][ageStr][eventVerbose];
    //console.log(eventArray);
    if (eventVerbose === "2.5 mile walk" || eventVerbose === "12km bike" || eventVerbose === "1km swim" || eventVerbose === "5km row") {
        const rawScoreInSeconds = convertToSeconds(eventArray);
        return timeInSeconds <= rawScoreInSeconds ? "Go" : "No-Go";
    } else if (eventVerbose === "plank") {  //higher time is better, some "---" fields in table
        let counter = 0;
        const highestIsBestRawScoreInSeconds = convertToSeconds(eventArray[eventArray.length-1].rawScore);
        const lowestIsBadRawScoreInSeconds = convertToSeconds(eventArray[0].rawScore);
        if (timeInSeconds >= highestIsBestRawScoreInSeconds) {
            return 100;
        }
        if (timeInSeconds <= lowestIsBadRawScoreInSeconds) {
            return 0;
        }
        for (let i = 0; i < eventArray.length; i++) {
            if (eventArray[i].rawScore === "---") {  //skip row but keep track w/counter
                counter++;
                continue;
            }
            let rawScoreInSeconds = convertToSeconds(eventArray[i].rawScore);
            if (timeInSeconds === rawScoreInSeconds) {
                return eventArray[i].score;
            } else if (timeInSeconds > rawScoreInSeconds) {
                counter = 0;
                continue;
            } else if (timeInSeconds < rawScoreInSeconds) {
                return eventArray[i - (counter + 1)].score;
            }
        }
    } else {  //lower time is better, no "---" fields in table
        const lowestIsBestRawScoreInSeconds = convertToSeconds(eventArray[eventArray.length-1].rawScore);
        const highestIsBadRawScoreInSeconds = convertToSeconds(eventArray[0].rawScore);
        if (timeInSeconds <= lowestIsBestRawScoreInSeconds) {
            return 100;
        }
        if (timeInSeconds >= highestIsBadRawScoreInSeconds) {
            return 0;
        }
        if (timeInSeconds )
        for (let i = 0; i < eventArray.length; i++) {
            let rawScoreInSeconds = convertToSeconds(eventArray[i].rawScore);
            if (timeInSeconds === rawScoreInSeconds) {
                return eventArray[i].score;
            } else if (timeInSeconds > rawScoreInSeconds) {
                return eventArray[i - 1].score;
            }
        }
    }
}

function convertToSeconds(timeStr) {
    const [minStr, secStr] = timeStr.split(':');
    const minutes = parseInt(minStr);
    const seconds = parseInt(secStr);
    return (minutes * 60) + seconds;
}

function eventToVerbose(event) {
    let eventVerbose = "";
    if (event === "mdl") {
        eventVerbose = "deadlift";
    } else if (event === "spt") {
        eventVerbose = "standing power throw";
    } else if (event === "hrp") {
        eventVerbose = "hand release push-up";
    } else if (event === "sdc") {
        eventVerbose = "sprint drag carry";
    } else if (event === "plk") {
        eventVerbose = "plank";
    } else if (event === "run") {
        eventVerbose = "two mile run";
    } else if (event === "walk") {
        eventVerbose = "2.5 mile walk";
    } else if (event === "bike") {
        eventVerbose = "12km bike";
    } else if (event === "swim") {
        eventVerbose = "1km swim";
    } else if (event === "kmrow") {
        eventVerbose = "5km row";
    }
    return eventVerbose;
}

function ageToStrBracket(age) {
    let ageStr = "";
    if (age <= 21) {
        ageStr = "17-21";
    } else if (age <= 26) {
        ageStr = "22-26";
    } else if (age <= 31) {
        ageStr = "27-31";
    } else if (age <= 36) {
        ageStr = "32-36";
    } else if (age <= 41) {
        ageStr = "37-41";
    } else if (age <= 46) {
        ageStr = "42-46";
    } else if (age <= 51) {
        ageStr = "47-51";
    } else if (age <= 56) {
        ageStr = "56-52";
    } else if (age <= 61) {
        ageStr = "57-61";
    } else {
        ageStr = "Over 62";
    }
    return ageStr;
}