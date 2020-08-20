import React, {Component} from 'react';
import {AutoComplete, Input, Icon} from 'antd';
import nba from '../nba-client';
import {PROFILE_PIC_URL_PREFIX} from '../constants';
// get the option from the autoComplete
const Option = AutoComplete.Option;

class SearchBar extends Component {

    state = {
        dataSource: []
    }

    handleSearch = (value) => {
        // const players = nba.searchPlayers(value);
        // console.log(players);


        this.setState({
            dataSource: !value ?
                // 对数组进行遍历，用map
                // map里是callback function
                [] : nba.searchPlayers(value)
                    .map(player => ({
                        fullName: player.fullName,
                        playerId: player.playerId,
                    }))
        });
    }
    // 回传数据给main
    onSelect = (name) => {
        this.props.handleSelectPlayer(name);
    }

    render() {
        // 对数据dataSource进行解构
        const {dataSource} = this.state;
        // option list dropdown box
        // img alt: 如果图片不存在显示full name
        const options = dataSource.map((player) => (
            <Option key={player.fullName}
                    value={player.fullName}
                    className="player-option">
                <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}
                     alt={player.fullName}/>
                <span className="player-option-label">{player.fullName}</span>
            </Option>
        ));

        return (
            // antd的组件
            <AutoComplete
                className="search-bar"
                dataSource={options}
                onSelect={this.onSelect}
                // 数据的搜索通过onSearch API实现，双向绑定
                onSearch={this.handleSearch}
                // searchBar的提示内容
                placeholder="Search NBA Player"
                size="large"
                // 必须对应 Option里的
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon"/>}/>
            </AutoComplete>
        );
    }

}

export default SearchBar;



