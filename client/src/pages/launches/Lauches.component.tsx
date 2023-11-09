import { onTypingSound } from "../../utils/sounds";
import "./launches.styles.scss";
import React, { useMemo } from "react";
type LaunchesProp = {
	planets: {
		kepler_name: string;
	}[];
   submitLaunch:(e: React.FormEvent<HTMLFormElement>) => Promise<void>;
   isPendingLaunch: boolean;
};
function Lauches(props: LaunchesProp) {
	const selectorBody = useMemo(() => {
		return props.planets?.map((planet) => (
			<option
				value={planet.kepler_name}
				key={planet.kepler_name}
			>
				{planet.kepler_name}
			</option>
		));
	}, [props.planets]);
	const today = new Date().toISOString().split("T")[0];
	return (
		<div className="lauches">
			<p>
				Sehcdule a mission for interstellar travel to one of the Kepler
				Exoplanets.
			</p>
			<p>
				Only confirmed planets matching the following criteria are
				available for the earliest scheduled missions
			</p>
			<ul>
				<li>Planetary radius &lt; 1.6 times Earth's radius</li>
				<li>
					Effective stellar flux &lt; 0.36 times Earth's value and
					&gt; 1.11 times Earth's value
				</li>
			</ul>
			<form onSubmit={props.submitLaunch}>
				<fieldset>
					<label htmlFor="launch-day">Launch Date</label>
					<input
						type="date"
						id="launch-day"
						name="launch-day"
						min={today}
						max="2040-12-31"
						defaultValue={today}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="mission-name">Mission Name</label>
					<input
						type="text"
						id="mission-name"
						name="mission-name"
                  onChange={onTypingSound}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="rocket-name">Rocket Type</label>
					<input
						type="text"
						id="rocket-name"
						name="rocket-name"
						defaultValue="Explorer IS1"
                  onChange={onTypingSound}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="planets-selector">
						Destination Exoplanet
					</label>
					<select
						id="planets-selector"
						name="planets-selector"
					>
						{selectorBody}
					</select>
				</fieldset>
				<button disabled={props.isPendingLaunch} > Launch Mission ✔</button>
			</form>
		</div>
	);
}
export default Lauches;
