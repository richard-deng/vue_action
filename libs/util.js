import axios from 'axios';

// 基本配置
const Util  = {
    base_path: 'http://127.0.0.1:8084'
};

// Ajax配置
Util.ajax = axios.create({
    baseURL: Util.base_path,
});
Util.http = axios;
// 添加响应拦截器
Util.ajax.interceptors.response.use(res => {
    return res.data;
});

export default Util;

