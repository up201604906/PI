INSERT INTO users (name, email, password, permission, picture) VALUES 
('sampleName', 'sampleEmail@gmail.com', 'samplePassword', 'admin', NULL);

INSERT INTO resources (name, description, quantity, available, supplier, room, cabinet, shelf, box) VALUES
('Libelium Waspmote (v 1.2)', '1. Batteries - 2300 mA-h Rechargeable; 2.Two batteries have damaged connectors 3. With 6 antenna extensions', 6, 6, 'Website', 'I319', '1', 'C', 'B3'),
('Waspmote Events Sensor Board', '1. One with damaged connector (nº1)', 6, 6, NULL, NULL, NULL, NULL, NULL),
('Arduino UNO', '1.One Missing - on TNX', 1, 1, 'Website', 'I319', '1', 'C', 'B3'),
('Arduino Wireless Shield SD', '1. One Missing', 4, 3, 'Website', 'I319', '1', 'C', 'B3'),
('Raspberry Pi v1.0', '1. One without charger', 4, 4, NULL, NULL, NULL, NULL, NULL),
('Raspberry Pi2 Model B', NULL, 6, 1, 'Website', 'I319', '1', 'C', 'B3'),
('Raspberry Pi3 Preminum Kit', NULL, 1, 1, 'Website', 'I319', '1', 'C', 'B3'),
('Raspberry Pi3 Model B', NULL, 3, 3, 'Website', 'I319', '1', 'C', 'B3');

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
