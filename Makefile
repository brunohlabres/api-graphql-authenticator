test: build
	npm test
	
install: node_modules
	docker pull brunohlabres/demo && nvm install 15.10.0 && npm install 

up: 
    docker run 5432:5432 brunohlabres/demo  && npm start
	
node_modules: package.json
