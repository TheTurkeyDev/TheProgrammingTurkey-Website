import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

export function TwitchGames(props) {
    const auth = useContext(AuthContext);
    return (
        <AuthPageWrapper history={props.history} parent="/user/profile">
            <div>
                <div className="fluid-container mx-auto text-center" style={{ maxWidth: '500px' }}>
                    <div className="row m-0">
                        <h5 className="col">Available Games</h5>
                    </div>
                    <hr />
                    {auth.permissions.includes('twitchgame.battleship') && (
                        <div className="row m-0">
                            <Link className="col" to="/twitchgames/battleship">
                                Twitch Battleship
                            </Link>
                        </div>
                    )}
                    {
                        auth.permissions.includes('twitchgame.rps') &&
                        <div className="row m-0">
                            <Link className="col" to="/twitchgames/rps">
                                Twitch Rock, Paper, Scissors
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </AuthPageWrapper>
    );
}
