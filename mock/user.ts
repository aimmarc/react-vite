import { MockMethod } from 'vite-plugin-mock';
import Mock, { Random } from 'mockjs';
import { resultSuccess, resultError, resultPageSuccess } from './_utils';

export default [
    {
        url: '/api/user/list',
        method: 'get',
        response: (req: any) => {
            return resultSuccess(
                Mock.mock({
                    [`list|${req.query.pageSize}`]: [
                        {
                            id: '@id',
                            name: '@cname',
                            age: Random.integer(1, 100),
                            address: '@county',
                            city: '@city',
                            province: '@province',
                            email: Random.email(),
                            phone: /^1[0-9]{10}$/,
                            regin: '@region',
                            url: '@url',
                            date: Random.date('yyyy-MM-dd'),
                            'gender|1': ['1', '2'],
                            'state|1': ['新增', '已通过', '待审核'],
                            'enable|1': ['0', '1'],
                        },
                    ],
                    total: 100,
                }),
            );
        },
    },
    {
        url: '/api/user/login',
        method: 'post',
        response: (req: any) => {
            const { body } = req;
            if (body.account === 'admin' && body.password === '88888888') {
                return resultSuccess('ok');
            }
            return resultError('用户名或密码错误');
        },
    },
    {
        url: '/api/user/info',
        method: 'get',
        response: () =>
            resultSuccess(
                Mock.mock({
                    id: '@id',
                    name: '@cname',
                    age: Random.integer(1, 100),
                    address: '@county',
                    city: '@city',
                    province: '@province',
                    email: Random.email(),
                    phone: /^1[0-9]{10}$/,
                    regin: '@region',
                    url: '@url',
                    date: Random.date('yyyy-MM-dd'),
                }),
            ),
    },
    {
        url: '/api/user/page',
        method: 'get',
        response: () => {
            const data = Mock.mock({
                'items|10': [
                    {
                        id: '@id',
                        name: '@cname',
                        age: Random.integer(1, 100),
                        address: '@county',
                        city: '@city',
                        province: '@province',
                        email: Random.email(),
                        phone: /^1[0-9]{10}$/,
                        regin: '@region',
                        url: '@url',
                        date: Random.date('yyyy-MM-dd'),
                    },
                ],
                total: 1000,
            });
            return resultPageSuccess(1, 10, data.items, { total: 200 });
        },
    },
    {
        url: '/api/user/authority',
        method: 'get',
        response: () => {
            const data = Mock.mock(['100', '101']);
            return resultSuccess(data);
        },
    },
] as MockMethod[];
