import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const Ranking = () =>
    <div className = "ranking">
        <div className = "top">
            <div className = "wiki-title">
                <div className = "wiki-void">
                </div>
                <div className = "wiki-middle-top">
                <Link to = {routes.LANDING}>
                    <img id = "wiki-top-logo" src={require('./images/logo.png')}/>
                </Link>
                </div>
                <div className = "wiki-user-info">
                <div className = "wiki-user-info-text">
                    lyne96@kaist.ac.kr
                </div>
                <Link to = {routes.RANKING}>
                <div className = "wiki-user-info-text">
                    Points: 30 pts
                </div>
                </Link>
                </div>
            </div>
        </div>
        <div className = "ranking-info">
            <div className = "ranking-title">
                <img className = 'crown-img' src={require('./images/crown.png')}/>
                RANKING
                <img className = 'crown-img' src={require('./images/crown.png')}/>
            </div>
            <div className = "ranking-description">
                Thanks for your contribution!
                <br></br>
                You can earn more points if you
                <br></br>
                <div className = "bold">
                1) Add a topic or 2) Provide your experience on the topic.
                </div>
                Be careful, You might loose your point if somebody else reports you.
                <br></br>
                Good luck!
            </div>
            <div className = "ranking-users">
            <table>
                <tbody>
                    <tr>
                        <td>1</td><td>lyne96kaist.ac.kr</td><td>50pts</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <Link to = {routes.WIKI}><div className = "ranking-goback">
            Go back to contribute
            </div>
            </Link>
        </div>
    </div>

export default Ranking;