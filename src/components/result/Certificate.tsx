import React from "react";
import { jsPDF } from "jspdf";
import { IQuestion } from "../../hooks/useQuestions";

export function Certificate({
	questions,
	answersList,
}: {
	questions: IQuestion[];
	answersList: string[];
}) {
	// create pdf certificate with correct answers
	function createPDF() {
		const doc = new jsPDF();

		doc.setFontSize(10);

		let yOffSet = 10;

		const questionsPerPage = 5;
		let questionsCounter = 0;

		questions.forEach((question, i) => {
			const answer = answersList[i];

			questionsCounter++;

			// print question
			doc.setTextColor(0, 0, 0);
			doc.setFont("Open sans", "bold");
			doc.text(`${question.question}`, 10, yOffSet);
			yOffSet += 10;

			// print options
			doc.setFont("Open sans", "normal");
			question.options.forEach((option, index) => {
				// set color
				const textColor = determineTextColor(
					question.correctAnswer,
					answer,
					option
				);
				doc.setTextColor(textColor.r, textColor.g, textColor.b);

				doc.text(`		${index + 1}) ${option}`, 10, yOffSet);
				yOffSet += 10;
			});

			// add new page if limit reached
			if (questionsCounter >= questionsPerPage && i < questions.length - 1) {
				doc.addPage();
				yOffSet = 10;
				questionsCounter = 0;
			}
		});

		// download
		doc.save("certificate.pdf");
	}

	// determine text color based on correctness
	function determineTextColor(
		correctAnswer: string,
		selectedAnswer: string,
		option: string
	) {
		if (correctAnswer === option) {
			return correctAnswer === selectedAnswer
				? { r: 0, g: 255, b: 0 }
				: { r: 255, g: 0, b: 0 };
		} else {
			return { r: 0, g: 0, b: 0 };
		}
	}

	return (
		<>
			<button onClick={createPDF} className="result__buttons_certificate">
				Pobierz PDF
			</button>
		</>
	);
}
