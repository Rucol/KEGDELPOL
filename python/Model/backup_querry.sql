CREATE TABLE authorization (
    auth_id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
);

CREATE TABLE customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(15),
    auth_id INT,
    FOREIGN KEY (auth_id) REFERENCES authorization(auth_id)
);

CREATE TABLE product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2)
);

CREATE TABLE `order` (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATETIME,
    delivery_date DATETIME,
    status VARCHAR(255),
    weight DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE order_detail (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES `order`(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE vehicle (
    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255),
    capacity INT,
    registration_info VARCHAR(255)
);

CREATE TABLE route (
    route_id INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE delivery (
    delivery_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    route_id INT,
    driver_id INT,
    vehicle_id INT,
    actual_delivery_date DATETIME,
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES `order`(order_id),
    FOREIGN KEY (route_id) REFERENCES route(route_id),
    FOREIGN KEY (driver_id) REFERENCES driver(employee_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id)
);

CREATE TABLE role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_description VARCHAR(255),
    role_access VARCHAR(255),
    role_name VARCHAR(255)
);

CREATE TABLE status (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE driver (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    license_info VARCHAR(255),
    auth_id INT,
    FOREIGN KEY (auth_id) REFERENCES authorization(auth_id)
);

CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(255),
    employee_surname VARCHAR(255),
    phone_number VARCHAR(255),
    auth_id INT,
    FOREIGN KEY (auth_id)
        REFERENCES authorization (auth_id)
);


show tables from test;
