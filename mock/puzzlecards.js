/**
 * Mock数据
 *  1、文件位置必须位于项目根目录下，文件名称不限
 *  2、利用 res.status 模拟 http 请求出错
 *  3、在 dva model 中加入错误捕获
 */
const random_jokes = [
    {
        setup: 'What is the object oriented way to get wealthy ?',
        punchline: 'Inheritance',
    },
    {
        setup: 'To understand what recursion is...',
        punchline: "You must first understand what recursion is",
    },
    {
        setup: 'What do you call a factory that sells passable products?',
        punchline: 'A satisfactory',
    },
];

let random_joke_call_count = 0;

export default {
    'get /dev/random_joke': function (req, res) {
        // Mock 正常的返回数据
        // const responseObj = random_jokes[random_joke_call_count % random_jokes.length];
        // random_joke_call_count += 1;
        // setTimeout(() => {
        //     res.json(responseObj);
        // }, 3000);

        // 利用 res.status 模拟 http 请求出错
        res.status(401);
        res.json({});
    },
};