import { useSelector } from "react-redux";
import { RootState } from "../modules";

function WorkSpaceContainer() {
	const windowsState = useSelector((state: RootState) => state.windows)

	return (
		<>
			{
				windowsState.map((info, idx) =>
					<div key={idx}><span>asd</span></div>
				)
			}
		</>
	)
}

export default WorkSpaceContainer;