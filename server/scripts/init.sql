DROP DATABASE IF EXISTS bronco;
CREATE DATABASE bronco;
USE bronco;

CREATE TABLE accounts (
    handler VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance INT NOT NULL,
    spending_limit INT NOT NULL,
    UNIQUE (email),
    PRIMARY KEY (handler)
);

CREATE TABLE account_details (
    handler VARCHAR(255),
    display_name VARCHAR(255),
    dob DATE,
    account_desc VARCHAR(255),
    PRIMARY KEY (handler),
    FOREIGN KEY (handler) REFERENCES accounts(handler) ON DELETE CASCADE
);

CREATE TABLE transactions (
    transaction_id INT NOT NULL AUTO_INCREMENT,
    from_handler VARCHAR(255) NOT NULL,
    to_handler VARCHAR(255),
    amount INT NOT NULL,
    transaction_desc VARCHAR(255),
    transaction_type VARCHAR(255),
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (from_handler) REFERENCES accounts(handler),
    FOREIGN KEY (to_handler) REFERENCES accounts(handler)
);

CREATE TABLE businesses (
    handler VARCHAR(255),
    PRIMARY KEY (handler),
    FOREIGN KEY (handler) REFERENCES accounts(handler) ON DELETE CASCADE
);

CREATE TABLE pledges (
    pledge_id INT NOT NULL AUTO_INCREMENT,
    handler VARCHAR(255) NOT NULL,
    cost INT NOT NULL,
    pledge_interval INT NOT NULL,
    pledge_desc VARCHAR(255),
    PRIMARY KEY (pledge_id),
    FOREIGN KEY (handler) REFERENCES businesses(handler) ON DELETE CASCADE
);

CREATE TABLE subscriptions (
    subscription_id INT NOT NULL AUTO_INCREMENT,
    handler VARCHAR(255) NOT NULL,
    pledge_id INT NOT NULL,
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (subscription_id),
    FOREIGN KEY (handler) REFERENCES accounts(handler) ON DELETE CASCADE,
    FOREIGN KEY (pledge_id) REFERENCES pledges(pledge_id) ON DELETE CASCADE
);

INSERT INTO accounts (handler, email, password, balance, spending_limit) VALUES
('test1', 'test1@gmail.com', '$2b$10$bSPgtO.JCQwFOKol8Scvw.p5e13vTHYQqC4YowJ7bDozIjhthcBHK', 123, 10),
('test2', 'test2@gmail.com', '$2b$10$dWkROd/5MHoVZJxNI4w3WeTM9rWAOd8QE2peN3eKOJkzHykdfJGY6', 143, 7),
('test3', 'test3@gmail.com', '$2b$10$J63TJgqZwwE.TfQdeAgdou952uk6nyx0jASMqFuwggnra/I2hKRyS', 200, 140),
('test4', 'test4@gmail.com', '$2b$10$pr9kMv0t.kEwjBlCJxUVIea1XtoWrMe9gWuwarBYvMdy74LqAe2Om', 0, 11),
('test5', 'test5@gmail.com', '$2b$10$pr9kMv0t.kEwjBlCJxUVIea1XtoWrMe9gWuwarBYvMdy74LqAe2Om', 334, 23);

INSERT INTO transactions (from_handler, to_handler, amount, transaction_desc, transaction_type) VALUES
('test1', 'test2', 123, 'money', "TRANSACTION"),
('test3', 'test2', 333, 'money2', "TRANSACTION"),
('test1', 'test2', 1, 'mone3', "TRANSACTION"),
('test4', 'test5', 235, 'mone4y', "TRANSACTION"),
('test1', 'test2', 78, 'mon6ey', "TRANSACTION");

INSERT INTO businesses (handler) VALUES
('test3'),
('test4');

INSERT INTO pledges (handler, cost, pledge_interval, pledge_desc) VALUES
('test3', 100, 30, 'pledge1'),
('test3', 200, 30, 'pledge2'),
('test3', 300, 30, 'pledge3'),
('test4', 400, 30, 'pledge1'),
('test4', 500, 30, 'pledge2');

INSERT INTO subscriptions (handler, pledge_id) VALUES
('test1', 1),
('test1', 2),
('test1', 3),
('test2', 1),
('test2', 4),
('test2', 5),
('test5', 1),
('test5', 5);
