CREATE TABLE IF NOT EXISTS user (
  user_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  credit_balance DOUBLE NULL,
  password VARCHAR(256) NULL ,
  PRIMARY KEY (user_id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS cash_kick (
  cash_kick_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  status ENUM("pending", "approved") NULL,
  maturity DATETIME NULL,
  total_received DOUBLE NULL,
  total_financed DOUBLE NULL,
  rate INT NULL,
  user_id INT NOT NULL,
  created_date DATE NULL,
  updated_date DATE NULL,
  PRIMARY KEY (cash_kick_id, user_id),
  INDEX fk_cash_kick_user1_idx (user_id ASC) VISIBLE,
  CONSTRAINT fk_cash_kick_user1
    FOREIGN KEY (user_id)
    REFERENCES user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS contract (
  contract_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  type VARCHAR(45) NULL,
  per_payment DOUBLE NULL,
  term_length INT NULL,
  payment_amount DOUBLE NULL,
  PRIMARY KEY (contract_id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS cashkick_contract (
  cash_contract_id INT NOT NULL AUTO_INCREMENT,
  contract_id INT NOT NULL,
  cash_kick_id INT NOT NULL,
  payment_amount DOUBLE NULL,
  PRIMARY KEY (cash_contract_id, contract_id, cash_kick_id),
  INDEX fk_cashkick_contract_contract1_idx (contract_id ASC) VISIBLE,
  INDEX fk_cashkick_contract_cash_kick1_idx (cash_kick_id ASC) VISIBLE,
  CONSTRAINT fk_cashkick_contract_contract1
    FOREIGN KEY (contract_id)
    REFERENCES contract (contract_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_cashkick_contract_cash_kick1
    FOREIGN KEY (cash_kick_id)
    REFERENCES cash_kick (cash_kick_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS payment (
                                         payment_id INT NOT NULL AUTO_INCREMENT,
                                         status VARCHAR(45) NULL,
    due_date DATETIME NULL,
    expected_amount DOUBLE NULL,
    outstanding_amount DOUBLE NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (payment_id, user_id),
    INDEX fk_payment_user1_idx (user_id ASC) VISIBLE,
    CONSTRAINT fk_payment_user1
    FOREIGN KEY (user_id)
    REFERENCES user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;
