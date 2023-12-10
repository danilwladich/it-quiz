import React from "react";
import "./instruction.css";
import { useNavigate } from "react-router-dom";

export function Instruction({
	questionsCount,
	answersList,
}: {
	questionsCount: number;
	answersList: string[];
}) {
	const navigate = useNavigate();

	const startQuizButtonText = answersList.length
		? "Wróć do quizu"
		: "Rozpocząć quiz";

	// on start quiz click handler
	function startQuizOnClick() {
		navigate("/quiz");
	}

	return (
		<main className="instruction">
			<h2 className="instruction__title">
				Witaj w Quizie o technologiach internetowych
			</h2>

			<ol className="instruction__rules">
				<li>
					Dostępne będzie {questionsCount} pytań z czterema możliwymi
					odpowiedziami, gdzie użytkownik będzie mógł zaznaczyć jedną, wybraną
					przez siebie odpowiedź.
				</li>

				<li>
					Pytania będą wyświetlały się kolejno, po udzieleniu na nie odpowiedzi
					(kliknięciu "Dalej").
					<ol>
						<li>
							Wybór odpowiedzi musi być dokonany, nie można nie udzielić
							odpowiedzi / pominąć pytania.
						</li>

						<li>Można wrócić do poprzednich pytań i zmienić odpowiedź.</li>
					</ol>
				</li>

				<li>Dane o quize przechowywane w Session Storage</li>

				<li>
					Pod koniec quizu użytkownik zobaczy swój wynik (liczba punktów + PASS
					/ FAIL). Quiz zalicza 75% poprawnych odpowiedzi.
				</li>

				<li>
					Po zakończeniu quizu istnieje możliwość pobrania wyniku wraz z
					odpowiedziami (w postaci pliku .pdf) - na wzór potwierdzenia
					ukończenia quizu, certyfikatu.
				</li>

				<li>
					Za każdym razem, gdy użytkownik ponownie uruchamia quiz, kolejność
					pytań i odpowiedzi jest losowa.
				</li>
			</ol>

			<div className="instruction__button">
				<button onClick={startQuizOnClick}>{startQuizButtonText}</button>
			</div>
		</main>
	);
}
