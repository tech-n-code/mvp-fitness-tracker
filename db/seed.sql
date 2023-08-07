INSERT INTO person (name, gender, age) VALUES ('SGT Grogu', 'M', 25);
INSERT INTO person (name, gender, age) VALUES ('PVT Leia', 'F', 22);
INSERT INTO person (name, gender, age) VALUES ('SSG Solo', 'M', 40);

INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (22, 230, 8.5, 35, '00:02:05', '00:02:51', '00:18:25', NULL, NULL, NULL, NULL, '2020-06-19', 1);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (23, 240, 8.8, 39, '00:02:01', '00:02:56', '00:18:15', NULL, NULL, NULL, NULL, '2021-08-11', 1);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (24, 250, 9.1, 43, '00:01:55', '00:03:05', '00:18:05', NULL, NULL, NULL, NULL, '2022-04-02', 1);

-- Current seed data; no leading zeroes needed for time interval values
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (22, 230, 8.5, 35, '02:05', '02:51', '18:25', NULL, NULL, NULL, NULL, '2020-06-19', 1);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (23, 240, 8.8, 39, '02:01', '02:56', '18:15', NULL, NULL, NULL, NULL, '2021-08-11', 1);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (24, 250, 9.1, 43, '01:55', '03:05', '18:05', NULL, NULL, NULL, NULL, '2022-04-02', 1);

INSERT INTO acft (20, age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (150, 7.9, 30, '02:05', '03:03', '18:15', NULL, NULL, NULL, NULL, '2021-05-05', 2);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (21, 160, 8.3, 35, '01:50', '03:16', '17:45', NULL, NULL, NULL, NULL, '2022-06-19', 2);

INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (36, 150, 9.4, 25, '02:45', '01:55', '19:15', NULL, NULL, NULL, NULL, '2019-04-01', 3);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (37, 160, 9.2, 27, '02:35', '02:05', '19:05', NULL, NULL, NULL, NULL, '2020-05-12', 3);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (38, 170, 9.6, 31, '02:40', '02:10', '19:10', NULL, NULL, NULL, NULL, '2021-07-22', 3);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (39, 160, 9.1, 22, '02:55', '01:59', '19:55', NULL, NULL, NULL, NULL, '2022-08-11', 3);
INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (40, 180, 9.7, 33, '02:36', '02:25', '19:35', NULL, NULL, NULL, NULL, '2023-03-16', 3);

-- New 'draft' seed; added leading zeroes due to change from interval to 'time' data type; side efects not fully explored yet
-- INSERT INTO acft (20, age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (150, 7.9, 30, '00:02:05', '00:03:03', '00:18:15', NULL, NULL, NULL, NULL, '2021-05-05', 2);
-- INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (21, 160, 8.3, 35, '00:01:50', '00:03:16', '00:17:45', NULL, NULL, NULL, NULL, '2022-06-19', 2);

-- INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (36, 150, 9.4, 25, '00:02:45', '00:01:55', '00:19:15', NULL, NULL, NULL, NULL, '2019-04-01', 3);
-- INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (37, 160, 9.2, 27, '00:02:35', '00:02:05', '00:19:05', NULL, NULL, NULL, NULL, '2020-05-12', 3);
-- INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (38, 170, 9.6, 31, '00:02:40', '00:02:10', '00:19:10', NULL, NULL, NULL, NULL, '2021-07-22', 3);
-- INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (39, 160, 9.1, 22, '00:02:55', '00:01:59', '00:19:55', NULL, NULL, NULL, NULL, '2022-08-11', 3);
-- INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, walk, bike, swim, kmrow, date, person_id) VALUES (40, 180, 9.7, 33, '00:02:36', '00:02:25', '00:19:35', NULL, NULL, NULL, NULL, '2023-03-16', 3);