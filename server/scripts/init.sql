DROP DATABASE IF EXISTS bronco;
CREATE DATABASE bronco;
USE bronco;

CREATE TABLE accounts (
    handler VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    account_type ENUM('PERSONAL', 'BUSINESS') NOT NULL,
    balance INT NOT NULL,
    spending_limit INT NOT NULL,
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    to_handler VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    transaction_desc VARCHAR(255),
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (from_handler) REFERENCES accounts(handler),
    FOREIGN KEY (to_handler) REFERENCES accounts(handler)
);

CREATE TABLE subscriptions (
    subscription_id INT NOT NULL AUTO_INCREMENT,
    from_handler VARCHAR(255) NOT NULL,
    to_handler VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    subscription_interval INT NOT NULL,
    subscription_desc VARCHAR(255),
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (subscription_id),
    FOREIGN KEY (from_handler) REFERENCES accounts(handler) ON DELETE CASCADE,
    FOREIGN KEY (to_handler) REFERENCES accounts(handler) ON DELETE CASCADE
);

CREATE TABLE businesses (
    handler VARCHAR(255),
    PRIMARY KEY (handler),
    FOREIGN KEY (handler) REFERENCES accounts(handler) ON DELETE CASCADE
);

INSERT INTO accounts (handler, email, account_type, balance, spending_limit) VALUES
('test1', 'test1@gmail.com', 'PERSONAL', 123, 10),
('test2', 'test2@gmail.com', 'PERSONAL', 143, 7),
('test3', 'test3@gmail.com', 'PERSONAL', 200, 140),
('test4', 'test4@gmail.com', 'BUSINESS', 0, 11),
('test5', 'test5@gmail.com', 'PERSONAL', 334, 23);

INSERT INTO transactions (from_handler, to_handler, amount, transaction_desc) VALUES
('test1', 'test2', 123, 'money'),
('test3', 'test2', 333, 'money2'),
('test1', 'test2', 1, 'mone3'),
('test4', 'test5', 235, 'mone4y'),
('test1', 'test2', 78, 'mon6ey');