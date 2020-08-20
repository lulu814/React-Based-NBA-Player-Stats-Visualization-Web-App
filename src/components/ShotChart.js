import React from 'react';
import nba from '../nba-client';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';
// 类型校验 react-props
import PropTypes from 'prop-types';

// make the d3 library as global (window) var
window.d3_hexbin = {hexbin : hexbin}; // workaround library problem

class ShotChart extends React.Component {
    //
    static propTypes = {
        // id, mincount必须是number;Type 必须是string,
        playerId: PropTypes.number,
        minCount: PropTypes.number,
        chartType: PropTypes.string,
        displayTooltip: PropTypes.bool,
    }
    // lifecycle function to fetch data
    componentDidUpdate(){
        nba.stats.shots({
            PlayerID: this.props.playerId
        }).then((response) => {
            /* 整理数据 --> 加filter, shot => ({}) {}是json array的格式*/
            const final_shots = response.shot_Chart_Detail.map(shot => ({
                x: (shot.locX + 250) / 10,
                y: (shot.locY + 50) / 10,
                action_type: shot.actionType,
                shot_distance: shot.shotDistance,
                shot_made_flag: shot.shotMadeFlag,

            }));
            //console.log(final_shots);
            // 找到作图点
            const courtSelection = d3.select("#shot-chart");
            // 清空
            courtSelection.html('');

            // 画场地：court size 500
            const chart_court = court().width(500);
            // 配置点： hexbin 类型的投球点， shotRenderThreshold命中率
            const chart_shots = shots().shotRenderThreshold(this.props.minCount)
                .displayToolTips(this.props.displayTooltip)
                .displayType(this.props.chartType);
            // 作用点和场地结合
            courtSelection.call(chart_court);
            // 作图点和投球点结合
            courtSelection.datum(final_shots).call(chart_shots);
        });
    }


    render() {
        return (
            <div id="shot-chart"></div>
        );
    }
}


export default ShotChart;