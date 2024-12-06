const db = require('../utils/db');

getAllAccounts = async (req, res) => {
 try {
    const accounts = await db.query(
        "SELECT handler, email, balance, spending_limit FROM `accounts`"
    );
    return res.status(200).json({
      status: "success",
      data: {
        accounts: accounts,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
getHandlerAccount = async (req, res) => {
  const { handler } = req.params;
  if (!handler) {
    return res.status(400).json({
      status: "fail",
      data: {
        handler: "Handler is missing",
      },
    });
  }
  try {
    const account = await db.query(
      "SELECT handler, email, balance, spending_limit FROM `accounts` WHERE `handler` = ?",
      [handler]
    );
    if (account.length === 0) {
      return res.status(404).json({
        status: "fail",
        data: {
          handler: "Account not found",
        },
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        account: account,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

updateSpendingLimit = async (req, res) => {
  const { handler } = req.params;
  limit = req.body.spendingLimit;

  limit = parseFloat(limit);

  if (!handler) {
    return res.status(400).json({
      status: "fail",
      data: {
        handler: "Handler is missing",
      },
    });
  }

  try {
    const account = await db.query(
      "SELECT * FROM `accounts` WHERE `handler` = ?",
      [handler]
    );
    if (account.length === 0) {
      return res.status(404).json({
        status: "fail",
        data: {
          handler: "Account not found",
        },
      });
    }

    if (!isNaN(limit) && isFinite(limit)) {
      const limitTest = await db.query(
        "UPDATE `accounts` SET `spending_limit` = ? WHERE `handler` = ?",
        [limit, handler]
      );

      return res.status(200).json({
        status: "success",
        data: {
          handler: "Spending limit updated",
        },
      });
    } else {
      return res.status(400).json({
        status: "fail",
        data: {
          handler: "Invalid Limit",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

deleteAccount = async (req, res) => {
  const { handler } = req.params;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!handler) {
    return res.status(400).json({
      status: "fail",
      data: {
        handler: "handler is missing",
      },
    });
  }

  try {
    const deletion = await db.query(
      "DELETE FROM `accounts` WHERE `handler` = ?",
      [handler]
    );
    return res.status(204).json({
      status: "success",
      data: "Account Deletion Successful",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

resetMonthlySpent = async (req, res) => {
  const { handler } = req.params;
  if (!handler) {
    return res.status(400).json({
      status: "fail",
      data: {
        handler: "handler is missing",
      },
    });
  }
  try {
    await db.query(
        'UPDATE `accounts` SET `monthly_spent` = 0 WHERE `handler` = ?',
        [handler]
    );
    return res.status(204).json({
      status: "success",
      data: "monthly spent reset successful",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

async function changeBalance(handler, amount) {
    return await db.query(
        'UPDATE `accounts` SET `balance` = `balance` + ? WHERE `handler` = ?',
        [amount, handler]
    );
}

async function changeMonthlySpent(handler, amount) {
  return await db.query(
      'UPDATE `accounts` SET `monthly_spent` = `monthly_spent` + ? WHERE `handler` = ?',
      [amount, handler]
  );
}

async function existingAccount(handler, email) {
    let query = "SELECT * FROM 'accounts' WHERE ";
    const params = [];

    if (email) {
        query += "`email` = ?";
        params.push(email);
    }

    if (handler) {
        if (email) query += " OR ";
        query += "`handler` = ?";
        params.push(handler);
    }

    return await db.query(
        query,
        params
    );
}

async function getAccountByHandler(handler) {
  return await db.query(
      "SELECT handler, email, balance, spending_limit FROM `accounts` WHERE `handler` = ?",
      [handler]
  ); 
}

async function accountExists(handler) {
    return await db.query(
      "SELECT * FROM `accounts` WHERE `handler` = ?",
      [handler]
    );
}

module.exports = {
  getAllAccounts,
  getHandlerAccount,
  updateSpendingLimit,
  deleteAccount,
  getAccountByHandler,
  changeBalance,
  accountExists,
  changeMonthlySpent,
  resetMonthlySpent
};
