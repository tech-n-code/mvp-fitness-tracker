import { scoreNumBased, scoreTimeBased } from "./score_calc.js";

export function insertScoresToJson(results) {
    for (let i = 0; i < results.length; i++) {
        let scores = {};
        let gender = results[i].gender;
        let age = results[i].acft_age;
        let event = "mdl";
        let num = results[i].mdl;
        let mdlScore = scoreNumBased(gender, age, event, num);
        scores["mdlScore"] = mdlScore;
        event = "spt";
        num = results[i].spt;
        let sptScore = scoreNumBased(gender, age, event, num);
        scores["sptScore"] = sptScore;
        event = "hrp";
        num = results[i].hrp;
        let hrpScore = scoreNumBased(gender, age, event, num);
        scores["hrpScore"] = hrpScore;
        event = "sdc";
        let min = results[i].sdc["minutes"];
        let sec = results[i].sdc["seconds"];
        let sdcScore = scoreTimeBased(gender, age, event, min, sec);
        scores["sdcScore"] = sdcScore;
        event = "plk";
        min = results[i].plk["minutes"];
        sec = results[i].plk["seconds"];
        let plkScore = scoreTimeBased(gender, age, event, min, sec);
        scores["plkScore"] = plkScore;
        if (results[i].run !== null) {
            event = "run";
            min = results[i].run["minutes"];
            sec = results[i].run["seconds"];
            let runScore = scoreTimeBased(gender, age, event, min, sec);
            scores["runScore"] = runScore;
        }
        if (results[i].walk !== null) {
            event = "walk";
            min = results[i].walk["minutes"];
            sec = results[i].walk["seconds"];
            let walkScore = scoreTimeBased(gender, age, event, min, sec);
            scores["walkScore"] = walkScore;
        }
        if (results[i].bike !== null) {
            event = "bike";
            min = results[i].bike["minutes"];
            sec = results[i].bike["seconds"];
            let bikeScore = scoreTimeBased(gender, age, event, min, sec);
            scores["bikeScore"] = bikeScore;
        }
        if (results[i].swim !== null) {
            event = "swim";
            min = results[i].swim["minutes"];
            sec = results[i].swim["seconds"];
            let swimScore = scoreTimeBased(gender, age, event, min, sec);
            scores["swimScore"] = swimScore;
        }
        if (results[i].kmrow !== null) {
            event = "kmrow";
            min = results[i].kmrow["minutes"];
            sec = results[i].kmrow["seconds"];
            let kmrowScore = scoreTimeBased(gender, age, event, min, sec);
            scores["kmrowScore"] = kmrowScore;
        }
        for (let key in scores) {
            results[i][key] = scores[key];
        }
    }
    return results;
}