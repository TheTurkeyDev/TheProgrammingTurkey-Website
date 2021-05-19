export const ChanceCubesRewardInfoOverlay = ({ name, data }) => {
    return (
        <>
            <h2>
                {name}
            </h2>
            <hr />
            {
                data.isgcr ?
                    <div>
                        <span>Giant Chance Cube Reward</span>
                    </div>
                    :
                    <div>
                        <span>Chance Value:</span>
                        <span>{data.chance}</span>
                    </div>
            }
            <hr />
            <div>
                {JSON.stringify(data)}
            </div>
        </>
    );
}