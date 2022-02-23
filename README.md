![Gif](https://github.com/CaCaBlocker/Gifs/blob/2eaffc1311346c5037687c066e906c475f35e7a9/481EA8B5-9AD8-4E80-9083-66D37433F53D.GIF)

# Log in website with xumm wallet

Thanks for visiting my cute repository. This includes both server and client which run on XRPL. The client is website developed by **React** for login with xumm mobile wallet.
The server is developed by **Express Node Framework**.

## Configure the env

First of all, you need to register on https://apps.xumm.dev/
And then create an application, and then get API key and secret and set them on .env.
At last, please set SERVER_BASE_URL env. For example, if you run it on local, you can set "http://your-ip-address:5000".

The default server port is 5000, and client is 3000.

## How to run

### Install packages

```
npm install
```

### Run the server

```
npm run server
```

### Run the client

```
npm run client
```

Well, you run this on local, so you need to install **cors chrome extension** for a safe test. As you know, this is for avoiding cors policy.
