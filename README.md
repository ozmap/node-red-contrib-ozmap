# node-red-contrib-ozmap
Wrapper da API do OZMap para node-red

###Para rodar a aplicação, use:

docker run -it -e LOG_LEVEL=silly --name nodered --user root -v $(pwd)/data:/data -v $(pwd)/data/node_modules/node-red-contrib-ozmap:/data/node_modules/node-red-contrib-ozmap --rm -p 1880:1880 -p 9229:9229 nodered/node-red
