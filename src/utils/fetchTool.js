let canFetch = true; // 初始化可以進行 fetch 的狀態

const myFetch = async (url, method, token = '', body = null) => {
    if (!canFetch) throw new Error('You click too fast!');

    canFetch = false;

    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            options.headers['Authorization'] = `${token}`;
        }

        if (method !== 'GET' && body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    } finally {
        setTimeout(() => {
            canFetch = true;
            console.log(canFetch);
        }, 3000);
    }
};

export default myFetch;