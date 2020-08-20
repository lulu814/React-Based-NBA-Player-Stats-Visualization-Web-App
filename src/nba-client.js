//帮我们获取数据从NBA官网
// use nba we saved in the dependency
import nba from 'nba';
// server 端
const SERVER_URL = 'https://nba.laiprojects.com';
//const SERVER_URL = "http://35.235.84.235:5000";
export default {
    // export all contents in nba
    ...nba,
    // stats property: key value pair
    stats: {
        ...nba.stats,
        // 球员信息 --> 函数 id -> 球员数据
        playerInfo: function({ PlayerID }) {
            // 类似ajax,但是是ES6新的
            //.then promise的方法,异步 接收res返回res.json数据
            return fetch(`${SERVER_URL}/players/${PlayerID}`).then(res => res.json())
        },
        shots: function({ PlayerID }) {
            return fetch(`${SERVER_URL}/players/${PlayerID}/shots`).then(res => res.json())
        },
    },
};