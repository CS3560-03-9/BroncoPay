DROP DATABASE IF EXISTS bronco;
CREATE DATABASE bronco;
USE bronco;

CREATE TABLE accounts (
    handler VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance INT NOT NULL,
    monthly_spent INT NOT NULL,
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

INSERT INTO accounts (handler, email, password, balance, monthly_spent, spending_limit) VALUES
('consumera', 'consumera@gmail.com', '$2b$10$bSPgtO.JCQwFOKol8Scvw.p5e13vTHYQqC4YowJ7bDozIjhthcBHK', 123, 1, 10),
('consumerb', 'consumerb@gmail.com', '$2b$10$dWkROd/5MHoVZJxNI4w3WeTM9rWAOd8QE2peN3eKOJkzHykdfJGY6', 143, 2, 7),
('gym', 'gym@gmail.com', '$2b$10$J63TJgqZwwE.TfQdeAgdou952uk6nyx0jASMqFuwggnra/I2hKRyS', 200, 3, 140),
('disney', 'disney@gmail.com', '$2b$10$pr9kMv0t.kEwjBlCJxUVIea1XtoWrMe9gWuwarBYvMdy74LqAe2Om', 0, 4, 11),
('consumerc', 'consumerc@gmail.com', '$2b$10$pr9kMv0t.kEwjBlCJxUVIea1XtoWrMe9gWuwarBYvMdy74LqAe2Om', 334, 5, 23);

INSERT INTO account_details (handler, display_name, dob, account_desc) VALUES
('consumera', 'consumera', '1990-01-01', 'consumera'),
('consumerb', 'consumerb', '1990-01-01', 'consumerb'),
('gym', 'gym', '1990-01-01', 'gym'),
('disney', 'disney', '1990-01-01', 'disney'),
('consumerc', 'consumerc', '1990-01-01', 'consumerc');

INSERT INTO transactions (from_handler, to_handler, amount, transaction_desc, transaction_type) VALUES
('consumera', 'consumerb', 123, 'money', "TRANSACTION"),
('gym', 'consumerb', 333, 'money2', "TRANSACTION"),
('consumera', 'consumerb', 1, 'mone3', "TRANSACTION"),
('disney', 'consumerc', 235, 'mone4y', "TRANSACTION"),
('consumera', 'consumerb', 78, 'mon6ey', "TRANSACTION");

INSERT INTO businesses (handler) VALUES
('gym'),
('disney');

INSERT INTO pledges (handler, cost, pledge_interval, pledge_desc) VALUES
('gym', 100, 30, 'Tier 1 Membership'),
('gym', 200, 30, 'Tier 2 Membership'),
('gym', 300, 30, 'Tier 3 Membership'),
('disney', 10, 30, 'Disney+ Subscription with Ads'),
('disney', 15, 30, 'Disney+ Subscription without Ads');

INSERT INTO subscriptions (handler, pledge_id) VALUES
('consumera', 1),
('consumerb', 1),
('consumerc', 2),
('consumera', 2),
('consumerc', 3),
('consumera', 4),
('consumerb', 4),
('consumerc', 5),
('consumera', 5),
('consumerc', 1);