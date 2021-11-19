export const StreamAnimationItem = ({ animation, channelPointRewards, rewardData, save, remove }) => {
    return (
        <>
            <div><i className='fas fa-trash clickable' onClick={() => remove()} /></div>
            <span>{animation.display}</span>
            <select value={rewardData.channel_point} onChange={e => { rewardData.channel_point = e.target.value; save(animation.id, rewardData); }}>
                <option value=''>N/A</option>
                {
                    channelPointRewards.map(reward => (
                        <option key={reward.id} value={reward.id}>
                            {reward.title}
                        </option>
                    ))
                }
            </select>
            <div />
        </>
    )
}