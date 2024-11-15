CREATE TABLE accounts (
    handler VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    account_type ENUM('customer', 'business') NOT NULL,
    balance INT NOT NULL,
    spending_limit INT NOT NULL,
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email),
    PRIMARY KEY (handler)
);


CREATE TABLE AccountDetails (
    handler VARCHAR(255),
    name VARCHAR(255),
    dob DATE,
    description TEXT,
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
    FOREIGN KEY (from_handler) REFERENCES accounts(handler),
    FOREIGN KEY (to_handler) REFERENCES accounts(handler)
);