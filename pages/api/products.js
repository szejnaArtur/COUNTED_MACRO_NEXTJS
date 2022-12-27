// import axios from 'axios';
//
// async function handler(req, res) {
//     if (req.method === 'POST') {
//         const {name, description} = req.body;
//
//         if (
//             !name ||
//             name.trim() === '' ||
//             !description ||
//             description.trim() === ''
//         ) {
//             res.status(422).json({message: 'Invalid input.'});
//             return;
//         }
//
//         const newProduct = {
//             name, description
//         };
//
//         let client;
//
//         try {
//             axios.post("http://localhost:8080/products", newProduct)
//                 .then()
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Could not connect to database.'
//             })
//             return;
//         }
//
//     }
// }