import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase, db } from '../firebase';

import * as routes from '../constants/routes';

class Ranking extends Component {
    constructor(props) {
      super(props);
      this.get_rankers = this.get_rankers.bind(this);
      this.state = { ranks: [] };
    }

    componentDidMount(){
        this.get_rankers();
    }

    get_rankers() {
        var that = this;
        firebase.auth.onAuthStateChanged(authUser => {
            if (!authUser) {
                alert("You must log in!");
            }
            var myid = authUser.uid;
            db.getUser(myid).once("value").then(function(snapshot) {
                var myinfo = snapshot.val();
                var top_ranks = []
                var cnt = 5
                db.getRankers().once("value").then(function(snapshot) {
                    snapshot.forEach(function(child) {
                        var {email, points} = child.val();
                        top_ranks.push({num : cnt, email, points});
                        cnt -= 1;
                    });
                    that.setState({ ranks: top_ranks, email: myinfo.email, points: myinfo.points });
                });
            });
        });
    }

    render() {

        var rank_list = this.state.ranks.map(function(rank){
            return <tr><td>{rank.num}</td><td>{rank.email}</td><td>{rank.points} pts</td></tr>
        })

        return <div className = "ranking">
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
                            {this.state.email}
                        </div>
                        <Link to = {routes.WIKI}>
                        <div className = "wiki-user-info-text">
                            Points: {this.state.points} pts
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
                        Be careful though! You might lose points if somebody else reports you.
                        <br></br>
                        Good luck!
                    </div>
                    <div className = "ranking-users">
                    <table>
                        <tbody>
                            {rank_list.reverse()}
                        </tbody>
                    </table>
                    </div>
                    <Link to = {routes.WIKI}><div className = "ranking-goback">
                    Go back to contribute
                    </div>
                    </Link>
                </div>
            </div>
    }
}

export default Ranking;