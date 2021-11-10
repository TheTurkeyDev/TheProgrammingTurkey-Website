export const StreamAnimationItem = ({ animation, channelPointRewards, rewardData, save, remove }) => {
    return (
        <>
            <div><i className='fas fa-trash clickable' onClick={() => remove()} /></div>
            <span>{animation.display}</span>
            <select value={rewardData.channel_point_reward} onChange={e => save(rewardData, e.target.value, rewardData.duration)}>
                <option value=''>N/A</option>
                {
                    channelPointRewards.map(reward => (
                        <option key={reward.id} value={reward.id}>
                            {reward.title}
                        </option>
                    ))
                }
            </select>
            <input type='number' disabled={rewardData.id === ''} value={rewardData.duration} onChange={e => save(rewardData, rewardData.id, parseInt(e.target.value))} />
        </>
    )
}