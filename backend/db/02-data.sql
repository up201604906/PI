INSERT INTO users (name, email, password, permission, picture) VALUES 
('sampleName', 'sampleEmail@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$oQTOYg1Mw870OD8EhedmJA$pSOaSQuy+qfjyn6SBeVsrEtxtaQVTqxS2TERhirWxM8', 'admin', NULL); -- password é samplePassword

INSERT INTO resources (name, description, category, quantity, available, supplier, room, cabinet, shelf, box) VALUES
('Libelium Waspmote (v 1.2)', '1. Batteries - 2300 mA-h Rechargeable; 2.Two batteries have damaged connectors 3. With 6 antenna extensions', 'sensor board',6, 6, 'Website', 'I112', '1', 'C', 'B3'),
('Waspmote Events Sensor Board', '1. One with damaged connector (nº1)', 'sensor board', 6, 6, NULL, NULL, NULL, NULL, NULL),
('Arduino UNO', '1.One Missing - on TNX', 'sensor board', 1, 1, 'Website', 'I319', '1', 'C', 'B3'),
('Arduino Wireless Shield SD', '1. One Missing', 'sensor board', 4, 3, 'Website', 'I319', '1', 'C', 'B3'),
('Raspberry Pi v1.0', '1. One without charger', 'sensor board', 4, 4, NULL, NULL, NULL, NULL, NULL),
('Raspberry Pi2 Model B', NULL, 'sensor board', 6, 1, 'Website', 'I319', '1', 'C', 'B3'),
('Raspberry Pi3 Preminum Kit', NULL, 'sensor board', 1, 1, 'Website', 'I319', '1', 'C', 'B3'),
('Raspberry Pi3 Model B', NULL, 'sensor', 3, 3, 'Website', 'I319', '1', 'C', 'B3');

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


INSERT INTO articles (title, year, type, journal, booktitle, publisher, address, pages, volume, number, series, month, note, url, doi, isbn, howpublished, organization, reference, abstract, keywords, cite, user_id)
VALUES 
('A Study on Machine Learning', 2024, 'journal', 'Journal of Machine Learning', NULL, 'Tech Publishers', '123 Main St', '12-34', 15, 1, NULL, 'January', 'Important study', 'http://example.com/article1', '10.1234/example.doi', '1234567890', NULL, 'ML Org', NULL, 'This is an abstract.', 'machine learning, AI', 'citekey2024', NULL),
('Data Science Techniques', 2023, 'book', NULL, 'Data Science Book', 'Data Science Publishers', '456 High St', '56-78', NULL, NULL, NULL, 'February', 'Comprehensive guide', 'http://example.com/book1', '10.5678/example.doi', '0987654321', NULL, 'Data Org', NULL, 'This is an abstract.', 'data science, analytics', 'citekey2023', NULL);

-- Insert into authors table
INSERT INTO authors (name)
VALUES 
('John Doe'),
('Jane Smith'),
('Alice Johnson');

-- Insert into article_authors table
INSERT INTO article_authors (article_id, author_id)
VALUES 
(1, 1),
(1, 2),
(2, 3);

-- Insert into editors table
INSERT INTO editors (name)
VALUES 
('Michael Brown'),
('Laura White');

-- Insert into article_editors table
INSERT INTO article_editors (article_id, editor_id)
VALUES 
(1, 1),
(2, 2);