const {validationResult} = require('express-validator');

const db = require("../utils/db");
const accountsController = require("../controllers/accounts");

getAccountTransactions = async (req, res) => {
  try {
    const {handler} = req.params;
    if (handler === undefined) {
      return res.status(400).json({
            status: 'fail',
            data: {
                handler: 'handler is missing',
            },
        });
    }

    const transactions = await getTransactionsByAccount(handler);
    res.status(200).json({
      status: 'success',
      data: {
          transactions: transactions,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

createTransaction = async (req, res) => {
  try {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            data: validation.array(),
        });
    }

    const {fromHandler, toHandler, amount, description} = req.body;

    const fromAccount = await accountsController.getAccountByHandler(fromHandler);
    const toAccountExists = await accountsController.accountExists(toHandler);
    if (fromAccount.length === 0 || toAccountExists === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'account(s) does not exist',
      });
    }
    if (amount > fromAccount[0].spending_limit) {
      return res.status(400).json({
        status: 'fail',
        message: 'amount is greater than spending limit',
      });
    }
    if (amount > fromAccount[0].balance) {
      return res.status(400).json({
        status: 'fail',
        message: 'amount is greater than balance',
      });
    }
    await accountsController.changeBalance(fromHandler, -amount);
    await accountsController.changeBalance(toHandler, amount);

    await db.query(
      "INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`, `transaction_type`) VALUES (?, ?, ?, ?, ?)",
      [
        fromHandler,
        toHandler,
        amount,
        description,
        "TRANSACTION",
      ]
    );

    return res.status(200).json({
        status: 'succuss',
        message: 'Transaction complete!',
    });

  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

createDeposit = async (req, res) => {
  try {
    const {handler, amount, description} = req.body;

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return res.status(400).json({
          status: 'fail',
          data: validation.array(),
      });
    }

    const account = await accountsController.getAccountByHandler(handler);
    if (account.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Account does not exist',
      });
    }

    await accountsController.changeBalance(handler, amount);

    await db.query(
    "INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`, `transaction_type`) VALUES (?, ?, ?, ?, ?)",
    [handler, null, amount, description, "DEPOSIT"]
    );

    return res.status(200).json({
      status: 'success',
      message: 'Deposit created successfully',
    });

  } catch(err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

createWithdraw = async (req, res) => {
  try {
    const {handler, amount, description} = req.body;
    
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return res.status(400).json({
          status: 'fail',
          data: validation.array(),
      });
    }

    const account = await accountsController.getAccountByHandler(handler);
    if (account.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Account does not exist',
      });
    }

    if (amount > account[0].balance) {
      return res.status(400).json({
        status: 'fail',
        message: 'Ammount is greater than balance',
      });
    }

    await accountsController.changeBalance(handler, -amount);

    await db.query(
      "INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`, `transaction_type`) VALUES (?, ?, ?, ?, ?)",
      [handler, null, amount, description, "WITHDRAW"]
    );

    res.status(200).json({
      status: 'success',
      message: 'Withdraw Complete',
    });
  } catch(err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
}

async function getTransactionsByAccount(handler) {
  return await db.query(
    "SELECT * FROM `transactions` WHERE `from_handler` = ? OR `to_handler` = ? ORDER BY `creation` DESC",
    [handler, handler]
  );
}

module.exports = {
  getAccountTransactions,
  getTransactionsByAccount,
  createTransaction,
  createDeposit,
  createWithdraw,
};
