import handler from 'serve-handler';
import http from 'node:http';

const OPTIONS = {
    public: 'build',
    headers: [
        {
            source: '**/*',
            headers: [
                {
                    key: 'Access-Control-Allow-Origin',
                    value: '*',
                },
                {
                    key: 'Access-Control-Expose-Headers',
                    value: 'content-length',
                },
                {
                    key: 'Cross-Origin-Opener-Policy',
                    value: 'same-origin',
                },
                {
                    key: 'Cross-Origin-Embedder-Policy',
                    value: 'require-corp',
                },
                {
                    key: 'Cross-Origin-Resource-Policy',
                    value: 'cross-origin',
                },
            ],
        },
    ],
};

const server = http.createServer((request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/vercel/serve-handler#options
    return handler(request, response, OPTIONS);
});

server.listen(3000, () => {
    console.log('Running at http://localhost:3000');
});
