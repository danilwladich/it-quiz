import { useCallback, useEffect, useState } from "react";

export function useQuestions() {
	const [questions, setQuestions] = useState<IQuestion[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	const fetchQuestions = useCallback(async () => {
		try {
			setError("");
			setLoading(true);

			// retrieve shuffle seed from session storage
			const shuffleSeedSessionStorage: {
				shuffleSeed?: IShuffleSeed[];
			} = JSON.parse(
				sessionStorage.getItem("shuffleSeedSessionStorage") || "{}"
			);

			const shuffleSeed = shuffleSeedSessionStorage.shuffleSeed || [];

			// simulate a fetch request delay
			await new Promise((resolve) => setTimeout(resolve, 800));

			// generate shuffle seed or get from session storage
			const newShuffleSeed = getShuffleSeed(questionsDB, shuffleSeed);

			// get data
			const response = shuffleQuestions([...questionsDB], newShuffleSeed);

			// save state
			setQuestions(response);

			// save shuffle seed to session storage
			const updatedShuffleSeedSessionStorage = {
				shuffleSeed: newShuffleSeed,
			};
			sessionStorage.setItem(
				"shuffleSeedSessionStorage",
				JSON.stringify(updatedShuffleSeedSessionStorage)
			);

			setLoading(false);
		} catch (e) {
			setLoading(false);
			setError(`${e}`);
		}
	}, []);

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	return { questions, error, loading, fetchQuestions };
}

//
// database
//

export interface IQuestion {
	question: string;
	options: string[];
	correctAnswer: string;
}

interface IShuffleSeed {
	question: number;
	options: number[];
}

const questionsDB: IQuestion[] = [
	{
		question: "Kiedy zostal uruchomiony pierwszy serwer WWW?",
		options: ["1989", "1990", "1993", "1995"],
		correctAnswer: "1990",
	},
	{
		question: "Kto uwazany jest za tworce World Wide Web?",
		options: ["Tim Cook", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
		correctAnswer: "Tim Berners-Lee",
	},
	{
		question: "W ktorym roku pierwszy raz uzyto terminu Internet?",
		options: ["1950", "1969", "1983", "1995"],
		correctAnswer: "1969",
	},
	{
		question: "Co to jest ARPANET?",
		options: [
			"Pierwsza przegladarka internetowa",
			"Pierwsza siec komputerowa",
			"Pierwszy protokol HTTP",
			"Pierwszy komputer",
		],
		correctAnswer: "Pierwsza siec komputerowa",
	},
	{
		question: "Co oznacza skrot URL?",
		options: [
			"Unified Resource Locator",
			"Universal Resource Link",
			"Uniform Resource Locator",
			"Unique Resource Locator",
		],
		correctAnswer: "Uniform Resource Locator",
	},
	{
		question: "Co to jest DNS?",
		options: [
			"Dynamic Network Service",
			"Domain Name System",
			"Data Network Security",
			"Digital Naming Service",
		],
		correctAnswer: "Domain Name System",
	},
	{
		question: "Co to jest IP address?",
		options: [
			"International Phone number",
			"Internet Protocol address",
			"Internal Port address",
			"Intranet Position address",
		],
		correctAnswer: "Internet Protocol address",
	},
	{
		question:
			"Jakie urzadzenie umozliwia laczenie sie z Internetem bezprzewodowo?",
		options: ["Modem", "Router", "Switch", "Wi-Fi adapter"],
		correctAnswer: "Wi-Fi adapter",
	},
	{
		question:
			"Jakie jezyki programowania sa wykorzystywane do tworzenia stron internetowych?",
		options: [
			"HTML, Python, C++",
			"CSS, Java, SQL",
			"HTML, CSS, JavaScript",
			"PHP, Ruby, Perl",
		],
		correctAnswer: "HTML, CSS, JavaScript",
	},
	{
		question:
			"Co oznacza skrót CSS w kontekscie tworzenia stron internetowych?",
		options: [
			"Cascading Style Sheets",
			"Centralized Style System",
			"Computerized Style Scripts",
			"Creative Styling Software",
		],
		correctAnswer: "Cascading Style Sheets",
	},
	{
		question:
			"Ktory jezyk programowania jest uzywany do tworzenia interaktywnych elementow na stronach internetowych?",
		options: ["HTML", "CSS", "JavaScript", "PHP"],
		correctAnswer: "JavaScript",
	},
	{
		question: "Jakie jest podstawowe zastosowanie jezyka CSS?",
		options: [
			"Tworzenie interaktywnych stron internetowych",
			"Okreslanie wygladu i stylu stron internetowych",
			"Zarzadzanie bazami danych",
			"Programowanie serwerow",
		],
		correctAnswer: "Okreslanie wygladu i stylu stron internetowych",
	},
	{
		question: "Co oznacza skrot JS w kontekscie tworzenia stron internetowych?",
		options: ["Java Source", "Just Style", "JavaScript", "JSON Script"],
		correctAnswer: "JavaScript",
	},
	{
		question: "Co to jest Tor?",
		options: [
			"Przegladarka internetowa",
			"Siec VPN",
			"Siec darknetowa",
			"Kryptowaluta",
		],
		correctAnswer: "Siec darknetowa",
	},
	{
		question: "Jakie kryptowaluty sa czesto uzywane na darknecie?",
		options: [
			"Bitcoin, Ethereum, Litecoin",
			"Monero, Zcash, Dash",
			"Ripple, Stellar, Cardano",
			"Dogecoin, Polkadot, Chainlink",
		],
		correctAnswer: "Monero, Zcash, Dash",
	},
	{
		question: "Co to jest phishing?",
		options: [
			"Atak polegajacy na przejmowaniu danych uzytkownika",
			"Rodzaj antywirusa",
			"Metoda tworzenia stron internetowych",
			"System zapobiegania atakom hakerskim",
		],
		correctAnswer: "Atak polegajacy na przejmowaniu danych uzytkownika",
	},
	{
		question: "Co oznacza skrot VPN w kontekscie bezpieczenstwa internetowego?",
		options: [
			"Virtual Private Network",
			"Very Private Navigator",
			"Visual Protection Node",
			"Volatile Public Network",
		],
		correctAnswer: "Virtual Private Network",
	},
	{
		question: "Co to jest Silk Road w kontekscie darknetu?",
		options: [
			"Zaszyfrowany protokol komunikacyjny",
			"Portal spolecznosciowy",
			"Strona handlowa na darknecie",
			"Przegladarka internetowa",
		],
		correctAnswer: "Strona handlowa na darknecie",
	},
	{
		question: "Co to jest atak DDoS?",
		options: [
			"Atak polegajacy na wlamywaniu sie do systemu",
			"Atak polegajacy na rozprzestrzenianiu wirusa",
			"Atak polegajacy na zablokowaniu dostepu do uslugi poprzez przeciazenie serwera",
			"Atak polegajacy na podszywaniu sie pod innych uzytkownikow",
		],
		correctAnswer:
			"Atak polegajacy na zablokowaniu dostepu do uslugi poprzez przeciazenie serwera",
	},
	{
		question: "Co oznacza skrot HTTPS w adresie URL?",
		options: [
			"Hyper Transfer Protocol Secure",
			"High Traffic Protection System",
			"Hyper Text Privacy Standard",
			"Hyper Text Transfer Protocol Secure",
		],
		correctAnswer: "Hyper Text Transfer Protocol Secure",
	},
	{
		question: "Która firma jest znana z rozwoju systemu operacyjnego Android?",
		options: ["Apple", "Microsoft", "Google", "Samsung"],
		correctAnswer: "Google",
	},
	{
		question: "Co to jest Internet of Things (IoT)?",
		options: [
			"Siec spolecznosciowa",
			"System operacyjny",
			"Koncepcja laczenia urzadzen do Internetu",
			"Rodzaj kryptowaluty",
		],
		correctAnswer: "Koncepcja laczenia urzadzen do Internetu",
	},
	{
		question: "Co to jest blockchain?",
		options: [
			"Technologia pozwalajaca na szybsze ladowanie stron internetowych",
			"Rozwiazanie do anonimowego przegladania internetu",
			"Rozproszona ksiega rachunkowa wykorzystywana w kryptowalutach",
			"Rodzaj przegladarki internetowej",
		],
		correctAnswer:
			"Rozproszona ksiega rachunkowa wykorzystywana w kryptowalutach",
	},
	{
		question: "Co to jest sztuczna inteligencja (AI)?",
		options: [
			"Technologia polegajaca na laczeniu komputerow w jedna siec",
			"Szybki transfer danych",
			"Technologia umozliwiajaca komputerom rozumienie i uczenie sie",
			"Skrot od Artefact Internet",
		],
		correctAnswer:
			"Technologia umozliwiajaca komputerom rozumienie i uczenie sie",
	},
	{
		question: "Co to jest 5G?",
		options: [
			"Piata generacja przegladarek internetowych",
			"Piata generacja telefonii komorkowej",
			"Piata generacja systemow operacyjnych",
			"Maszty powodujace rozne schorzenia (peelna mooc)",
		],
		correctAnswer: "Piata generacja telefonii komorkowej",
	},
];

// Randomize array in-place using Durstenfeld shuffle algorithm
function shuffleQuestions(array: IQuestion[], seed: IShuffleSeed[]) {
	for (
		let currentQuestionIndex = array.length - 1;
		currentQuestionIndex > 0;
		currentQuestionIndex--
	) {
		const seedIndex = array.length - currentQuestionIndex - 1;

		// swap questions
		const randomQuestionIndex = seed[seedIndex].question;
		[array[currentQuestionIndex], array[randomQuestionIndex]] = [
			array[randomQuestionIndex],
			array[currentQuestionIndex],
		];

		const options = array[randomQuestionIndex].options;

		for (
			let currentOptionIndex = options.length - 1;
			currentOptionIndex > 0;
			currentOptionIndex--
		) {
			// swap options
			const seedOptionIndex = options.length - currentOptionIndex - 1;

			const randomOptionIndex = seed[seedIndex].options[seedOptionIndex];
			[options[currentOptionIndex], options[randomOptionIndex]] = [
				options[randomOptionIndex],
				options[currentOptionIndex],
			];
		}
	}

	return array;
}

function getShuffleSeed(array: IQuestion[], oldSeed: IShuffleSeed[] = []) {
	let seed = oldSeed;

	// check array length and elemenets length
	const isValidSeed =
		seed.length === array.length &&
		seed.every((s, i) => s.options.length === array[i].options.length);

	if (!isValidSeed) {
		// reset if seed doesn't have the correct elements count
		seed = [];

		// set questions
		for (let i = array.length; i > 0; i--) {
			seed.push({
				question: Math.floor(Math.random() * i),
				options: [],
			});

			// set options
			const optionsLength = 4;
			for (let j = optionsLength; j > 0; j--) {
				seed[array.length - i].options.push(Math.floor(Math.random() * j));
			}
		}
	}

	return seed;
}
