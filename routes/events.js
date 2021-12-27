/*
Events Routes
/api/events
*/

//CREATE the CRUD
const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validateJWT } = require("../middlewares/jwt-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");


//All events must pass through JWT validation
router.use( validateJWT );

//GET EVENTS
router.get("/", getEvents);

//POST EVENTS
router.post("/", [
	check("title", "Title is required").not().isEmpty(),
	check("start", "Start date is required").custom( isDate),	
	check("end", "End date is required").custom( isDate),
	fieldValidator
], createEvent);

//PUT EVENTS
router.put("/:id", updateEvent);

//DELETE EVENTS
router.delete("/:id", deleteEvent);

module.exports = router;
