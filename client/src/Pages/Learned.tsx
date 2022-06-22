import '../Styles/Learned.css';
import { Link } from 'react-router-dom';
function Learned() {
	return (
		<>
			<Link to="/">
				<button className="clickMe">
					<span className="shadow"></span>
					<span className="edge"></span>
					<span className="front text">Go back</span>
				</button>
			</Link>
			<div className="learned">
				<div>
					<h1>Why?</h1>
					<p>Project Idea</p>
					<p>To learn new tech</p>
				</div>
				<div>
					<h1>What?</h1>
					<p>Refactor to Typescript</p>
					<p>Structure the files and logic</p>
					<p>Testing (E2E, back-end Testing)</p>
					<p>Authentication with Google (Firebase)</p>
					<p>Fixed bugs</p>
				</div>
				<div>
					<h1>Insights</h1>
					<p>Communication</p>
					<p>Agreement with project owner</p>
					<p>Git Hygiene</p>
					<p>New Tech</p>
				</div>
			</div>
		</>
	);
}

export default Learned;
