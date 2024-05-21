const theses_model = require('../models/theses_model');

/*
async function create_thesis(course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, observations) {
    try {
        const result = await pool.query(
            'INSERT INTO theses (course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, observations, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING id',
            [course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, observations, 'proposed']
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
        return result.rows[0];
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

const update_thesis = async (thesisId, course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, observations, state) => {
    try {
        await pool.query(
            'UPDATE theses SET course = $2, title = $3, mentor = $4, comentor = $5, host_institution_name = $6, host_institution_description = $7, proposer_name = $8, proposer_email = $9, proposer_phone = $10, proposer_position = $11, involved_areas = $12, description = $13, goals = $14, innovative_aspects = $15, work_plan = $16, bibliography = $17, candidate_profile = $18, work_after_dissertation = $19, conferences_and_scientific_journals = $20, observations = $21, state = $22 WHERE id = $1',
            [thesisId, course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, observations, state]
        );
    } catch (error) {
        console.error("Error updating thesis:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}


*/

const getTheses = async (req, res) => {
    try {
        const theses = await theses_model.get_theses();
        res.json(theses);
    } catch (error) {
        console.error("Error fetching theses:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getThesisById = async (req, res) => {
    try {
        const thesisId = req.params.id;

        const thesis = await theses_model.get_thesis_by_id(thesisId);

        if (!thesis) {
            return res.status(404).send("Thesis not found.");
        }

        res.json(thesis);
    } catch (error) {
        console.error("Error fetching thesis by ID:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateThesis = async (req, res) => {
    try {
        const thesisId = req.params.id;
        const { course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations, state } = req.body;

        await theses_model.update_thesis(thesisId, course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations, state);
        res.json({ success: true });

    } catch (error) {
        console.error("Error updating thesis:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createThesis = async (req, res) => {
    try {
        const { course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations } = req.body;

        await theses_model.create_thesis(course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations);
        res.json({ success: true });

    } catch (error) {
        console.error("Error creating thesis:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteThesisById = async (req, res) => {
    try {
        const thesisId = req.params.id;
        await theses_model.delete_thesis(thesisId);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting thesis:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getTheses,
    getThesisById,
    updateThesis,
    createThesis,
    deleteThesisById
};