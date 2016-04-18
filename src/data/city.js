export const citys = [{
    value: '18',
    label: '江苏',
    children: [{
        value: '224',
        label: '苏州市'
    }, {
        value: '315',
        label: '南京市'
    }, {
        value: '346',
        label: '扬州市'
    }]
}, {
    value: '289',
    label: '上海',
    children: [{
        value: '289',
        label: '上海市'
    }]
}, {
    value: '340',
    label: '深圳',
    children: [{
        value: '340',
        label: '深圳市'
    }]
}]

export function buildOption(select){
    for(let city of citys){
        for(let c of city.children)
            if(c.value == select)
                return [city.value, c.value]
    }
}