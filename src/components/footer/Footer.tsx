import React from "react";
import "./footer.css";

export function Footer() {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__row">
					<div className="footer__link">
						<a href="https://github.com/danilwladich">
							<img src="./images/github.svg" alt="github logo" /> GitHub
						</a>
					</div>

					<div className="footer__copy">Daniel Władyczewski 65821</div>
				</div>
			</div>
		</footer>
	);
}
