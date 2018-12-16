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
                alert("로그인 하세요!");
            }
            var myid = authUser.uid;
            db.getUser(myid).once("value").then(function(snapshot) {
                var myinfo = snapshot.val();
                var top_ranks = []
                db.getRankers().once("value").then(function(snapshot) {
                    var cnt = snapshot.numChildren()
                    snapshot.forEach(function(child) {
                        var {email, points} = child.val();
                        var id = email.split("@")[0];
                        if (id.length > 2){
                            var new_id = id[0];
                            for (var i = 1; i < id.length-1; i++) {
                                new_id += "*";
                            }
                            new_id += id[id.length-1];
                            email = new_id + "@" + email.split("@")[1];
                        }
                        if (points != undefined) {
                            top_ranks.push({num : cnt, email, points});
                        }
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
                        {this.state.points != null ?
                        <div className = "wiki-user-info-text">
                            점수: {this.state.points} pts
                        </div> :
                        <div className = "wiki-user-info-text">
                            랭킹
                        </div>
                        }
                        </Link>
                        </div>
                    </div>
                </div>
                <div className = "ranking-info">
                    <div className = "ranking-title">
                        <img className = 'crown-img' src={require('./images/crown.png')}/>
                        전체 순위
                        <img className = 'crown-img' src={require('./images/crown.png')}/>
                    </div>
                    <div className = "ranking-description">
                        좋은 정보를 공유해주셔서 고마워요!
                        <br></br>
                        점수를 더 얻고싶으시면
                        <br></br>
                        <div className = "bold">
                        1) 새로운 토픽을 추가하거나 2) 각 토픽과 관련 된 경험을 나눠주세요.
                        </div>
                        하지만 이상한 내용을 썼다가는 누가 신고하면 점수를 잃을 수 있다는 점~!
                        <br></br>
                        그럼 화이팅!
                    </div>
                    <div className = "ranking-users">
                    <table>
                        <tbody>
                            {rank_list.reverse()}
                        </tbody>
                    </table>
                    </div>
                    <Link to = {routes.WIKI}><div className = "ranking-goback">
                    돌아가기
                    </div>
                    </Link>
                </div>
            </div>
    }
}

export default Ranking;