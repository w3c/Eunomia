-- Enable foreign key support:
PRAGMA foreign_keys = ON;

INSERT INTO locations VALUES
    -- Special one:
    -- ('UTC', 'UTC', null, null, null, 0),
    -- Hosts:
    ('MIT', 'EST', 'Boston', 'Massachusetts', 'USA', 1),
    ('ERCIM', 'CET', 'Valbonne', "Provence-Alpes-Côte d'Azur", 'France', 1),
    ('Keio', 'JST', 'Fujisawa', 'Kanagawa', 'Japan', 1),
    ('Beihang', 'CST', 'Beijing', 'Beijing', 'China', 1),
    -- Offices:
    ('CTIC (Spanish office)', 'CET', 'Gijón', 'Principado de Asturias', 'Spain', 2),
    -- Others:
    ('Madrid', 'CET', 'Madrid', 'Madrid', 'Spain', 3)
;

INSERT INTO people VALUES
    ('Antonio', 'antonio@w3.org', 'Keio', 'Madrid', 1, 60, 1),
    ('Guillaume', 'guillaume@w3.org', 'MIT', NULL, 0, 0, 0),
    ('Coralie', 'coralie@w3.org', 'ERCIM', NULL, 0, 0, 1),
    ('Kaz', 'ashimura@w3.org', 'Keio', NULL, 0, 0, 1),
    ('Ted', 'ted@w3.org', 'MIT', NULL, 0, 0, 0)
;

INSERT INTO meetings VALUES
    ('Design', 'Antonio', '[Wiki page](https://www.w3.org/Team/wiki/%E2%80%9CDashboards%E2%80%9D_project)', NULL, 'UTC', 3, '15:00', 60),
    ('KAP', 'Kaz', '[Agenda](https://www.w3.org/Team/Keio/agenda)', 'Keio', NULL, 3, '15:30', 90),
    ('Sysweb', 'Ted', '', 'MIT', NULL, 2, '10:00', 60)
;

INSERT INTO attendance VALUES
    ('Design', 'Guillaume'),
    ('Design', 'Coralie'),
    ('KAP', 'Antonio')
;
