import React from "react";
import { IQuestion } from "../../hooks/useQuestions";
import { Navigate, useNavigate } from "react-router-dom";
import { Certificate } from "./Certificate";
import "./result.css";
import confetti from "canvas-confetti";

export function Result({
	questions,
	answersList,
	setAnswersList,
	fetchQuestions,
}: {
	questions: IQuestion[];
	answersList: string[];
	setAnswersList: React.Dispatch<React.SetStateAction<string[]>>;
	fetchQuestions: () => Promise<void>;
}) {
	const navigate = useNavigate();

	// redirect if quiz not done
	if (answersList.length !== questions.length) {
		return <Navigate to="/" />;
	}

	// check correct answers
	const score = answersList.reduce((acc, answer, i) => {
		const correctAnswer = questions[i].correctAnswer;
		return answer === correctAnswer ? acc + 1 : acc;
	}, 0);

	// calculate percentage
	const percent = Math.round((score / questions.length) * 100);

	const isQuizPassed = percent >= 75;

	// show confetti if quiz passed
	if (isQuizPassed) {
		confetti();
	}

	// reset button on click handler
	function resetHandler() {
		// reset state
		setAnswersList([]);

		// reset session storage
		sessionStorage.removeItem("quizSessionStorage");
		sessionStorage.removeItem("shuffleSeedSessionStorage");

		// fetch new quiz questions
		fetchQuestions();

		// redirect
		navigate("/");
	}

	return (
		<main className="result">
			<h2 className="result__title">Twój wynik</h2>

			<p>
				<b>{score}</b> / {questions.length}
			</p>

			<p>{isQuizPassed ? "PASS" : "FAIL"}</p>

			<div className="result__buttons">
				<Certificate questions={questions} answersList={answersList} />

				<button onClick={resetHandler} className="result__buttons_reset">
					Rozpocząć ponownie
				</button>
			</div>
		</main>
	);
}
