
import "./historyItem.styles.scss";

type HistoryItemProps = {
	flightNumber: number;
   customer: string;
	lauchDate: string;
	mission: string;
	rocket: string;
	destination: string;
	isUpcoming: boolean;
	handleClick?: (id: number) => Promise<void>;
   success: boolean;
};

function HistoryItem(props: HistoryItemProps) {
	return (
		<div className="history__item">
			<p>{props.flightNumber}</p>
			<p>{new Date(props.lauchDate).toDateString()}</p>
			<p>{props.mission}</p>
			<p>{props.rocket}</p>
			<p>{props.isUpcoming ? props.destination : props.customer}</p>
			{props.isUpcoming ? (
				<button
					onClick={() =>
						props.handleClick
							? props.handleClick(props.flightNumber)
							: null
					}
				>
					✖
				</button>
			) : <span style={{backgroundColor: props.success ? "green" : "red"}} />}
		</div>
	);
}
export default HistoryItem;
