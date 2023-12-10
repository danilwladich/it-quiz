import React, { useState } from "react";
import "./App.css";
import { Questions } from "./components/questions/Questions";
import { Route, Routes } from "react-router-dom";
import { Result } from "./components/result/Result";
import { Instruction } from "./components/instruction/Instruction";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { useQuestions } from "./hooks/useQuestions";
import { Loader } from "./components/loader/Loader";

function App() {
	const quizSessionStorage: {
		answersList?: string[];
		currentQuestion?: number;
	} = JSON.parse(sessionStorage.getItem("quizSessionStorage") || "{}");

	const [answersList, setAnswersList] = useState<string[]>(
		quizSessionStorage.answersList || []
	);

	const { questions, loading, error, fetchQuestions } = useQuestions();

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="App">
			<Header />

			<div className="container">
				<div className="content">
					<div className="content__wrapper">
						<Routes>
							<Route
								path=""
								element={
									<Instruction
										questionsCount={questions.length}
										answersList={answersList}
									/>
								}
							/>

							<Route
								path="/quiz"
								element={
									<Questions
										questions={questions}
										answersList={answersList}
										setAnswersList={setAnswersList}
									/>
								}
							/>

							<Route
								path="/wynik"
								element={
									<Result
										questions={questions}
										answersList={answersList}
										setAnswersList={setAnswersList}
										fetchQuestions={fetchQuestions}
									/>
								}
							/>
						</Routes>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default App;
