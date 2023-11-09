import "./historyItem.styles.scss";

type HistoryItemProps = {
   flightNumber: number;
   lauchDate: string;
   mission: string;
   rocket: string;
   destination: string;
}

function HistoryItem(props: HistoryItemProps) {
	return (
		<div className="history__item">
			<p>{props.flightNumber}</p>
			<p>{new Date(props.lauchDate).toDateString()}</p>
			<p>{props.mission}</p>
			<p>{props.rocket}</p>
			<p>{props.destination}</p>
         <button>✖</button>
		</div>
	);
}
export default HistoryItem;
