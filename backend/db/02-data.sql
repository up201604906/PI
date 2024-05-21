INSERT INTO users (name, contact_email, password, permission, picture) VALUES
('sampleName', 'sampleEmail@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$oQTOYg1Mw870OD8EhedmJA$pSOaSQuy+qfjyn6SBeVsrEtxtaQVTqxS2TERhirWxM8', 'admin', NULL), -- password é samplePassword
('ntsay', 'ntsay@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$oQTOYg1Mw870OD8EhedmJA$pSOaSQuy+qfjyn6SBeVsrEtxtaQVTqxS2TERhirWxM8', 'admin', NULL);

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

INSERT INTO wishlist (user_id, resource_id, quantity) VALUES (1, 1, 4);
INSERT INTO wishlist (user_id, potential_resource_id, quantity) VALUES (1, 1, 2);

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


INSERT INTO project_types (type_name) VALUES ('Artificial Intelligence');
INSERT INTO project_types (type_name) VALUES ('Zero-shot Learning');
INSERT INTO project_types (type_name) VALUES ('Transfer Learning');
INSERT INTO project_types (type_name) VALUES ('Collaborative Robotics');
INSERT INTO project_types (type_name) VALUES ('Computer Vision');
INSERT INTO project_types (type_name) VALUES ('Machine Learning');
INSERT INTO project_types (type_name) VALUES ('Production Systems');
INSERT INTO project_types (type_name) VALUES ('Digitalization');
INSERT INTO project_types (type_name) VALUES ('Cyber-Physical Systems');
INSERT INTO project_types (type_name) VALUES ('Data Analytics');
INSERT INTO project_types (type_name) VALUES ('Distributed Control Systems');
INSERT INTO project_types (type_name) VALUES ('Systems of Systems');
INSERT INTO project_types (type_name) VALUES ('Innovation Management');
INSERT INTO project_types (type_name) VALUES ('Entrepreneurship');
INSERT INTO project_types (type_name) VALUES ('Education 4.0');
INSERT INTO project_types (type_name) VALUES ('Zero Defect Manufacturing');
INSERT INTO project_types (type_name) VALUES ('Embedded/Distributed Systems');
INSERT INTO project_types (type_name) VALUES ('Sensor and Automation Systems');
INSERT INTO project_types (type_name) VALUES ('Real-time systems');
INSERT INTO project_types (type_name) VALUES ('Gamification');
INSERT INTO project_types (type_name) VALUES ('Meaningful Learning Environments');
INSERT INTO project_types (type_name) VALUES ('Digital Twins');
INSERT INTO project_types (type_name) VALUES ('Extended Reality');
INSERT INTO project_types (type_name) VALUES ('Human-Computer Interaction');
INSERT INTO project_types (type_name) VALUES ('Digital Storytelling');
INSERT INTO project_types (type_name) VALUES ('Interactive Narratives');
INSERT INTO project_types (type_name) VALUES ('Augmented Reality');
INSERT INTO project_types (type_name) VALUES ('Industry 4.0');
INSERT INTO project_types (type_name) VALUES ('Artificial Immune Systems');
INSERT INTO project_types (type_name) VALUES ('Edge Computing');
INSERT INTO project_types (type_name) VALUES ('Mobile Robotics and Manipulation');

INSERT INTO project_status (status_name) VALUES ('Ongoing');
INSERT INTO project_status (status_name) VALUES ('Completed');
INSERT INTO project_status (status_name) VALUES ('Paused');
INSERT INTO project_status (status_name) VALUES ('Cancelled');


INSERT INTO projects (name, acronym, description, state, website, start_date, end_date, funding, funding_reference, external_partners, media, created_by, project_type_id, project_status_id) VALUES
('Advanced Industrial Sustainability to improve energy efficiency and usage of productive resources', 'Advance4i', 'Development and demonstration of an affordable and flexible IoT hardware platform, encompassing capabilities for plug&play of industrial sensors/actuators and automatic integration of these devices in monitoring and control applications.', 'In Progress', 'https://advance4i.sistrade.com/', '2022-07-01', '2025-12-31', 'PRR - Plano de Recuperação e Resiliência', 'PRODUTECH R3 - C645808870-00000067 - investment project no. 60', 'SisTrade, INEGI, IDEPA, Demoscore, IEP, ISEP, CTIC', NULL, 1, 1, 1);

-- Insert into research_team
INSERT INTO research_team (name, field, email, optional_email, capacity) VALUES
('Maria', 'Robotics Researcher', 'maria@example.com', NULL, 'Full-time'),
('Joao', 'AI Researcher', 'joao@example.com', NULL, 'Part-time'),
('Pedro', 'Student', 'pedro@example.com', 'pedro_optional@example.com', 'Intern'),
('Ana', 'Data Scientist', 'ana@example.com', NULL, 'Full-time'),
('Carlos', 'Machine Learning Engineer', 'carlos@example.com', 'carlos_optional@example.com', 'Part-time');

-- Insert into user_project_type
INSERT INTO user_project_type (user_id, project_type_id) VALUES
(1, 1),
(1, 2);


-- Insert into user_projects
INSERT INTO user_projects (user_id, project_id) VALUES
(1, 1),
(2, 1);

-- Insert into project_research_team
INSERT INTO project_research_team (project_id, research_team_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);

-- Insert into project_assignments
INSERT INTO project_assignments (project_id, description, assignee, due_date, status) VALUES
(1, 'Initial Research', 1, '2024-03-01', 'In Progress'),
(1, 'Data Collection', 2, '2024-06-01', 'Pending'),
(1, 'Data Preprocessing', 4, '2024-04-01', 'Pending'),
(1, 'Model Training', 5, '2024-08-01', 'Pending');

-- Insert into sharing_communication
INSERT INTO sharing_communication (project_id, link_type, link_url) VALUES
(1, 'Google Drive', 'https://drive.google.com/file/d/11c2mXS9Mc7rNe1ob8iU77CaItL3Vm8go/view?usp=drive_link'),
(1, 'Slack Channel', 'https://app.slack.com/client/T06HM7UQBM5/C06JEE7UEAV'),
(1, 'Trello Board', 'http://trello.com/airp'),
(1, 'GitHub Repository', 'http://github.com/airp');



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

INSERT INTO articles (
    title, year, type, journal, booktitle, publisher, address, pages, volume, number, series, month, note, url, doi, isbn, howpublished, organization, reference, abstract, keywords, cite, user_id
) VALUES (
    'A step forward on Intelligent Factories: A Smart Sensor-oriented approach', 2014, 'Journal', 'Emerging Technology and Factory Automation (ETFA)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
);


INSERT INTO articles (
    title, year, type, journal, booktitle, publisher, address, pages, volume, number, series, month, note, url, doi, isbn, howpublished, organization, reference, abstract, keywords, cite, user_id
) VALUES (
    'Sensor cloud: SmartComponent framework for reconfigurable diagnostics in intelligent manufacturing environments', 2015, 'Conference', 'Industrial Informatics (INDIN), 2015 IEEE 13th International Conference on', NULL, NULL, NULL, '1706-1711', NULL, NULL, NULL, NULL, NULL, NULL, 'doi: 10.1109/INDIN.2015.7281991', NULL, NULL, 'IEEE', NULL, NULL, NULL, NULL, NULL
);


INSERT INTO articles (
    title, year, type, journal, booktitle, publisher, address, pages, volume, number, series, month, note, url, doi, isbn, howpublished, organization, reference, abstract, keywords, cite, user_id
) VALUES (
    'Self-organising Smart Components in Advanced Manufacturing Systems', 2015, 'Conference', 'INTELLI 2015, The Fourth International Conference on Intelligent Systems and Applications', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
);


INSERT INTO articles (
    title, year, type, journal, booktitle, publisher, address, pages, volume, number, series, month, note, url, doi, isbn, howpublished, organization, reference, abstract, keywords, cite, user_id
) VALUES (
    'Self-Diagnosis and Automatic Configuration of Smart Components in Advanced Manufacturing Systems', 2015, 'Conference', 'INTELLI 2015, The Fourth International Conference on Intelligent Systems and Applications', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
);


INSERT INTO articles (
    title, year, type, journal, booktitle, publisher, address, pages, volume, number, series, month, note, url, doi, isbn, howpublished, organization, reference, abstract, keywords, cite, user_id
) VALUES (
    'Life-cycle Approach to Extend Equipment Re-use in Flexible Manufacturing', 2016, 'Conference', 'INTELLI 2016, The Fifth International Conference on Intelligent Systems and Applications', NULL, NULL, NULL, '148--153', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IARIA', NULL, NULL, NULL, NULL, NULL
);



INSERT INTO user_pc_allocation (user_id, pc_allocation_id)
SELECT 1, id FROM pc_allocation;