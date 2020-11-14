DROP DATABASE IF EXISTS koss;

CREATE DATABASE koss;

USE koss;

/* Users table */

CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    firstName varchar(20) NOT NULL,
    lastName varchar(20) NOT NULL,
    email varchar(50),
    password varchar(20) NOT NULL,
    phoneNumber REAL NOT NULL,
    profileImage varchar(20) NOT NULL,
    PRIMARY KEY (ID)
);

/* events table */

CREATE TABLE events (
    id int NOT NULL AUTO_INCREMENT,
    homeTeam varchar(20) NOT NULL,
    awayTeam varchar(20) NOT NULL,
    place varchar(20) NOT NULL,
    category varchar(20) NOT NULL,
    date varchar(20) NOT NULL,
    description varchar(20) NOT NULL,
     PRIMARY KEY(ID)
);

/* purchases table */

CREATE TABLE purchases(
    id int NOT NULL AUTO_INCREMENT,
    code REAL NOT NULL,
    date varchar(20) NOT NULL,
    ammount REAL NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY(ID),
    CONSTRAINT FK_IDuser FOREIGN KEY (user_id) References users(id)
);

/* seats table */

CREATE TABLE seats(
    id int NOT NULL AUTO_INCREMENT,
    Number REAL NOT NULL,
    type varchar(20) NOT NULL,
    availability varchar(20) NOT NULL,
    PRIMARY KEY(ID)
);

/* tickets table */

CREATE TABLE tickets(
    id int NOT NULL AUTO_INCREMENT,
    code REAL NOT NULL,
    event_id int NOT NULL,
    user_id int NOT NULL,
    purchase_id int NOT NULL,
    seat_id int NOT NULL,
    PRIMARY KEY(ID),
    CONSTRAINT FK_eventID FOREIGN KEY (event_id) References events(id),
    CONSTRAINT FK_userID FOREIGN KEY (user_id) References users(id),
    CONSTRAINT FK_purchaseID FOREIGN KEY (purchase_id) References purchases(id),
    CONSTRAINT FK_seatID FOREIGN KEY (seat_id) References seats(id)
);

INSERT INTO events(id,homeTeam,awayTeam,place,category,date,description) VALUES(1,'css','ess','sfax','championship','12/01/2020','championship')


