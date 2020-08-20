import React, {Component} from 'react';
import Profile from './Profile';
import nba from '../nba-client';
import DataViewContainer from "./DataViewContainer";
import SearchBar from "./SearchBar";
import {DEFAULT_PLAYER_INFO} from '../constants';

class Main extends Component {
    // Constructor 写法
    // constructor() {
    //     super();
    //     state = {
    //         playerInfo: DEFAULT_PLAYER_INFO
    //     }
    // }
    state = {
        playerInfo: DEFAULT_PLAYER_INFO
    }

    componentDidMount() {
        // 将nba放进全局
        window.nba = nba;

        //console.log('curry -> ',  nba.findPlayer('Stephen Curry'));
        this.loadPlayerInfo(DEFAULT_PLAYER_INFO.fullName);

    }

    // get the data using player name
    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({PlayerID: nba.findPlayer(playerName).playerId})
            .then((info) => {
                console.log(info);
                //提取信息 ES6的assign
                const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);                //console.log(playInfo);
                this.setState({playerInfo: playInfo});
            })
    }

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }

    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;