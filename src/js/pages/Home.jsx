import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";

const urlBase = "https://rickandmortyapi.com/api"

const Home = () => {

	const [characters, setCharacters] = useState([])

	// manejada con el then 
	// const getAllCharacter = () => {
	// 	fetch(`${urlBase}/character`)
	// 		.then((response) => response.json())
	// 		.then((data) => setCharacters(data.results))
	// 		.catch((error) => console.log(error))
	// }

	// async / await
	const getAllCharacterAsync = async () => {
		try {
			// consultamos la API
			const response = await fetch(`${urlBase}/character`)
			const data = await response.json()
			setCharacters(data.results)

		} catch (error) {
			console.log(error)
		}

	}

	async function example() { }

	useEffect(() => {
		// getAllCharacter()
		getAllCharacterAsync()
	}, [])

	return (
		<>
			
			<div className="container">
				<div className="row">
					<div className="col-12">
						{
							characters.map((item) => (
								<p key={item.id}>
									Hola ¿qué tal <span className="text-danger">{item.name}</span> ?
								</p>
							))
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;