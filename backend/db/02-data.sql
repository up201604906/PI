INSERT INTO users (id, username, email, full_name, password)
VALUES (1, 'sampleUsername', 'sample@email.com', 'Sample Full Name', 'samplePassword');


INSERT INTO todos (title, description, is_completed, created_by) VALUES 
('Learn Docker', 'Go through Docker documentation...', FALSE, 1),
('Set up PostgreSQL', 'Install and configure PostgreSQL...', FALSE, 1),
('Work on TodoApp', 'Continue developing...', FALSE, 1);