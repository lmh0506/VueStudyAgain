export default {
    state: {
        nowIndex: 0,
        banks: [{
                id: 201,
                label: '招商银行',
                name: 'zhaoshang'
            },
            {
                id: 301,
                label: '中国建设银行',
                name: 'jianshe'
            },
            {
                id: 601,
                label: '浦发银行',
                name: 'pufa'
            },
            {
                id: 1101,
                label: '交通银行',
                name: 'jiaotong'
            },
            {
                id: 101,
                label: '中国工商银行',
                name: 'gongshang'
            },
            {
                id: 401,
                label: '中国农业银行',
                name: 'nongye'
            },
            {
                id: 1201,
                label: '中国银行',
                name: 'zhongguo'
            },
            {
                id: 501,
                label: '中信银行',
                name: 'zhongxin'
            }
        ]
    },
    getters: {
        getBank: state => {
            return state.banks[state.nowIndex]
        }
    },
    mutations: {
        setNowIndex(state, n) {
            state.nowIndex = n;
        }
    }
}