DROP DATABASE IF EXISTS bronco;
CREATE DATABASE bronco;
USE bronco;

CREATE TABLE account (
    handler VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    account_type VARCHAR(255) NOT NULL,
    balance INT NOT NULL,
    spending_limit INT NOT NULL,
    creation TIMESTAMP
);

INSERT INTO account (handler, email, account_type, balance, spending_limit) VALUES
('test1', 'test1@gmail.com', 'PERSONAL', 123, 10),
('test2', 'test2@gmail.com', 'PERSONAL', 143, 7),
('test3', 'test3@gmail.com', 'PERSONAL', 200, 140),
('test4', 'test4@gmail.com', 'BUSINESS', 0, 11),
('test5', 'test5@gmail.com', 'PERSONAL', 334, 23);