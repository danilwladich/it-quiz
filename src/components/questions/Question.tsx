import React, { useState } from "react";
import { IQuestion } from "../../hooks/useQuestions";

export function Question({
	q,
	currentQuestion,
	answersList,
	nextQuestionHandler,
	goBackHandler,
	isLastQuestion,
}: {
	q: IQuestion;
	currentQuestion: number;
	answersList: string[];
	nextQuestionHandler: (answer: string) => void;
	goBackHandler: () => void;
	isLastQuestion: boolean;
}) {
	const [answer, setAnswer] = useState<string | null>(
		answersList[currentQuestion] ?? null
	);

	// form submit handler
	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (answer === null) {
			return;
		}

		nextQuestionHandler(answer);
		setAnswer(answersList[currentQuestion + 1] ?? null);
	}

	// button go back click handler
	function onGoBackClick() {
		if (currentQuestion === 0) {
			return;
		}

		goBackHandler();

		setAnswer(answersList[currentQuestion - 1] ?? null);
	}

	return (
		<>
			<form onSubmit={(e) => onFormSubmit(e)} className="question">
				<legend className="question__title">{q.question}</legend>

				<div className="question__options">
					{q.options.map((option) => (
						<Option
							key={option}
							option={option}
							checked={answer === option}
							onChange={() => setAnswer(option)}
						/>
					))}
				</div>

				<div className="question__buttons">
					<button
						disabled={currentQuestion === 0}
						type="button"
						onClick={onGoBackClick}
						className="question__buttons_back"
					>
						Wróć
					</button>

					<button
						disabled={answer === null}
						type="submit"
						className="question__buttons_submit"
					>
						{isLastQuestion ? "Zakończ quiz" : "Dalej"}
					</button>
				</div>
			</form>
		</>
	);
}

function Option({
	option,
	checked,
	onChange,
}: {
	option: string;
	checked: boolean;
	onChange: () => void;
}) {
	return (
		<>
			<div>
				<input
					type="radio"
					id={option}
					name="question"
					value={option}
					checked={checked}
					onChange={onChange}
				/>
				<label htmlFor={option}>{option}</label>
			</div>
		</>
	);
}
