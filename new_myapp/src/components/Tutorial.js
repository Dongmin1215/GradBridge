import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

class Ranking extends Component {
    render() {
        return(
        <div className = "ranking">
            <img className="tutorial-img" src={require('./images/tutorial.png')}/>   
            <Link to = {routes.WIKI}><div className = "ranking-goback">
                    돌아가기
            </div>
            </Link>      
        </div>
        );
    }
}

export default Ranking;