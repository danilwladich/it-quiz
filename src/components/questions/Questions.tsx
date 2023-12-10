import React, { useEffect, useState } from "react";
import "./questions.css";
import { Question } from "./Question";
import { useNavigate } from "react-router-dom";
import { IQuestion } from "../../hooks/useQuestions";

export function Questions({
	questions,
	answersList,
	setAnswersList,
}: {
	questions: IQuestion[];
	answersList: string[];
	setAnswersList: React.Dispatch<React.SetStateAction<string[]>>;
}) {
	// get session data
	const quizSessionStorage: {
		answersList?: string[];
		currentQuestion?: number;
	} = JSON.parse(sessionStorage.getItem("quizSessionStorage") || "{}");

	const navigate = useNavigate();

	const [currentQuestion, setCurrentQuestion] = useState<number>(
		quizSessionStorage.currentQuestion || 0
	);

	// redirect if quiz done
	useEffect(() => {
		if (answersList.length === questions.length) {
			navigate("/wynik");
		}
	}, [answersList, questions, navigate]);

	// reset current question if more than questions count
	useEffect(() => {
		if (currentQuestion >= questions.length) {
			setCurrentQuestion(0);
		}
	}, [currentQuestion, questions.length]);

	const question = questions[currentQuestion];

	// next question button on click handler
	function nextQuestionHandler(answer: string) {
		// increase state by 1
		setCurrentQuestion((prev) => prev + 1);

		// save answer to list
		const newAnswersList = [...answersList];
		newAnswersList[currentQuestion] = answer;
		setAnswersList(newAnswersList);

		// save to session storage
		const updatedQuizSessionStorage = {
			currentQuestion: currentQuestion + 1,
			answersList: newAnswersList,
		};
		sessionStorage.setItem(
			"quizSessionStorage",
			JSON.stringify(updatedQuizSessionStorage)
		);

		// redirect if quiz done
		if (currentQuestion === questions.length - 1) {
			navigate("/wynik");
		}
	}

	// go back button on click handler
	function goBackHandler() {
		// decrease state
		setCurrentQuestion((prev) => prev - 1);

		// save to session storage
		const updatedQuizSessionStorage = {
			currentQuestion: currentQuestion - 1,
			answersList: answersList,
		};
		sessionStorage.setItem(
			"quizSessionStorage",
			JSON.stringify(updatedQuizSessionStorage)
		);
	}

	return (
		<main className="questions">
			<h2 className="questions__status">
				<b>Pytanie {currentQuestion + 1}</b> z {questions.length}
			</h2>

			<Question
				q={question}
				currentQuestion={currentQuestion}
				answersList={answersList}
				nextQuestionHandler={nextQuestionHandler}
				goBackHandler={goBackHandler}
				isLastQuestion={currentQuestion === questions.length - 1}
			/>
		</main>
	);
}
