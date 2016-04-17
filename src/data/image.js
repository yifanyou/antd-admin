/**
 * Created by youyifan on 2016/4/10.
 */
export const imageUrl = 'http://localhost:9090/v2/image'

export const image = {
    headers:{
        'X-Auth-Token': window.localStorage.getItem('TOKEN')
    },
    accept: 'image/*',
    action: 'http://localhost:9090/v2/image/upload',
    listType: 'picture-card',
    className: '',
    defaultFileList: []
}

export default image