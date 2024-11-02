class User {
    constructor(userID, name, email, role) {
        // Initialize a user with ID, name, email, and role.
        this.userID = userID;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

class Account {
    constructor(accountID, userID, balance) {
        // Initialize an account with ID, linked user ID, and balance.
        this.accountID = accountID;
        this.userID = userID;
        this.balance = balance;
    }

    updateBalance(amount) {
        // Update the account balance based on transactions.
        // Implementation goes here
    }
}

class Transaction {
    constructor(
        transactionID,
        fromAccountID,
        toAccountID,
        amount,
        date,
        transactionType,
        description
    ) {
        // Initialize a transaction with details including from and to account IDs, amount, date, type, and description.
        this.transactionID = transactionID;
        this.fromAccountID = fromAccountID;
        this.toAccountID = toAccountID;
        this.amount = amount;
        this.date = date;
        this.transactionType = transactionType;
        this.description = description;
    }

    processTransaction() {
        // Process the transaction between accounts.
        // Implementation goes here
    }
}

class ScheduledPayment {
    constructor(
        scheduledPaymentID,
        fromAccountID,
        toAccountID,
        amount,
        frequency,
        startDate,
        endDate,
        nextPaymentDate,
        description
    ) {
        // Initialize a scheduled payment with details including frequency and next payment date.
        this.scheduledPaymentID = scheduledPaymentID;
        this.fromAccountID = fromAccountID;
        this.toAccountID = toAccountID;
        this.amount = amount;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.nextPaymentDate = nextPaymentDate;
        this.description = description;
    }

    scheduleNextPayment() {
        // Calculate and schedule the next payment date based on frequency.
        // Implementation goes here
    }
}

class Bill {
    constructor(
        billID,
        accountID,
        amountDue,
        dueDate,
        status,
        issuer,
        description
    ) {
        // Initialize a bill with details including amount due, due date, and issuer.
        this.billID = billID;
        this.accountID = accountID;
        this.amountDue = amountDue;
        this.dueDate = dueDate;
        this.status = status;
        this.issuer = issuer;
        this.description = description;
    }

    payBill(amount) {
        // Mark the bill as paid if the amount matches the due amount.
        // Implementation goes here
    }
}