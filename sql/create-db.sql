-- Enable foreign key support:
PRAGMA foreign_keys = ON;

CREATE TABLE locations (
    name TEXT PRIMARY KEY,
    timezone TEXT NOT NULL,                            -- must be a string that http://momentjs.com/timezone/ understands.
    city TEXT NOT NULL,
    state TEXT,
    country TEXT NOT NULL,
    type INTEGER NOT NULL                              -- (0 reserved) 1 = host, 2 = office, 3 = other.
);

CREATE TABLE people (
    name TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    location TEXT NOT NULL,
    travelling TEXT,
    weekly INTEGER NOT NULL,                           -- pseudo-boolean: whether to send weekly reminders.
    individual INTEGER,                                -- in minutes.
    monday INTEGER NOT NULL,                           -- pseudo-boolean.
    FOREIGN KEY(location) REFERENCES locations(name),
    FOREIGN KEY(travelling) REFERENCES locations(name)
);

CREATE TABLE meetings (
    name TEXT PRIMARY KEY,
    owner TEXT NOT NULL,
    description TEXT NOT NULL,                         -- supports Markdown.
    location TEXT,                                     -- location and timezone can't be both NULL;
    timezone TEXT,                                     -- the meeting must be tied to either one or the other.
    day INTEGER NOT NULL,                              -- 0 = Mon, 6 = Sun.
    time TEXT NOT NULL,                                -- eg '8:30'.
    duration INTEGER NOT NULL,                         -- in minutes.
    FOREIGN KEY(owner) REFERENCES people(name),
    FOREIGN KEY(location) REFERENCES locations(name)
);

CREATE TABLE attendance (
    meeting TEXT,
    person TEXT,
    PRIMARY KEY(meeting, person),
    FOREIGN KEY(meeting) REFERENCES meetings(name),
    FOREIGN KEY(person) REFERENCES people(name)
);
