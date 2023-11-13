import { useMemo, MouseEventHandler } from "react";
import "./upcoming.scss";
import HistoryItem from "../../components/historyItem/HistoryItem.component";
import { LaunchType } from "../../hooks/requests";


type UpcomingProps = {
	launches: LaunchType[];
	abortLaunch: (id: number)=>Promise<void>;
};
function Upcoming({ launches, abortLaunch }: UpcomingProps) {
	const upcomingLaunches = useMemo(
		() => launches?.filter((launch) => launch.upcoming),
		[launches, abortLaunch]
	);
   console.log(upcomingLaunches)

	return (
		<div className="upcoming">
			<p>
				Upcoming mission including both SpaceX lauches and newly
				schedled Zero to Master rockets
			</p>
			<p>Warning! Clicking on the X aborts the mission</p>
			<div className="table">
				<div className="head">
					<p>No</p>
					<p>Date</p>
					<p>Mission</p>
					<p>Rocket</p>
					<p>Destination</p>
				</div>
				{upcomingLaunches?.map((launch) => (
					<HistoryItem
                  key={launch.flightNumber}
						flightNumber={launch.flightNumber}
						lauchDate={launch.launchDate}
						mission={launch.mission}
						rocket={launch.rocket}
                  isUpcoming={launch.upcoming}
                  customer={launch.customer.join(",")}
                  success={launch.success == undefined?false : launch.success}
                  handleClick={abortLaunch}
						destination={launch.destination}
					/>
				))}
			</div>
		</div>
	);
}
export default Upcoming;
