const scoringScales = {
    "male": {
        "17-21": {
            "deadlift": [
                { "score": 0, "rawScore": 80 },
                { "score": 10, "rawScore": 90 },
                { "score": 20, "rawScore": 100 },
                { "score": 30, "rawScore": 110 },
                { "score": 40, "rawScore": 120 },
                { "score": 50, "rawScore": 130 },
                { "score": 60, "rawScore": 140 },
                { "score": 61, "rawScore": 150 },
                { "score": 62, "rawScore": 150 },
                { "score": 63, "rawScore": 150 },
                { "score": 64, "rawScore": 160 },
                { "score": 65, "rawScore": 160 },
                { "score": 66, "rawScore": 160 },
                { "score": 67, "rawScore": 170 },
                { "score": 68, "rawScore": 180 },
                { "score": 69, "rawScore": 190 },
                { "score": 70, "rawScore": 190 },
                { "score": 71, "rawScore": 190 },
                { "score": 72, "rawScore": 200 },
                { "score": 73, "rawScore": 200 },
                { "score": 74, "rawScore": 210 },
                { "score": 75, "rawScore": 210 },
                { "score": 76, "rawScore": 210 },
                { "score": 77, "rawScore": 220 },
                { "score": 78, "rawScore": 220 },
                { "score": 79, "rawScore": 230 },
                { "score": 80, "rawScore": 230 },
                { "score": 81, "rawScore": 230 },
                { "score": 82, "rawScore": 240 },
                { "score": 83, "rawScore": 250 },
                { "score": 84, "rawScore": 260 },
                { "score": 85, "rawScore": 260 },
                { "score": 86, "rawScore": 260 },
                { "score": 87, "rawScore": 270 },
                { "score": 88, "rawScore": 270 },
                { "score": 89, "rawScore": 270 },
                { "score": 90, "rawScore": 280 },
                { "score": 91, "rawScore": 290 },
                { "score": 92, "rawScore": 290 },
                { "score": 93, "rawScore": 300 },
                { "score": 94, "rawScore": 300 },
                { "score": 95, "rawScore": 310 },
                { "score": 96, "rawScore": 320 },
                { "score": 97, "rawScore": 320 },
                { "score": 98, "rawScore": 320 },
                { "score": 99, "rawScore": 330 },
                { "score": 100, "rawScore": 340 }
            ],
            "standing power throw": [
                { "score": 0, "rawScore": 4.0 },
                { "score": 1, "rawScore": 4.0 },
                { "score": 2, "rawScore": 4.1 },
                { "score": 3, "rawScore": 4.1 },
                { "score": 4, "rawScore": 4.2 },
                { "score": 5, "rawScore": 4.2 },
                { "score": 6, "rawScore": 4.3 },
                { "score": 7, "rawScore": 4.3 },
                { "score": 8, "rawScore": 4.4 },
                { "score": 9, "rawScore": 4.4 },
                { "score": 10, "rawScore": 4.5 },
                { "score": 11, "rawScore": 4.5 },
                { "score": 12, "rawScore": 4.6 },
                { "score": 13, "rawScore": 4.6 },
                { "score": 14, "rawScore": 4.7 },
                { "score": 15, "rawScore": 4.7 },
                { "score": 16, "rawScore": 4.8 },
                { "score": 17, "rawScore": 4.8 },
                { "score": 18, "rawScore": 4.9 },
                { "score": 19, "rawScore": 4.9 },
                { "score": 20, "rawScore": 4.9 },
                { "score": 21, "rawScore": 5.0 },
                { "score": 22, "rawScore": 5.0 },
                { "score": 23, "rawScore": 5.0 },
                { "score": 24, "rawScore": 5.1 },
                { "score": 25, "rawScore": 5.1 },
                { "score": 26, "rawScore": 5.1 },
                { "score": 27, "rawScore": 5.1 },
                { "score": 28, "rawScore": 5.1 },
                { "score": 29, "rawScore": 5.5 },
                { "score": 30, "rawScore": 5.2 },
                { "score": 31, "rawScore": 5.3 },
                { "score": 32, "rawScore": 5.3 },
                { "score": 33, "rawScore": 5.3 },
                { "score": 34, "rawScore": 5.4 },
                { "score": 35, "rawScore": 5.4 },
                { "score": 36, "rawScore": 5.4 },
                { "score": 37, "rawScore": 5.4 },
                { "score": 38, "rawScore": 5.5 },
                { "score": 39, "rawScore": 5.5 },
                { "score": 40, "rawScore": 5.5 },
                { "score": 41, "rawScore": 5.5 },
                { "score": 42, "rawScore": 5.6 },
                { "score": 43, "rawScore": 5.6 },
                { "score": 44, "rawScore": 5.6 },
                { "score": 45, "rawScore": 5.6 },
                { "score": 46, "rawScore": 5.6 },
                { "score": 47, "rawScore": 5.7 },
                { "score": 48, "rawScore": 5.9 },
                { "score": 49, "rawScore": 5.9 },
                { "score": 50, "rawScore": 5.7 },
                { "score": 51, "rawScore": 5.7 },
                { "score": 52, "rawScore": 5.8 },
                { "score": 53, "rawScore": 5.8 },
                { "score": 54, "rawScore": 5.8 },
                { "score": 55, "rawScore": 5.8 },
                { "score": 56, "rawScore": 5.8 },
                { "score": 57, "rawScore": 5.9 },
                { "score": 58, "rawScore": 5.9 },
                { "score": 59, "rawScore": 5.9 },
                { "score": 60, "rawScore": 6.0 },
                { "score": 61, "rawScore": 6.6 },
                { "score": 62, "rawScore": 6.9 },
                { "score": 63, "rawScore": 7.2 },
                { "score": 64, "rawScore": 7.4 },
                { "score": 65, "rawScore": 7.5 },
                { "score": 66, "rawScore": 7.7 },
                { "score": 67, "rawScore": 7.9 },
                { "score": 68, "rawScore": 8.0 },
                { "score": 69, "rawScore": 8.1 },
                { "score": 70, "rawScore": 8.2 },
                { "score": 71, "rawScore": 8.3 },
                { "score": 72, "rawScore": 8.4 },
                { "score": 73, "rawScore": 8.5 },
                { "score": 74, "rawScore": 8.6 },
                { "score": 75, "rawScore": 8.8 },
                { "score": 76, "rawScore": 8.9 },
                { "score": 77, "rawScore": 9.0 },
                { "score": 78, "rawScore": 9.1 },
                { "score": 79, "rawScore": 9.2 },
                { "score": 80, "rawScore": 9.3 },
                { "score": 81, "rawScore": 9.4 },
                { "score": 82, "rawScore": 9.5 },
                { "score": 83, "rawScore": 9.6 },
                { "score": 84, "rawScore": 9.7 },
                { "score": 85, "rawScore": 9.8 },
                { "score": 86, "rawScore": 9.9 },
                { "score": 87, "rawScore": 10.0 },
                { "score": 88, "rawScore": 10.3 },
                { "score": 89, "rawScore": 10.4 },
                { "score": 90, "rawScore": 10.5 },
                { "score": 91, "rawScore": 10.6 },
                { "score": 92, "rawScore": 10.7 },
                { "score": 93, "rawScore": 10.9 },
                { "score": 94, "rawScore": 11.0 },
                { "score": 95, "rawScore": 11.3 },
                { "score": 96, "rawScore": 11.5 },
                { "score": 97, "rawScore": 11.7 },
                { "score": 98, "rawScore": 12.0 },
                { "score": 99, "rawScore": 12.4 },
                { "score": 100, "rawScore": 12.6 }
            ],
            "hand release push-up": [
                { "score": 0, "rawScore": 4 },
                { "score": 10, "rawScore": 5 },
                { "score": 20, "rawScore": 6 },
                { "score": 30, "rawScore": 7 },
                { "score": 40, "rawScore": 8 },
                { "score": 50, "rawScore": 9 },
                { "score": 60, "rawScore": 10 },
                { "score": 61, "rawScore": 13 },
                { "score": 62, "rawScore": 16 },
                { "score": 63, "rawScore": 17 },
                { "score": 64, "rawScore": 20 },
                { "score": 65, "rawScore": 22 },
                { "score": 66, "rawScore": 23 },
                { "score": 67, "rawScore": 24 },
                { "score": 68, "rawScore": 25 },
                { "score": 69, "rawScore": 27 },
                { "score": 70, "rawScore": 28 },
                { "score": 71, "rawScore": 29 },
                { "score": 72, "rawScore": 30 },
                { "score": 73, "rawScore": 31 },
                { "score": 74, "rawScore": 31 },
                { "score": 75, "rawScore": 32 },
                { "score": 76, "rawScore": 33 },
                { "score": 77, "rawScore": 34 },
                { "score": 78, "rawScore": 35 },
                { "score": 79, "rawScore": 36 },
                { "score": 80, "rawScore": 37 },
                { "score": 81, "rawScore": 37 },
                { "score": 82, "rawScore": 38 },
                { "score": 83, "rawScore": 39 },
                { "score": 84, "rawScore": 40 },
                { "score": 85, "rawScore": 40 },
                { "score": 86, "rawScore": 41 },
                { "score": 87, "rawScore": 42 },
                { "score": 88, "rawScore": 43 },
                { "score": 89, "rawScore": 44 },
                { "score": 90, "rawScore": 45 },
                { "score": 91, "rawScore": 46 },
                { "score": 92, "rawScore": 47 },
                { "score": 93, "rawScore": 48 },
                { "score": 94, "rawScore": 49 },
                { "score": 95, "rawScore": 50 },
                { "score": 96, "rawScore": 51 },
                { "score": 97, "rawScore": 53 },
                { "score": 98, "rawScore": 54 },
                { "score": 99, "rawScore": 56 },
                { "score": 100, "rawScore": 57 }
            ],
            "sprint drag carry": [
                { "score": 98, "rawScore": 54 },
                { "score": 99, "rawScore": 56 },
                { "score": 100, "rawScore": 57 }
            ],
            "plank": [
                { "score": 98, "rawScore": 54 },
                { "score": 99, "rawScore": 56 },
                { "score": 100, "rawScore": 57 }
            ],
            "two mile run": [
                { "score": 0, "rawScore": 24:00 },
                { "score": 1, "rawScore": 23:58 },
                { "score": 2, "rawScore": 23:56 },
                { "score": 3, "rawScore": 23:54 },
                { "score": 4, "rawScore": 23:52 },
                { "score": 5, "rawScore": 23:50 },
                { "score": 6, "rawScore": 23:48 },
                { "score": 7, "rawScore": 23:46 },
                { "score": 8, "rawScore": 23:44 },
                { "score": 9, "rawScore": 23:42 },
                { "score": 10, "rawScore": 23:40 },
                { "score": 11, "rawScore": 23:38 },
                { "score": 12, "rawScore": 23:36 },
                { "score": 13, "rawScore": 23:34 },
                { "score": 14, "rawScore": 23:32 },
                { "score": 15, "rawScore": 23:30 },
                { "score": 16, "rawScore": 23:28 },
                { "score": 17, "rawScore": 23:26 },
                { "score": 18, "rawScore": 23:24 },
                { "score": 19, "rawScore": 23:22 },
                { "score": 20, "rawScore": 23:20 },
                { "score": 21, "rawScore": 23:18 },
                { "score": 22, "rawScore": 23:16 },
                { "score": 23, "rawScore": 23:14 },
                { "score": 24, "rawScore": 23:12 },
                { "score": 25, "rawScore": 23:10 },
                { "score": 26, "rawScore": 23:08 },
                { "score": 27, "rawScore": 23:06 },
                { "score": 28, "rawScore": 23:04 },
                { "score": 29, "rawScore": 23:02 },
                { "score": 30, "rawScore": 22:59 },
                { "score": 31, "rawScore": 22:57 },
                { "score": 32, "rawScore": 22:55 },
                { "score": 33, "rawScore": 22:53 },
                { "score": 34, "rawScore": 22:51 },
                { "score": 35, "rawScore": 22:49 },
                { "score": 36, "rawScore": 22:47 },
                { "score": 37, "rawScore": 22:45 },
                { "score": 38, "rawScore": 22:43 },
                { "score": 39, "rawScore": 22:41 },
                { "score": 40, "rawScore": 22:39 },
                { "score": 41, "rawScore": 22:37 },
                { "score": 42, "rawScore": 22:35 },
                { "score": 43, "rawScore": 22:33 },
                { "score": 44, "rawScore": 22:31 },
                { "score": 45, "rawScore": 22:29 },
                { "score": 46, "rawScore": 22:27 },
                { "score": 47, "rawScore": 22:25 },
                { "score": 48, "rawScore": 22:23 },
                { "score": 49, "rawScore": 22:21 },
                { "score": 50, "rawScore": 22:19 },
                { "score": 51, "rawScore": 22:17 },
                { "score": 52, "rawScore": 22:15 },
                { "score": 53, "rawScore": 22:13 },
                { "score": 54, "rawScore": 22:11 },
                { "score": 55, "rawScore": 22:09 },
                { "score": 56, "rawScore": 22:07 },
                { "score": 57, "rawScore": 22:05 },
                { "score": 58, "rawScore": 22:03 },
                { "score": 59, "rawScore": 22:01 },
                { "score": 60, "rawScore": 22:00 },
                { "score": 61, "rawScore": 21:03 },
                { "score": 62, "rawScore": 20:42 },
                { "score": 63, "rawScore": 20:19 },
                { "score": 64, "rawScore": 20:00 },
                { "score": 65, "rawScore": 19:43 },
                { "score": 66, "rawScore": 19:27 },
                { "score": 67, "rawScore": 19:12 },
                { "score": 68, "rawScore": 19:00 },
                { "score": 69, "rawScore": 18:47 },
                { "score": 70, "rawScore": 18:35 },
                { "score": 71, "rawScore": 18:23 },
                { "score": 72, "rawScore": 18:12 },
                { "score": 73, "rawScore": 18:01 },
                { "score": 74, "rawScore": 17:52 },
                { "score": 75, "rawScore": 17:43 },
                { "score": 76, "rawScore": 17:33 },
                { "score": 77, "rawScore": 17:24 },
                { "score": 78, "rawScore": 17:15 },
                { "score": 79, "rawScore": 17:05 },
                { "score": 80, "rawScore": 16:57 },
                { "score": 81, "rawScore": 16:48 },
                { "score": 82, "rawScore": 16:39 },
                { "score": 83, "rawScore": 16:30 },
                { "score": 84, "rawScore": 16:22 },
                { "score": 85, "rawScore": 16:14 },
                { "score": 86, "rawScore": 16:05 },
                { "score": 87, "rawScore": 15:57 },
                { "score": 88, "rawScore": 15:48 },
                { "score": 89, "rawScore": 15:39 },
                { "score": 90, "rawScore": 15:30 },
                { "score": 91, "rawScore": 15:20 },
                { "score": 92, "rawScore": 15:11 },
                { "score": 93, "rawScore": 15:00 },
                { "score": 94, "rawScore": 14:51 },
                { "score": 95, "rawScore": 14:40 },
                { "score": 96, "rawScore": 14:28 },
                { "score": 97, "rawScore": 14:15 },
                { "score": 98, "rawScore": 14:00 },
                { "score": 99, "rawScore": 13:42 },
                { "score": 100, "rawScore": 13:22 },
            ],
            "2.5 mile walk": "31:00",
            "12km bike": "26:25",
            "1km swim": "30:48",
            "5km row": "30:48"
        },
        "21-26": {
            // scoring scales for this age group
        },
        // more age groups here
        },
        "female": {
         // scoring scales for females
        }
    };
  