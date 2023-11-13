import { useMemo } from "react";
import HistoryItem from "../../components/historyItem/HistoryItem.component";
import "./history.styles.scss";
import { LaunchType } from "../../hooks/requests";

function History({ launches }: { launches: LaunchType[] }) {
	const historyLaunches = useMemo(
		() => launches?.filter((launch) => !launch.upcoming),
		[launches]
	);
   console.log(historyLaunches)
	return (
		<div className="history">
			<p>
				History of mission launches including SpaceS lauches starting
				form the year 2006
			</p>
			<div className="table">
				<div className="head">
					<p>No</p>
					<p>Date</p>
					<p>Mission</p>
					<p>Rocket</p>
					<p>Customers</p>
				</div>
				{historyLaunches?.map((item) => (
					<HistoryItem
                  key={item.flightNumber}
						flightNumber={item.flightNumber}
						lauchDate={item.launchDate}
						destination={item.destination}
                  customer={item.customer.join(",")}
						mission={item.mission}
						rocket={item.rocket}
                  isUpcoming={item.upcoming}
                  success={item.success == undefined? false : item.success}
					/>
				))}
			</div>
		</div>
	);
}
export default History;
