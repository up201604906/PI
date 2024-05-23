/*
CREATE TYPE theses_course_enum AS ENUM ('MEIC', 'MEEC', 'MM', 'MESW', 'MECD');
CREATE TYPE theses_state_enum AS ENUM ('Proposed', 'Written', 'Submitted', 'Assigned');

CREATE TABLE theses (
  id SERIAL PRIMARY KEY,
  course theses_course_enum NOT NULL,
  title VARCHAR NOT NULL,
  mentor VARCHAR NOT NULL,
  comentor VARCHAR,
  host_institution_name VARCHAR, 
  host_institution_description TEXT,
  proposer_name VARCHAR NOT NULL, 
  proposer_email VARCHAR,
  proposer_phone VARCHAR,
  proposer_position VARCHAR,
  involved_areas VARCHAR, -- Involved areas (for MEEC we have these: AUTOMATION | ENERGY | TELE; for MEIC we have these: COMPUTER ARCHITECTURES AND SYSTEMS | COMPUTER GRAPHICS AND INTERACTIVE DIGITAL MEDIA | INFORMATION SYSTEMS | INTELLIGENT SYSTEMS | PROGRAMMING SCIENCE AND TECHNOLOGY | SOFTWARE ENGINEERING; for MESW we have these: DATA ANALYSIS IN SOFTWARE ENGINEERING | SOFTWARE UNDERSTANDING AND EVOLUTION | SOFTWARE REQUIREMENTS ENGINEERING | SOFTWARE ENGINEERING | SECURITY IN SOFTWARE ENGINEERING | SOFTWARE TESTING; for MM and MECD I don't know)
  description TEXT NOT NULL,
  goals TEXT,
  innovative_aspects TEXT,
  work_plan TEXT, -- Work Plan (preparatory phase + development phase)
  bibliography TEXT,
  candidate_profile TEXT,
  work_after_dissertation TEXT,
  conferences_and_scientific_journals TEXT,
  observations TEXT,
  edition VARCHAR,
  state theses_state_enum NOT NULL
);


 */

const pool = require("./database");

async function create_thesis(course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations, state) {
    try {
        const result = await pool.query(
            'INSERT INTO theses (course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING id',
            [course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations, state]
        );
        return result.rows[0].id;
    }
    catch (error) {
        console.error("Error inserting thesis:", error);
    }
}

const get_thesis_by_id = async (thesisId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM theses WHERE id = $1',
            [thesisId]
        );

        // If no thesis found, return null
        if (result.rows.length === 0) {
            return null;
        }

        // Return the found thesis
        return result.rows;
    } catch (error) {
        console.error("Error fetching thesis by ID:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

const get_theses = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM theses'
        );

        return result.rows;
    } catch (error) {
        console.error("Error fetching theses:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

const delete_thesis = async (thesisId) => {
    try {
        await pool.query(
            'DELETE FROM theses WHERE id = $1',
            [thesisId]
        );
    } catch (error) {
        console.error("Error deleting thesis:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

const update_thesis = async (thesisId, course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations, state) => {
    try {
        await pool.query(
            'UPDATE theses SET course = $2, title = $3, mentor = $4, comentor = $5, host_institution_name = $6, host_institution_description = $7, proposer_name = $8, proposer_email = $9, proposer_phone = $10, proposer_position = $11, involved_areas = $12, description = $13, goals = $14, innovative_aspects = $15, work_plan = $16, bibliography = $17, candidate_profile = $18, work_after_dissertation = $19, conferences_and_scientific_journals = $20, edition = $21, observations = $22, state = $23 WHERE id = $1',
            [thesisId, course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations, state]
        );
    } catch (error) {
        console.error("Error updating thesis:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

module.exports = {
    create_thesis,
    get_thesis_by_id,
    get_theses,
    delete_thesis,
    update_thesis
};