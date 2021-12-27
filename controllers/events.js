const { response } = require("express");
const Event = require("../models/Event");

// {
//     ok: true,
//     message: 'Get events'
// }
const getEvents = async (req, res = response) => {
	const events = await Event.find().populate("user", "name");

	res.json({
		ok: true,
		events,
	});
};

// {
//     ok: true,
//     message: 'Create events'
// }
const createEvent = async (req, res = response) => {
	//verify that the event has all the required fields
	const event = new Event(req.body);

	try {
		event.user = req.uid;

		const savedEvent = await event.save();

		res.json({
			ok: true,
			event: savedEvent,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message:
				"There was an error creating the event, please contact the administrator",
		});
	}
};

// {
//     ok: true,
//     message: 'Update events'
// }
const updateEvent = async (req, res = response) => {
	const eventId = req.params.id;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				message: "Event not found by that ID",
			});
		}

		if (event.user.toString() !== req.uid) {
			return res.status(401).json({
				ok: false,
				message: "User not authorized to update this event",
			});
		}

		const newEvent = {
			...req.body,
			user: req.uid,
		};

		const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
			new: true,
			runValidators: true,
		});

		res.json({
			ok: true,
			event: updatedEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message:
				"There was an error updating the event, please contact the administrator",
		});
	}
};

// {
//     ok: true,
//     message: 'Delete events'
// }

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				message: "Event not found by that ID",
			});
		}

		if (event.user.toString() !== req.uid) {
			return res.status(401).json({
				ok: false,
				message: "User not authorized to update this event",
			});
		}

		await Event.findByIdAndDelete(eventId);

		res.json({
			ok: true,
            mewssage: "Event deleted"
		});
        
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message:
				"There was an error updating the event, please contact the administrator",
		});
	}
};

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
};
