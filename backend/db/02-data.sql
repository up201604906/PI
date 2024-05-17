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

INSERT INTO theses (course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, observations, state) VALUES 
('MEIC', 'Thesis Title 1', 'Mentor 1', 'Comentor 1', 'Institution 1', 'This is a more detailed description of Institution 1. It is a leading institution in the field of computer science, with a strong focus on research and development.', 'Proposer 1', 'proposer1@example.com', '1234567890', 'Position 1', 'COMPUTER ARCHITECTURES AND SYSTEMS', 'This work involves developing a new algorithm for optimizing data processing. The algorithm will be tested on a variety of datasets to evaluate its performance.', 'The goal of this work is to improve the efficiency of data processing algorithms.', 'This work is innovative because it applies a new approach to data processing optimization.', 'The work plan involves three stages: design, implementation, and testing.', 'The bibliography includes key papers and books on data processing and optimization.', 'The ideal candidate for this work is a student with a strong background in computer science and an interest in data processing.', TRUE, 'Conferences and scientific journals related to the work', 'Observations about the work', 'proposed'), 
('MEEC', 'Thesis Title 2', 'Mentor 2', 'Comentor 2', 'Institution 2', 'This is a more detailed description of Institution 2. It is a renowned institution in the field of electrical engineering, with a strong emphasis on practical applications.', 'Proposer 2', 'proposer2@example.com', '0987654321', 'Position 2', 'AUTOMATION', 'This work involves designing a new control system for industrial automation. The system will be tested in a simulated environment to evaluate its performance.', 'The goal of this work is to improve the efficiency and reliability of industrial automation systems.', 'This work is innovative because it applies a new approach to control system design.', 'The work plan involves three stages: design, implementation, and testing.', 'The bibliography includes key papers and books on control systems and industrial automation.', 'The ideal candidate for this work is a student with a strong background in electrical engineering and an interest in automation.', FALSE, 'Conferences and scientific journals related to the work', 'Observations about the work', 'proposed');