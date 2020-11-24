DROP DATABASE IF EXISTS koss;

CREATE DATABASE koss;

USE koss;

/* Users table */

CREATE TABLE users
(
    id int NOT NULL
    AUTO_INCREMENT,
    firstName varchar
    (20) NOT NULL,
    lastName varchar
    (20) NOT NULL,
    email varchar
    (50),
    password varchar
    (220) NOT NULL,
    phoneNumber REAL NOT NULL,
    profileImage varchar
    (100) NOT NULL,
    PRIMARY KEY
    (ID)
);

    /* admins table */

    CREATE TABLE admins
    (
        id int NOT NULL
        AUTO_INCREMENT,
    firstName varchar
        (20) NOT NULL,
    lastName varchar
        (20) NOT NULL,
    email varchar
        (250),
    password varchar
        (220) NOT NULL,
    PRIMARY KEY
        (ID)
);

        /* third Parties table */

        CREATE TABLE thirdp
        (
            id int NOT NULL
            AUTO_INCREMENT,
    identifier varchar
            (50),
    password varchar
            (220) NOT NULL,
    PRIMARY KEY
            (ID)
);

            /* events table */

            CREATE TABLE events
            (
                id int NOT NULL
                AUTO_INCREMENT,
    homeTeam varchar
                (20) NOT NULL,
    awayTeam varchar
                (20) NOT NULL,
    place varchar
                (20) NOT NULL,
    category varchar
                (20) NOT NULL,
    date varchar
                (20) NOT NULL,
    description varchar
                (200) NOT NULL,
    price REAL NOT NULL,
    image varchar
                (200),
    PRIMARY KEY
                (ID)
);

                /* purchases table */

                CREATE TABLE purchases
                (
                    id int NOT NULL
                    AUTO_INCREMENT,
    code varchar
                    (200) NOT NULL,
    date varchar
                    (20) NOT NULL,
    ammount REAL NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY
                    (ID),
    CONSTRAINT FK_IDuser FOREIGN KEY
                    (user_id) References users
                    (id)
);

                    /* seats table */

                    CREATE TABLE seats
                    (
                        id int NOT NULL
                        AUTO_INCREMENT,
    Number REAL NOT NULL,
    type varchar
                        (20) NOT NULL,
    availability varchar
                        (20) NOT NULL,
    userid int,
    matchid int,
    PRIMARY KEY
                        (ID),
    CONSTRAINT FK_useriD FOREIGN KEY
                        (userid) References users
                        (id),
    CONSTRAINT FK_event_id FOREIGN KEY
                        (matchid) References events
                        (id)

);

                        /* tickets table */

                        -- CREATE TABLE tickets(
                        --     id int NOT NULL AUTO_INCREMENT,
                        --     code REAL NOT NULL,
                        --     event_id int NOT NULL,
                        --     user_id int NOT NULL,
                        --     purchase_id int NOT NULL,
                        --     seat_id int NOT NULL,
                        --     PRIMARY KEY(ID),
                        --     CONSTRAINT FK_eventID FOREIGN KEY (event_id) References events(id),
                        --     CONSTRAINT FK_userID FOREIGN KEY (user_id) References users(id),
                        --     CONSTRAINT FK_purchaseID FOREIGN KEY (purchase_id) References purchases(id),
                        --     CONSTRAINT FK_seatID FOREIGN KEY (seat_id) References seats(id)
                        -- );

                        /* Refresh Tokens */

                        CREATE TABLE tokens
                        (
                            id int NOT NULL
                            AUTO_INCREMENT,
    token varchar
                            (220) NOT NULL,
    id_user  int NOT NULL,
    PRIMARY KEY
                            (ID),
    CONSTRAINT FK_useID FOREIGN KEY
                            (id_user) References users
                            (id)

);

                            /* weekly qr Codes */

                            CREATE TABLE weekCodes
                            (
                                id int NOT NULL
                                AUTO_INCREMENT,
    codes varchar
                                (220) NOT NULL,
    PRIMARY KEY
                                (ID)
    
);

                                CREATE TABLE messages
                                (
                                    id int NOT NULL
                                    AUTO_INCREMENT,
    message varchar
                                    (220),
    PRIMARY KEY
                                    (ID)
);



                                    INSERT INTO users
                                        (id,firstName,lastName,email,password,phoneNumber,profileImage)
                                    VALUES(1, 'Elyes', 'Ferjani', 'elyes@rbk.com', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u', '11111', 'url:image/profile.jpg');
                                    INSERT INTO users
                                        (id,firstName,lastName,email,password,phoneNumber,profileImage)
                                    VALUES(2, 'Ali', 'Smaoui', 'ali@rbk.com', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u', '22222', 'url:image/profile.jpg');
                                    INSERT INTO users
                                        (id,firstName,lastName,email,password,phoneNumber,profileImage)
                                    VALUES(3, 'Omar', 'Chaouachi', 'omar@rbk.com', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u', '33333', 'url:image/profile.jpg');
                                    INSERT INTO users
                                        (id,firstName,lastName,email,password,phoneNumber,profileImage)
                                    VALUES(4, 'Skander', 'Bromdhan', 'skander@rbk.com', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u', '44444', 'url:image/profile.jpg');
                                    INSERT INTO events
                                        (id,homeTeam,awayTeam,place,category,date,description,price,image)
                                    VALUES(1, 'css', 'ess', 'sfax', 'championship', '12/01/2020', 'championship', 17, 'https://content.mosaiquefm.net/uploads/content/thumbnails/ess_ca_1513453495.jpg');
                                    INSERT INTO events
                                        (id,homeTeam,awayTeam,place,category,date,description,price,image)
                                    VALUES(2, 'css', 'ess', 'sfax', 'championship', '12/01/2020', 'championship', 17, 'https://content.mosaiquefm.net/uploads/content/thumbnails/ess_ca_1513453495.jpg');
                                    INSERT INTO events
                                        (id,homeTeam,awayTeam,place,category,date,description,price,image)
                                    VALUES(3, 'css', 'ess', 'sfax', 'championship', '12/01/2020', 'championship', 17, 'https://content.mosaiquefm.net/uploads/content/thumbnails/ess_ca_1513453495.jpg');
                                    INSERT INTO thirdp
                                        (id,identifier,password)
                                    VALUES(1, '00002', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u');
                                    INSERT INTO weekCodes
                                        (id,codes)
                                    VALUES(1, 'Rbk6');
                                    INSERT INTO admins
                                        (id,firstName,lastName,email,password)
                                    VALUES(1, 'Elyes', 'Ferjani', 'elyes@rbk.com', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u');
                                    INSERT INTO admins
                                        (id,firstName,lastName,email,password)
                                    VALUES(2, 'Omar', 'Chaouachi', 'omar@rbk.com', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u');
                                    INSERT INTO admins
                                        (id,firstName,lastName,email,password)
                                    VALUES(3, 'Ali', 'Smaoui', 'ali@rbk.com', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u');
                                    INSERT INTO admins
                                        (id,firstName,lastName,email,password)
                                    VALUES(4, 'Skander', 'Bromdhan', 'skander@rbk.com', '$2b$10$beYHqloL2DWfegZfkBNazuzQJDHT1PX/l.y94Fa60mF4TcSR7CR1u');
                                    INSERT INTO messages
                                        (id,message)
                                    VALUES(1, 'Welcome to admins platform');
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(1, 101, 'pelouse', 'true', null, 1);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(2, 102, 'gradin', 'false', 1, 1);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(3, 103, 'pelouse', 'true', NULL, 1);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(4, 104, 'pelouse', 'true', NULL, 1);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(5, 105, 'pelouse', 'true', NULL, 2);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(6, 106, 'gradin', 'true', NULL, 2);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(7, 107, 'pelouse', 'false', 2, 2);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(8, 108, 'gradin', 'true', NULL, 3);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(9, 109, 'pelouse', 'true', NULL, 3);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(10, 110, 'pelouse', 'true', NULL, 3);
                                    INSERT INTO seats
                                        (id,number,type,availability,userid,matchid)
                                    VALUES(11, 111, 'gradin', 'true', NULL, 3); 

