import UserModel, { type user } from '$lib/mongoose/models/users';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	try {
		const persons = await UserModel.find();
		return {
			status: 200,
			body: JSON.stringify(persons)
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'something wrong'
			}
		};
	}
};

export const post: RequestHandler = async ({ request }) => {
	const { name, email, role } = <user>await request.json();
	try {
		const newPerson = new UserModel({
			name,
			email,
			role
		});
		await newPerson.save();
		return {
			status: 200,
			body: 'created!'
		};
	} catch (error) {
		return {
			status: 500,
			body: 'something wrong'
		};
	}
};

// export const put: RequestHandler = async ({ request }) => {
// 	const { person, _id } = req.body;
// 	Person.findByIdAndUpdate(_id, person, { returnOriginal: false })
// 		.then((updatedPerson) => {
// 			res.status(200).json(updatedPerson);
// 		})
// 		.catch((error) => res.status(500).json(error.message));
// };

// export const del: RequestHandler = async ({ request }) => {
// 	// try {
// 	// 	const persons = await Person.find();
// 	// 	return {
// 	// 		status: 200,
// 	// 		body: JSON.stringify(persons),
// 	// 	}
// 	// } catch (error) {
// 	// 	return {
// 	// 		status: 500,
// 	// 		body: {
// 	// 			error: error,
// 	// 		},
// 	// 	};
// 	// }
// };

// module.exports = function (req, res) {
// 	if (req.method === 'GET') {
// 		Person.find()
// 			.then((people) => {
// 				res.status(200).json(people);
// 			})
// 			.catch((error) => res.status(500).json(error.message));
// 	} else if (req.method === 'POST') {
// 		const newPerson = new Person(req.body);
// 		newPerson
// 			.save()
// 			.then((newPerson) => {
// 				res.status(200).json(newPerson);
// 			})
// 			.catch((error) => res.status(500).json(error.message));
// 	} else if (req.method === 'PUT') {
// 		const { person, _id } = req.body;
// 		Person.findByIdAndUpdate(_id, person, { returnOriginal: false })
// 			.then((updatedPerson) => {
// 				res.status(200).json(updatedPerson);
// 			})
// 			.catch((error) => res.status(500).json(error.message));
// 	} else if (req.method === 'DELETE') {
// 		const { _id } = req.body;
// 		Person.findByIdAndDelete(_id)
// 			.then((deletedPerson) => {
// 				res.status(200).json(deletedPerson);
// 			})
// 			.catch((error) => res.status(500).json(error.message));
// 	}
// };
