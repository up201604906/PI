INSERT INTO users (name, email, password, permission, picture) VALUES 
('sampleName', 'sampleEmail@gmail.com', 'samplePassword', 'admin', NULL);

INSERT INTO resources (name, description, category, quantity, available, supplier, room, cabinet, shelf, box, priority) VALUES
('Libelium Waspmote (v 1.2)', '1. Batteries - 2300 mA-h Rechargeable; 2.Two batteries have damaged connectors 3. With 6 antenna extensions', 'sensor board',6, 6, 'Website', 'I112', '1', 'C', 'B3', 'low'),
('Waspmote Events Sensor Board', '1. One with damaged connector (nº1)', 'sensor board', 6, 6, NULL, NULL, NULL, NULL, NULL, 'low'),
('Arduino UNO', '1.One Missing - on TNX', 'sensor board', 1, 1, 'Website', 'I319', '1', 'C', 'B3', 'low'),
('Arduino Wireless Shield SD', '1. One Missing', 'sensor board', 4, 3, 'Website', 'I319', '1', 'C', 'B3', 'low'),
('Raspberry Pi v1.0', '1. One without charger', 'sensor board', 4, 4, NULL, NULL, NULL, NULL, NULL, 'low'),
('Raspberry Pi2 Model B', NULL, 'sensor board', 6, 1, 'Website', 'I319', '1', 'C', 'B3', 'low'),
('Raspberry Pi3 Preminum Kit', NULL, 'sensor board', 1, 1, 'Website', 'I319', '1', 'C', 'B3', 'low'),
('Raspberry Pi3 Model B', NULL, 'sensor', 3, 3, 'Website', 'I319', '1', 'C', 'B3', 'low');

INSERT INTO potential_resources (name, description, category, supplier, price, priority)
VALUES ('Potential Resource 1', 'This is a description for Potential Resource 1', 'Category 1', 'Supplier 1', 100.00, 'low');

INSERT INTO wishlist (user_id, resource_id, quantity, state) VALUES (1, 1, 4, 'open');
INSERT INTO wishlist (user_id, potential_resource_id, quantity, state) VALUES (1, 1, 2, 'open');

INSERT INTO licenses (description, equipment, login, password) VALUES
('PC HP Compact 8100 [Demo CPPS]', 'Login Sistema Operativo', '*********', '*********'),
('Asus RT-N12 [192.168.1.1]', 'Login Router', '*********', '*********'),
('Rede do Lab', 'Login Wireless net', '*********', '*********'),
('Router Asus RT-N10E [192.168.0.1]', 'Login Router', '*********', '*********');

INSERT INTO pc_allocation (name, serial_number, room) VALUES
('ThinkPad P15v', 'PF41ZNA7', 'D111'),
('Dell latitude 7520', '29704J3', 'i319'),
('ThinkPad P15v', 'PF41ZQHA', 'i104'),
('ThinkPad P14S', 'PF4AN56F', 'I319');

INSERT INTO user_pc_allocation (user_id, pc_allocation_id)
SELECT 1, id FROM pc_allocation;