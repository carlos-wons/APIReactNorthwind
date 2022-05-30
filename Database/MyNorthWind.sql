-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema MyNwind
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema MyNwind
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MyNwind` DEFAULT CHARACTER SET utf8 ;
USE `MyNwind` ;

-- -----------------------------------------------------
-- Table `MyNwind`.`companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`companies` (
  `CompanyID` INT NOT NULL AUTO_INCREMENT,
  `CompanyName` VARCHAR(70) NOT NULL,
  `AccountEmail` VARCHAR(100) NOT NULL,
  `Password` VARCHAR(40) NOT NULL,
  `BeginPlan` DATE NOT NULL,
  `EndPlan` DATE NOT NULL,
  `Active` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`CompanyID`),
  UNIQUE INDEX `AccountEmail_UNIQUE` (`AccountEmail` ASC) VISIBLE,
  UNIQUE INDEX `CompanyName_UNIQUE` (`CompanyName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyNwind`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`employees` (
  `EmployeeID` INT(11) NOT NULL AUTO_INCREMENT,
  `LastName` VARCHAR(10) NOT NULL,
  `FirstName` VARCHAR(10) NULL DEFAULT NULL,
  `HireDate` DATETIME NULL DEFAULT NULL,
  `Address` VARCHAR(60) NULL DEFAULT NULL,
  `HomePhone` VARCHAR(24) NULL DEFAULT NULL,
  `ReportsTo` INT(11) NULL DEFAULT NULL,
  `Email` VARCHAR(100) NULL DEFAULT NULL,
  `Password` VARCHAR(40) NULL DEFAULT NULL,
  `CompanyID` INT NOT NULL,
  PRIMARY KEY (`EmployeeID`),
  INDEX `fk_employees_employees_idx` (`ReportsTo` ASC) VISIBLE,
  INDEX `fk_employees_companies1_idx` (`CompanyID` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  CONSTRAINT `fk_employees_employees`
    FOREIGN KEY (`ReportsTo`)
    REFERENCES `MyNwind`.`employees` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employees_companies1`
    FOREIGN KEY (`CompanyID`)
    REFERENCES `MyNwind`.`companies` (`CompanyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyNwind`.`warehouses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`warehouses` (
  `WarehouseID` INT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(100) NULL,
  `CompanyID` INT NOT NULL,
  PRIMARY KEY (`WarehouseID`),
  INDEX `fk_warehouses_companies1_idx` (`CompanyID` ASC) VISIBLE,
  CONSTRAINT `fk_warehouses_companies1`
    FOREIGN KEY (`CompanyID`)
    REFERENCES `MyNwind`.`companies` (`CompanyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyNwind`.`suppliers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`suppliers` (
  `SupplierID` INT(11) NOT NULL,
  `CompanyName` VARCHAR(40) NOT NULL,
  `ContactName` VARCHAR(30) NULL DEFAULT NULL,
  `Address` VARCHAR(60) NULL DEFAULT NULL,
  `City` VARCHAR(15) NULL DEFAULT NULL,
  `PostalCode` VARCHAR(10) NULL DEFAULT NULL,
  `Country` VARCHAR(15) NULL DEFAULT NULL,
  `Phone` VARCHAR(24) NULL DEFAULT NULL,
  `CompanyID` INT NOT NULL,
  PRIMARY KEY (`SupplierID`),
  INDEX `fk_suppliers_companies1_idx` (`CompanyID` ASC) VISIBLE,
  CONSTRAINT `fk_suppliers_companies1`
    FOREIGN KEY (`CompanyID`)
    REFERENCES `MyNwind`.`companies` (`CompanyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyNwind`.`movements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`movements` (
  `MovementID` INT NOT NULL AUTO_INCREMENT,
  `Date` DATETIME NOT NULL,
  `SupplierID` INT NULL COMMENT 'Solo aplica para los movimientos de entrada por compra.',
  `SourceWarehouseID` INT NOT NULL COMMENT 'Almacén al que refiere el movimiento.',
  `TargetWarehouseID` INT NULL COMMENT 'Representa el almacén de destino en el caso de ser un movimiento por traspaso.',
  `Type` ENUM('COMPRA', 'TRASPASO', 'AJUSTE', 'VENTA') NOT NULL,
  `Notes` VARCHAR(200) NULL COMMENT 'Es obligatorio en caso de los movimientos por ajuste, es posible que para algún otro movimiento se use este campo para capturar algún comentario u observación importante.',
  `CompanyID` INT NOT NULL,
  `EmployeeID` INT(11) NOT NULL,
  PRIMARY KEY (`MovementID`),
  INDEX `fk_movements_warehouses1_idx` (`SourceWarehouseID` ASC) VISIBLE,
  INDEX `fk_movements_warehouses2_idx` (`TargetWarehouseID` ASC) VISIBLE,
  INDEX `fk_movements_companies1_idx` (`CompanyID` ASC) VISIBLE,
  INDEX `fk_movements_suppliers1_idx` (`SupplierID` ASC) VISIBLE,
  INDEX `fk_movements_employees1_idx` (`EmployeeID` ASC) VISIBLE,
  CONSTRAINT `fk_movements_warehouses1`
    FOREIGN KEY (`SourceWarehouseID`)
    REFERENCES `MyNwind`.`warehouses` (`WarehouseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movements_warehouses2`
    FOREIGN KEY (`TargetWarehouseID`)
    REFERENCES `MyNwind`.`warehouses` (`WarehouseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movements_companies1`
    FOREIGN KEY (`CompanyID`)
    REFERENCES `MyNwind`.`companies` (`CompanyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movements_suppliers1`
    FOREIGN KEY (`SupplierID`)
    REFERENCES `MyNwind`.`suppliers` (`SupplierID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movements_employees1`
    FOREIGN KEY (`EmployeeID`)
    REFERENCES `MyNwind`.`employees` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyNwind`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`categories` (
  `CategoryID` INT(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` VARCHAR(15) NOT NULL,
  `Description` LONGTEXT NULL,
  `Picture` LONGBLOB NULL,
  `CompanyID` INT NOT NULL,
  PRIMARY KEY (`CategoryID`),
  INDEX `fk_categories_companies1_idx` (`CompanyID` ASC) VISIBLE,
  CONSTRAINT `fk_categories_companies1`
    FOREIGN KEY (`CompanyID`)
    REFERENCES `MyNwind`.`companies` (`CompanyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyNwind`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`products` (
  `ProductID` INT(11) NOT NULL,
  `ProductName` VARCHAR(40) NOT NULL,
  `SupplierID` INT NULL DEFAULT NULL,
  `CategoryID` INT(11) NULL DEFAULT NULL,
  `QuantityPerUnit` VARCHAR(20) NULL DEFAULT NULL,
  `UnitPrice` DOUBLE NULL DEFAULT 0,
  `PhotoPath` VARCHAR(50) NULL DEFAULT NULL,
  `CompanyID` INT NOT NULL,
  PRIMARY KEY (`ProductID`),
  INDEX `fk_products_categories1_idx` (`CategoryID` ASC) VISIBLE,
  INDEX `fk_products_suppliers1_idx` (`SupplierID` ASC) VISIBLE,
  INDEX `fk_products_companies1_idx` (`CompanyID` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `MyNwind`.`categories` (`CategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_suppliers1`
    FOREIGN KEY (`SupplierID`)
    REFERENCES `MyNwind`.`suppliers` (`SupplierID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_companies1`
    FOREIGN KEY (`CompanyID`)
    REFERENCES `MyNwind`.`companies` (`CompanyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyNwind`.`warehouseproduct`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`warehouseproduct` (
  `WarehouseID` INT NOT NULL,
  `ProductID` INT NOT NULL,
  `UnitsInStock` SMALLINT NOT NULL DEFAULT 0,
  `UnitsOnOrder` SMALLINT NOT NULL DEFAULT 0,
  `ReorderLevel` SMALLINT NOT NULL DEFAULT 0,
  `Discontinued` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`WarehouseID`, `ProductID`),
  INDEX `fk_warehouseproduct_warehouses1_idx` (`WarehouseID` ASC) VISIBLE,
  INDEX `fk_warehouseproduct_products1_idx` (`ProductID` ASC) VISIBLE,
  CONSTRAINT `fk_warehouseproduct_warehouses1`
    FOREIGN KEY (`WarehouseID`)
    REFERENCES `MyNwind`.`warehouses` (`WarehouseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_warehouseproduct_products1`
    FOREIGN KEY (`ProductID`)
    REFERENCES `MyNwind`.`products` (`ProductID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MyNwind`.`movementDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MyNwind`.`movementDetails` (
  `MovementID` INT NOT NULL,
  `ProductID` INT NOT NULL,
  `Quantity` INT NOT NULL COMMENT 'Todos los movimientos manejaran cantidades en positivo, a excepción de los movimientos de ajuste que pueden manejar negativo, inidicacando así, cuando la cantidad de articulos se quiera dar de baja.',
  PRIMARY KEY (`MovementID`, `ProductID`),
  INDEX `fk_movementDetails_products1_idx` (`ProductID` ASC) VISIBLE,
  CONSTRAINT `fk_movementDetails_movements1`
    FOREIGN KEY (`MovementID`)
    REFERENCES `MyNwind`.`movements` (`MovementID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movementDetails_products1`
    FOREIGN KEY (`ProductID`)
    REFERENCES `MyNwind`.`products` (`ProductID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
