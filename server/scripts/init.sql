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