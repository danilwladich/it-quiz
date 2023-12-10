import React from "react";
import "./header.css";

export function Header() {
	return (
		<header className="header">
			<div className="container">
				<div className="header__row">
					<h1 className="header__title">Quiz IT</h1>

					<div className="header__logo">
						<a href="https://vistula.edu.pl/">
							<img src="images/vistula.jpeg" alt="vistula logo" />
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}
